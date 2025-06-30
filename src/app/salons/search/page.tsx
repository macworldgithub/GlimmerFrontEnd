"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/reduxStore";
import { createBooking, getServicesBySearch } from "@/api/salon";
import ServiceCard from "@/common/ServiceCard";
import ServiceSidebar from "@/common/ServiceSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { BiChevronDown } from "react-icons/bi";
import CartModal from "../[id]/components/cartModal";
import CheckoutModal from "../[id]/components/checkoutModal";
import Salonfilter from "../components/salonFIlter";
import { addService, clearServiceCart } from "@/reduxSlices/serviceCartSlice";
import Link from "next/link";
import { BACKEND_URL } from "@/api/config";

interface SearchFilters {
  page_no: number;
  nameTerm?: string;
  gender?: string;
  serviceTerm?: string;
  price?: number;
}

const SearchResultsPage = () => {
  const [services, setServices] = useState([]);
  const searchParams = useSearchParams();

  const { services: selectedServices } = useSelector(
    (state: RootState) => state.serviceCart
  );
  const token = useSelector((state: RootState) => state.login.token);

  const dispatch = useDispatch<AppDispatch>();

  const [activeSort, setActiveSort] = useState("Date");
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [showCartConflictWarning, setShowCartConflictWarning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const [errors, setErrors] = useState<any>({});

  const [bulkForm, setBulkForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    bookingDate: "",
    bookingTime: "",
    paymentMethod: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const nameTerm = searchParams.get("nameTerm");
      const gender = searchParams.get("gender");
      const serviceTerm = searchParams.get("serviceTerm");
      const price = searchParams.get("price");

      console.log(nameTerm);
      console.log(gender);
      console.log(serviceTerm);
      console.log(price);
      if (!nameTerm && !gender && !serviceTerm && !price) return;
      console.log("223343434534");

      const filters: SearchFilters = {
        page_no: 1,
        nameTerm: nameTerm || undefined,
        gender: gender || undefined,
        serviceTerm: serviceTerm || undefined,
        price: price ? Number(price) : undefined,
      };
      const result = await dispatch(getServicesBySearch(filters));
      if (result.payload) {
        setServices(result.payload.services || result.payload);
      }
    };

    fetchData();
  }, [searchParams.toString()]);

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
          discounted_price: item.hasDiscount
            ? item.adminSetPrice -
              (item.adminSetPrice * item.discountPercentage) / 100
            : item.adminSetPrice,
          rate_of_salon: item.rate_of_salon,
          ref_of_salon: item.ref_of_salon,
          salonId: item.salonId,
          status: "Active",
          duration: item.duration,
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
      for (const { service } of selectedServices) {
        try {
          const response = await createBooking(
            {
              ...bulkForm,
              serviceId: service._id,
              finalPrice: service.discounted_price,
            },
            token
          );

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
            service._id,
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
                    href="/salons/search"
                    className="text-purple-800 font-medium text-base lg:text-xl"
                >
                    Search 
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
          <img
            src="/assets/images/banner.png"
            alt="Banner"
            className="w-full h-full transition-transform duration-500"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-500 px-4 lg:p-[8rem]">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
              Explore Our Best Collection
            </h1>
            <div className="breadcrumbs text-xl lg:text-xl px-10">
              <Link
                href="/salons"
                className="text-gray-700 font-medium text-base lg:text-xl"
              >
                Salons
              </Link>
              <span className="mx-2 text-gray-500 font-medium text-base lg:text-xl">
                /
              </span>
              <Link
                href="/salons/search"
                className="text-purple-800 font-medium text-base lg:text-xl"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-x-8 px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[5rem] xl:px-[10rem] lg:py-[2rem]">
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-[30%] p-6"
        >
          <ServiceSidebar />
        </motion.aside>

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {/* Sort UI */}
          <div className="flex flex-wrap items-center gap-4 px-4 pt-4 pb-6">
            <span className="text-gray-700 text-[20px]">Sort by</span>

            <button
              onClick={() => {
                setActiveSort("Date");
                setSortOrder(sortOrder === "desc" ? "asc" : "desc");
              }}
              className={`border px-6 py-2 rounded-md text-lg font-medium transition ${
                activeSort === "Date"
                  ? "border-purple-800 text-purple-800 bg-purple-100"
                  : "border-gray-400 text-gray-700 hover:bg-[#FDF3D2]"
              }`}
            >
              Date{" "}
              {activeSort === "Date" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className={`flex items-center gap-2 border px-6 py-2 rounded-md text-lg font-medium transition ${
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
          <div className="px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.length ? (
              services.map((item: any) => (
                <ServiceCard
                  key={item._id}
                  item={item}
                  onAddToCart={handleAddToCart}
                  salonId={item.salonId}
                  salonName="Salon Name"
                />
              ))
            ) : (
              <p>No services found.</p>
            )}
          </div>
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

export default SearchResultsPage;
