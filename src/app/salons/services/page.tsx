"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Salonfilter from "../components/salonFIlter";
import ServiceSidebar from "@/common/ServiceSidebar";
import { createBooking, getAllActiveServices } from "@/api/salon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/reduxStore";
import ServiceCard from "@/common/ServiceCard";
import { BiChevronDown } from "react-icons/bi";
import CartModal from "../[id]/components/cartModal";
import CheckoutModal from "../[id]/components/checkoutModal";
import { addService, clearServiceCart } from "@/reduxSlices/serviceCartSlice";

const Loading = () => (
  <div className="justify-center flex min-h-[70vh] w-full items-center">
    <div className="text-center font-bold text-3xl">Loading...</div>
  </div>
);

const ServiceList = () => {
  const [activeSort, setActiveSort] = useState("Date");
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
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

  const pageSize = 8;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.login.token);
  const { services: selectedServices } = useSelector((state: RootState) => state.serviceCart);

  const categoryIdFilter = searchParams.get("categoryId") ?? "";
  const salonIdFilter = searchParams.get("salonId") ?? "";
  const subCategoryNameFilter = searchParams.get("subCategoryName") ?? "";
  const subSubCategoryNameFilter = searchParams.get("subSubCategoryName") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  const fetchData = async () => {
    try {
      const result = await dispatch(
        getAllActiveServices({
          page_no: page,
          categoryId: categoryIdFilter,
          salonId: salonIdFilter,
          subCategoryName: subCategoryNameFilter,
          subSubCategoryName: subSubCategoryNameFilter,
        })
      );
      if (result.payload) {
        setData(result.payload.services);
        setTotal(result.payload.total);
      }
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  useEffect(() => {
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
      alert("You cannot add services from different salons in the same booking.");
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
            ? item.adminSetPrice - (item.adminSetPrice * item.discountPercentage) / 100
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
    setIsCartModalOpen(true);  // Open the modal
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
          await createBooking({
            ...bulkForm,
            serviceId: service._id,
            finalPrice: service.discounted_price,
          }, token);
        } catch (error) {
          console.error("Booking failed for service:", service._id, error);
        }
      }
      dispatch(clearServiceCart());
      localStorage.removeItem('serviceCart');
      alert("Booking confirmed!");
      setIsCheckoutModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed.");
    }
  };

  return (
    <div className="flex flex-col w-[99vw] pb-[8rem]">
      <div className="px-10 py-10 bg-[#FBE8A5] mb-4 z-10">
        <Salonfilter />
      </div>

      <div className="breadcrumbs mb-4 text-xl lg:text-xl px-10">
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
      </div>

      <div className="hidden md:block pt-[3rem] px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[6rem] xl:px-[12rem]">
        <div className="w-full h-[50vh] rounded-lg overflow-hidden relative group">
          <img
            src="/assets/images/banner.png"
            alt="Banner"
            className="w-full h-full transition-transform duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-500 px-4 lg:p-[8rem]">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center">
              Explore Our Best Collection
            </h1>
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
              className={`border px-6 py-2 rounded-md text-lg font-medium transition ${activeSort === "Date"
                ? "border-purple-800 text-purple-800 bg-purple-100"
                : "border-gray-400 text-gray-700 hover:bg-[#FDF3D2]"
                }`}
            >
              Date {activeSort === "Date" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className={`flex items-center gap-2 border px-6 py-2 rounded-md text-lg font-medium transition ${activeSort === "Price"
                  ? "border-purple-800 text-purple-800 bg-purple-100"
                  : "border-gray-400 text-gray-700 hover:bg-[#FDF3D2]"
                  }`}
              >
                Price{" "}
                {activeSort === "Price" ? (sortOrder === "desc" ? "↓" : "↑") : ""}{" "}
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
          <div className="w-full h-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-10 p-6">
            {data.length ? (
              data.map((item) => (
                <motion.div key={item._id} whileHover={{ scale: 1.02 }} className="flex">
                  <ServiceCard item={item} onAddToCart={handleAddToCart} />
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
          {total > 0 && (
            <div className="w-full flex justify-center items-center space-x-2 py-4">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-lg text-gray-600">
                Page {page} of {Math.ceil(total / pageSize)}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === Math.ceil(total / pageSize)}
                className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 disabled:opacity-50"
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
            onDateChange={(name: any, value: any) => setBulkForm((prev) => ({ ...prev, [name]: value }))}
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
