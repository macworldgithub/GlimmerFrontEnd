"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import ServiceSidebar from "@/common/ServiceSidebar";
import { createBooking, getAllActiveServices, getSalonById } from "@/api/salon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/reduxStore";
import ServiceCard from "@/common/ServiceCard";
import { BiChevronDown } from "react-icons/bi";
import { addService, clearServiceCart } from "@/reduxSlices/serviceCartSlice";
import { message } from "antd";
import { BACKEND_URL } from "@/api/config";
import Salonfilter from "@/app/salons/components/salonFIlter";
import CartModal from "@/app/salons/[id]/components/cartModal";
import CheckoutModal from "@/app/salons/[id]/components/checkoutModal";
import toast from "react-hot-toast";
import Image from "next/image";

const Loading = () => (
  <div className="justify-center flex min-h-[70vh] w-full items-center">
    <div className="text-center font-bold text-3xl">Loading...</div>
  </div>
);

const ServiceList = () => {
  const [activeSort, setActiveSort] = useState("Date");
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [salonData, setSalonData] = useState<any>(null);
  console.log("SAlon DAta: ", salonData);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [showCartConflictWarning, setShowCartConflictWarning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [bulkForm, setBulkForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    bookingDate: "",
    bookingTime: "",
    paymentMethod: "",
  });
  const [errors, setErrors] = useState<any>({});

  const pageSize = 20;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.login.token);
  const { services: selectedServices } = useSelector(
    (state: RootState) => state.serviceCart
  );

  const categoryIdFilter = searchParams.get("categoryId") ?? "";
  const salonIdFilter = searchParams.get("salonId") ?? "";
  const subCategoryNameFilter = searchParams.get("subCategoryName") ?? "";
  const subSubCategoryNameFilter = searchParams.get("subSubCategoryName") ?? "";

  const id = searchParams.get("salonId");
  const page = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      let sort_by: string | undefined;
      if (activeSort === "Price") {
        sort_by = "price";
      } else if (activeSort === "Date") {
        sort_by = "createdAt";
      } else {
        sort_by = undefined;
      }

      const result = await dispatch(
        getAllActiveServices({
          page_no: page,
          categoryId: categoryIdFilter,
          salonId: salonIdFilter,
          subCategoryName: subCategoryNameFilter,
          subSubCategoryName: subSubCategoryNameFilter,
          sortBy: sort_by,
          order: sortOrder,
          limit: pageSize, // backend already "limit" expect karta hai ✅
        } as any)
      );

      if (result.payload) {
        let services = result.payload.services || [];

        if (activeSort === "Name") {
          services = [...services].sort((a, b) => {
            const nameA = a.name?.toLowerCase() || "";
            const nameB = b.name?.toLowerCase() || "";
            return sortOrder === "desc"
              ? nameB.localeCompare(nameA)
              : nameA.localeCompare(nameB);
          });
        }

        setData(services);

        // ✅ Backend ke exact fields use karo
        setTotal(result.payload.total || 0);
        setTotalPages(result.payload.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  useEffect(() => {
    if (!salonIdFilter || salonIdFilter === "") return;
    fetchData();
  }, [
    page,
    categoryIdFilter,
    salonIdFilter,
    subCategoryNameFilter,
    subSubCategoryNameFilter,
    activeSort,
    sortOrder,
  ]);

  useEffect(() => {
    if (id) {
      const fetchSalonData = async () => {
        try {
          const data = await getSalonById(id as string);
          setSalonData(data);
        } catch (error) {
          message.error("Failed to load salon details");
        }
      };
      fetchSalonData();
    }
  }, [id]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleAddToCart = (item: any) => {
    const newSalonId = item.salonId;

    if (
      selectedServices.length > 0 &&
      selectedServices[0].service.salonId !== newSalonId
    ) {
      setShowCartConflictWarning(true);
      return;
    }

    dispatch(
      addService({
        service: {
          _id: item._id,
          name: item.name,
          description: item.description,
          image1: item.image1,
          base_price: item.adminSetPrice,
          discounted_price: item.discountedPrice,
          rate_of_salon: item.rate_of_salon,
          ref_of_salon: item.ref_of_salon,
          salonId: item.salonId,
          status: "Active",
          duration: item.duration,
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          hasDiscount: item.hasDiscount ?? false,
          discountPercentage: item.discountPercentage ?? 0,
        },
        bookingInfo: {
          bookingDate: "",
          bookingTime: "",
          paymentMethod: "",
          customerName: "",
          customerEmail: "",
          customerPhone: "",
        },
      })
    );
    setSelectedItem(item); // Set the selected item when added to cart
    setIsCartModalOpen(true); // Open the modal
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
      toast.error(
        "❌ Failed to initiate Bank Alfalah payment. Please try again."
      );
    }
  };
  return (
    <div className="flex flex-col w-[99vw] pb-[8rem]">
      <div className="px-10 py-10 bg-[#FBE8A5] mb-4 z-10">
        <Salonfilter />
      </div>

      {/* <div className="breadcrumbs mb-4 text-xl lg:text-xl px-10">
        <Link
          href="/salons"
          className="text-gray-500 font-medium text-base lg:text-xl"
        >
          Salons
        </Link>
        <span className="mx-2 text-gray-500 font-medium text-base lg:text-xl">
          /
        </span>
        <Link
          href="/salons/services"
          className="text-purple-800 font-medium text-base lg:text-xl"
        >
          Services
        </Link>
      </div> */}

      <div className="hidden md:block pt-[3rem] px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[6rem] xl:px-[12rem]">
        {/* Floating Cart Conflict Warning */}
        {showCartConflictWarning && (
          <div className="fixed bottom-6 right-6 bg-white border border-red-400 shadow-lg rounded-lg p-4 z-50 w-[300px] animate-fade-in">
            <h4 className="text-red-600 font-semibold mb-2">
              Conflict Detected
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              You cannot add services from different salons in the same booking.
            </p>
            <button
              onClick={() => {
                setShowCartConflictWarning(false);
                setIsCartModalOpen(true);
              }}
              className="w-full py-2 px-3 bg-[#583FA8] text-white text-sm rounded-md hover:bg-purple-800 transition"
            >
              View Cart
            </button>
          </div>
        )}
        <div className="w-full h-[50vh] rounded-lg overflow-hidden relative group">
          <Image
            src="/assets/images/banner.png"
            alt="Banner"
            fill
            priority 
            sizes="100vw" 
            className="w-full h-full object-cover transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500 px-4 lg:p-[8rem] flex flex-col items-center justify-center space-y-4">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center">
              Explore Our Best Collection
            </h1>

            <div className="breadcrumbs text-xl lg:text-xl flex flex-wrap items-center justify-center text-center">
              <Link
                href="/salons"
                className="text-gray-300 hover:text-white font-medium text-base lg:text-xl"
              >
                Salons
              </Link>

              {salonData?.salon_name && (
                <>
                  <span className="mx-2 text-gray-300 font-medium text-base lg:text-xl">
                    /
                  </span>
                  <Link
                    href={`/salons/${salonData.address?.city
                      ?.toLowerCase()
                      ?.replace(/\s+/g, "-")}/${salonData.salon_name
                      ?.toLowerCase()
                      ?.replace(/\s+/g, "-")}`}
                    className="text-purple-300 hover:text-white font-medium text-base lg:text-xl"
                  >
                    {salonData.salon_name}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-x-8 px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[5rem] xl:px-[10rem] lg:py-[2rem]">
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <ServiceSidebar />
        </motion.aside>

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="flex flex-wrap md:flex-row sm:flex-col items-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8">
            <span className="text-gray-700 text-lg md:px-6 md:py-2 md:text-xl">
              Sort by
            </span>
            <button
              onClick={() => {
                setActiveSort("Date");
                setSortOrder(sortOrder === "desc" ? "asc" : "desc");
              }}
              className={`border px-4 py-1.5 text-lg md:px-6 md:py-2 md:text-lg rounded-md font-medium transition duration-300 ease-in-out ${
                activeSort === "Date"
                  ? "border-gray-400 text-gray-700 bg-white"
                  : "border-gray-400 text-gray-700 hover:bg-[#FDF3D2]"
              }`}
            >
              Date{" "}
              {activeSort === "Date" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className={`flex items-center gap-2 border px-4 py-1.5 text-lg md:px-6 md:py-2 md:text-lg rounded-md font-medium transition duration-300 ease-in-out ${
                  activeSort === "Price"
                    ? "border-purple-800 text-purple-800 bg-purple-100"
                    : "border-gray-400 text-gray-700 hover:bg-[#FDF3D2]"
                }`}
              >
                Price{" "}
                {activeSort === "Price"
                  ? sortOrder === "desc"
                    ? "↓"
                    : "↑"
                  : ""}{" "}
                <BiChevronDown size={20} />
              </button>
              {showPriceDropdown && (
                <div className="absolute z-50 left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      setActiveSort("Price");
                      setSortOrder("asc");
                      setShowPriceDropdown(false);
                    }}
                    className="block w-full text-left px-5 py-3 text-lg font-medium hover:bg-gray-200"
                  >
                    Low to High
                  </button>
                  <button
                    onClick={() => {
                      setActiveSort("Price");
                      setSortOrder("desc");
                      setShowPriceDropdown(false);
                    }}
                    className="block w-full text-left px-5 py-3 text-lg font-medium hover:bg-gray-200"
                  >
                    High to Low
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Service Grid */}
          <div className="w-full h-max grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-6 p-4">
            {data.length ? (
              data.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.02 }}
                  className="flex"
                >
                  <ServiceCard
                    salonId={salonData._id}
                    salonName={salonData?.salon_name}
                    salonAddress={salonData.address}
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center min-h-[70vh]">
                <div className="text-center font-bold text-3xl">
                  Oops! No items to display in this category
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {/* Pagination */}
          {totalPages > 0 && (
            <div className="w-full flex flex-wrap justify-center items-center gap-2 py-4">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>

              {/* Page number buttons */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-md ${
                    page === i + 1
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </motion.main>
      </div>

      <AnimatePresence>
        {isCartModalOpen && (
          <CartModal
            onClose={() => setIsCartModalOpen(false)}
            onProceed={() => {
              setIsCartModalOpen(false);
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

const Temp = () => (
  <Suspense fallback={<Loading />}>
    <ServiceList />
  </Suspense>
);

export default Temp;
