"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, getAllActiveServices } from "@/api/salon";
import { AppDispatch, RootState } from "@/store/reduxStore";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import CheckoutModal from "./checkoutModal";
import CartModal from "./cartModal";
import { addService, clearServiceCart } from "@/reduxSlices/serviceCartSlice";
import { BACKEND_URL } from "@/api/config";
import { extractCityFromAddress, formatSlug, sanitizeSlug } from "@/lib/utils";
import toast from "react-hot-toast";

interface Salon {
  salon_name: string;
  address: string;
}
interface SalonServicesProps {
  salon: Salon & { _id: string };  // make sure _id is included
}

const SalonServices = ({ salon }: SalonServicesProps) => {
  console.log("SAlon: ", salon);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useSelector((state: RootState) => state.login.token);
  const { services: selectedServices } = useSelector(
    (state: RootState) => state.serviceCart
  );
  const [services, setServices] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [showCartConflictWarning, setShowCartConflictWarning] = useState(false);

  const [bulkForm, setBulkForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    bookingDate: "",
    bookingTime: "",
    paymentMethod: "",
  });
  const [errors, setErrors] = useState<any>({});

  const salonId = salon?._id ?? "";
  const openingHour = searchParams.get("openingHour") ?? "";
  const closingHour = searchParams.get("closingHour") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  const { salon_name = "unknown", address = "unknown" } = salon || {};
  const rawCity = extractCityFromAddress(address);
  const citySlug = formatSlug(sanitizeSlug(rawCity));
  const salonSlug = formatSlug(sanitizeSlug(salon_name));

  useEffect(() => {
    if (!salonId) return;
    dispatch(getAllActiveServices({ page_no: page, salonId }))
      .then((res) => setServices(res.payload?.services || []))
      .catch((err) => console.error("Fetch failed", err));
  }, [page, salonId]);

  const addToCart = (service: any) => {
    const newSalonId = service.salonId;

    if (
      selectedServices.length > 0 &&
      selectedServices[0].service.salonId !== newSalonId
    ) {
      setShowCartConflictWarning(true);
      return;
    }

    const alreadyInCart = selectedServices.some(
      (s) => s.service._id === service._id
    );
    if (!alreadyInCart) {
      const discountedPrice =
        service.adminSetPrice -
        (service.adminSetPrice * service.discountPercentage) / 100;

      dispatch(
        addService({
          service: {
            ...service,
            discounted_price: discountedPrice,
          },
          bookingInfo: {
            customerName: "",
            customerEmail: "",
            customerPhone: "",
            bookingDate: "",
            bookingTime: "",
            paymentMethod: "",
          },
        })
      );
    }

    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errs: any = {};
    if (!bulkForm.customerName.trim()) errs.customerName = "Required!";
    if (!bulkForm.customerPhone.trim()) errs.customerPhone = "Required!";
    if (!bulkForm.bookingDate) errs.bookingDate = "Required!";
    if (!bulkForm.bookingTime) errs.bookingTime = "Required!";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBulkForm({ ...bulkForm, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (bulkForm.paymentMethod === "Bank Alfalah") {
        const payload = {
          ...bulkForm, // customerName, customerEmail, customerPhone, bookingDate, bookingTime, paymentMethod
          services: selectedServices.map(({ service }) => ({
            serviceName: service.name,
            serviceDuration: service.duration,
            serviceDescription: service.description,
            salonId: service.salonId,
            categoryId: service.categoryId,
            categoryName: service.categoryName,
            subCategoryName: service.subCategoryName,
            subSubCategoryName: service.subSubCategoryName,
            actualPrice: service.base_price,
            finalPrice: service.discounted_price,
            isDiscounted: service.hasDiscount,
            discountPercentage: service.discountPercentage,
          })),
        };

        await handleBankAlfalahPayment(payload); // still bulk
        return;
      }

      for (const { service } of selectedServices) {
        try {
          // 1️⃣ Create booking
          const bookingPayload = {
            ...bulkForm,
            serviceName: service.name,
            serviceDuration: service.duration,
            serviceDescription: service.description,
            salonId: service.salonId,
            categoryId: service.categoryId,
            categoryName: service.categoryName,
            subCategoryName: service.subCategoryName,
            subSubCategoryName: service.subSubCategoryName,
            actualPrice: service.base_price,
            finalPrice: service.discounted_price,
            isDiscounted: service.hasDiscount,
            discountPercentage: service.discountPercentage,
          };

          const response = await createBooking(bookingPayload, token);

          // 2️⃣ Send confirmation email
          const emailPayload = {
            to: response.customerEmail,
            viewModel: {
              customer: {
                name: response.customerName,
              },
              booking: response,
            },
          };

          await fetch(`${BACKEND_URL}/admin/send-booking-confirmation-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(emailPayload),
          });
        } catch (error) {
          console.error(
            "Booking or email failed for service:",
            service._id || service.name,
            error
          );
        }
      }

      dispatch(clearServiceCart());
      localStorage.removeItem("serviceCart");
      alert("Booking confirmed!");
      setIsCheckoutModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Booking process failed:", error);
      alert("Booking failed.");
    }
  };

  const handleBankAlfalahPayment = async (bookingData: any) => {
    console.log("Initiating Bank Alfalah payment:", bookingData);
    try {
      const response = await fetch(
        `${BACKEND_URL}/alfalah/initiate-booking-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/html",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Get the HTML response containing the form
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const form = doc.getElementById("ssoForm") as HTMLFormElement;

      if (!form) {
        throw new Error("Form not found in response");
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("Alfalah Payment Error:", err);
      toast.error("❌ Failed to initiate Bank Alfalah payment. Please try again.");
    }
  };
  return (
    <div className="w-[99vw] p-4 sm:p-6 md:p-10 my-4 md:my-8 relative">
      <div className="prose lg:prose-xl">
        <h2 className="mb-2 md:mb-3">Services</h2>
      </div>

      {/* Floating Cart Conflict Warning */}
      {showCartConflictWarning && (
        <div className="fixed bottom-6 right-6 bg-white border border-red-400 shadow-lg rounded-lg p-4 z-50 w-[300px] animate-fade-in">
          <h4 className="text-red-600 font-semibold mb-2">Conflict Detected</h4>
          <p className="text-sm text-gray-700 mb-3">
            You cannot add services from different salons in the same booking.
          </p>
          <button
            onClick={() => {
              setShowCartConflictWarning(false);
              setIsModalOpen(true);
            }}
            className="w-full py-2 px-3 bg-[#583FA8] text-white text-sm rounded-md hover:bg-purple-800 transition"
          >
            View Cart
          </button>
        </div>
      )}

      <div className="p-5 bg-[#FBE8A5]">
        {services.length === 0 ? (
          <div className="text-center text-lg">
            No services found for this salon.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {services.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-2 cursor-pointer transition-transform transform hover:scale-[1.02] hover:shadow-lg hover:border-gray-300"
                onClick={() => {
                  const serviceSlug = formatSlug(sanitizeSlug(item.name));
                  router.push(
                    `/salons/${citySlug}/${salonSlug}/${serviceSlug}?serviceId=${item._id}&salonId=${item.salonId}&openingHour=${openingHour}&closingHour=${closingHour}`
                  );
                }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2">
                  <div className="font-semibold text-sm sm:text-base break-words">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-700">
                    {item.duration} mins
                  </div>
                  <div className="text-sm text-gray-700">
                    {item.actualPrice} PKR
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="w-[200px] py-2 text-black border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-6">
          <Link
            href={
              salon
                ? `/salons/${citySlug}/${salonSlug}/services?page_no=${page}&salonId=${salonId}`
                : `/salons/unknown/unknown/services?page_no=${page}&salonId=${salonId}`
            }
            className="text-center py-2 px-4 border-2 border-black rounded-lg text-black font-medium hover:bg-black hover:text-white transition duration-200"
          >
            View All Services
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <CartModal
            onClose={() => setIsModalOpen(false)}
            onProceed={() => {
              setIsModalOpen(false);
              setIsCheckoutModalOpen(true);
            }}
          />
        )}
        {isCheckoutModalOpen && (
          <CheckoutModal
            form={bulkForm}
            errors={errors}
            onChange={handleFormChange}
            onDateChange={(name: any, value: any) =>
              setBulkForm((prev) => ({ ...prev, [name]: value }))
            }
            onClose={() => setIsCheckoutModalOpen(false)}
            onSubmit={handleBooking}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SalonServices;
