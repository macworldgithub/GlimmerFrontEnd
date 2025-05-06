"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import { createBooking, getAllActiveServices, getServiceById } from "@/api/salon";
import { useSearchParams } from "next/navigation";
import { DatePicker, Modal, TimePicker } from "antd";
import { AppDispatch, RootState } from "@/store/reduxStore";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import ServiceCard from "@/common/ServiceCard";
import { addService, clearServiceCart } from "@/reduxSlices/serviceCartSlice";
import CartModal from "../../[id]/components/cartModal";
import CheckoutModal from "../../[id]/components/checkoutModal";

const ServiceDetails = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const [service, setService] = useState<any>();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [data, setData] = useState<any[]>([]);
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

  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.login.token);
  const { services: selectedServices } = useSelector((state: RootState) => state.serviceCart);

  const serviceId = searchParams.get("serviceId");
  const salonIdFilter = searchParams.get("salonId") ?? "";
  const openingHour = searchParams.get("openingHour") ?? "";
  const closingHour = searchParams.get("closingHour") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  // Parse those into dayjs
  const opening = dayjs(openingHour, "h:mm a");
  const closing = dayjs(closingHour, "h:mm a");


  // Helper to disable hours outside opening-closing
  const disabledHours = () => {
    const openingHourNum = opening.hour(); // 24-hour format (e.g., 11)
    const closingHourNum = closing.hour(); // e.g., 21

    const allHours = Array.from({ length: 12 }, (_, i) => i + 1); // 1 to 12

    const allowedHours: number[] = [];
    for (let h = openingHourNum; h <= closingHourNum; h++) {
      const hr12 = h % 12 === 0 ? 12 : h % 12;
      allowedHours.push(hr12);
    }

    return allHours.filter((hr) => !allowedHours.includes(hr));
  };

  const fetchData = async () => {
    try {
      if (salonIdFilter) {
        const result = await dispatch(
          getAllActiveServices({
            page_no: page,
            salonId: salonIdFilter,
          })
        );
        console.log(result)
        if (result.payload) {
          setData(result.payload.services);
        }
      }
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  useEffect(() => {
    if (salonIdFilter) {
      fetchData();
    }
  }, [page, salonIdFilter]);


  useEffect(() => {
    if (!serviceId) return;

    const fetchService = async () => {
      const data = await getServiceById(serviceId);
      setService(data);
    };

    fetchService();
  }, [serviceId]);

  const discountedPrice =
    service?.adminSetPrice -
    (service?.adminSetPrice * service?.discountPercentage) / 100;

  const tabs = [
    {
      title: "Description",
      content: service?.description || "No description available.",
    },
  ];

  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768); // Set after mounting
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let images = [service?.image1, service?.image2, service?.image3].filter(
    Boolean
  );

  // Ensure at least 3 images (fallback for missing ones)
  while (images.length < 3) {
    images.push("/assets/images/default_image.jpg");
  }

  // Handle Next Image
  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  // Handle Previous Image
  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBuy = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBulkForm({ ...bulkForm, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors: any = {};
    if (!bulkForm.customerName.trim())
      newErrors.customerName = "Name is required!";
    if (!bulkForm.customerPhone.trim())
      newErrors.customerPhone = "Phone number is required!";
    if (!bulkForm.bookingDate.trim())
      newErrors.bookingDate = "Booking date is required!";
    if (!bulkForm.bookingTime.trim())
      newErrors.bookingTime = "Booking time is required!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const bookingData = {
      ...bulkForm,
      serviceId: serviceId,
      finalPrice: discountedPrice,
    };

    console.log("Submitting Booking Data:", bookingData);

    try {
      const response = await createBooking(bookingData, token);

      console.log("Booking Successful:", response);
      alert("Booking Confirmed!");

      setIsCheckoutModalOpen(false); // Close modal only on success
    } catch (error) {
      console.error("Booking Failed:", error);
      alert("Failed to book service. Please try again.");
    }
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
    const discountedPrice = item.hasDiscount
      ? item.adminSetPrice - (item.adminSetPrice * (item.discountPercentage || 0)) / 100
      : item.adminSetPrice;
    dispatch(
      addService({
        service: {
          _id: item._id,
          name: item.name,
          description: item.description,
          image1: item.image1,
          base_price: item.adminSetPrice,
          discounted_price: discountedPrice,
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
    <>
      {/* Breadcrumbs */}
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
          className="text-gray-500 font-medium text-base lg:text-xl"
        >
          Services
        </Link>
        {service && (
          <>
            <span className="mx-2 text-purple-800 text-base lg:text-xl">/</span>
            <span className="text-purple-800 font-medium text-base lg:text-xl">
              Details
            </span>
          </>
        )}
      </div>
      <div className="mb-8 flex flex-col justify-center lg:w-[91vw] mx-auto gap-8 p-8 md:mb-5 lg:flex-row lg:gap-12 lg:mb-10">
        {/* Floating Cart Conflict Warning */}
        {showCartConflictWarning && (
          <div className="fixed bottom-6 right-6 bg-white/80 backdrop-blur-md border border-red-400 shadow-lg rounded-lg p-4 z-50 w-[300px] animate-fade-in">
            <h4 className="text-red-600 font-semibold mb-2">Conflict Detected</h4>
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
        {/* Left Side: Product Image Gallery */}
        <div className="flex flex-col items-center lg:w-[65%] w-full">
          {/* Main Image Container */}
          <div className="w-full max-w-[650px] max-sm:w-[300px] max-sm:h-[300px] sm:w-[400px] md:w-[500px] sm:h-[400px] flex items-center justify-center overflow-hidden rounded-md shadow bg-gray-100">
            <img
              src={images[index]}
              alt={service?.name}
              className="w-full h-full"
            />
          </div>

          {/* Thumbnails Section */}
          <div className="mt-10 flex items-center justify-center w-full max-w-[500px]">
            {/* Left Arrow Button */}
            <button onClick={handlePrev} className="p-2 text-gray-500">
              <MdOutlineKeyboardArrowLeft size={50} />
            </button>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-hidden">
              {isMobile
                ? [images[index]].map((image, i) => (
                  <div
                    key={i}
                    className="mx-4 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] flex items-center justify-center overflow-hidden rounded-md shadow bg-gray-100 border cursor-pointer border-purple-900"
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) =>
                      (e.currentTarget.src =
                        "/assets/images/default_image.jpg")
                      }
                    />
                  </div>
                ))
                : images.map((image, i) => (
                  <div
                    key={i}
                    className={`mx-4 md:w-[90px] md:h-[90px] flex items-center justify-center overflow-hidden rounded-md shadow bg-gray-100 border border-gray-300 cursor-pointer ${i === index ? "border-purple-900" : ""
                      }`}
                    onClick={() => setIndex(i)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) =>
                      (e.currentTarget.src =
                        "/assets/images/default_image.jpg")
                      }
                    />
                  </div>
                ))}
            </div>

            {/* Right Arrow Button */}
            <button onClick={handleNext} className="p-2 text-gray-500">
              <MdKeyboardArrowRight size={50} />
            </button>
          </div>

          {/* Ratings Section */}
          <div className="mt-20 w-full hidden lg:block">
            <h2 className="text-4xl font-semibold text-gray-800">Ratings</h2>
            <p className="text-gray-700 mt-1 text-xl">
              {service?.ratings ? `${service.ratings}/5` : "No ratings yet"}
            </p>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ms-1 ${service?.ratings && index < Math.round(service.ratings)
                    ? "text-purple-800"
                    : "text-gray-300"
                    }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Percentage Bar Section */}
          <div className="mt-[1rem] w-full hidden lg:block">
            {[5, 4, 3, 2, 1].map((star, index) => {
              const percentage = star * 20;
              return (
                <div
                  key={star}
                  className={`flex items-center gap-3 ${index < 4 ? "mb-4" : ""
                    }`}
                >
                  <span className="text-purple-800">{star} ★</span>
                  <div className="w-full bg-gray-200 rounded-md h-3 flex-1">
                    <div
                      className="h-3 bg-purple-800 rounded-md"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col gap-4 relative lg:w-[35%] w-full">
          <h1 className="font-semibold text-2xl">{service?.name}</h1>
          {/* Price */}
          <div className="font-semibold text-4xl">
            {service?.adminSetPrice > discountedPrice ? (
              <>
                {/* Discounted Price */}
                <span className="text-[#583FA8]">{discountedPrice} PKR</span>

                {/* Strike-through Original Price */}
                <span className="text-gray-500 line-through ml-2 mr-2 text-xs">
                  {service?.adminSetPrice} PKR
                </span>

                {/* Discount Badge */}
                <div className="w-12 h-12 text-sm absolute right-0 flex justify-center items-center">
                  <img src="/assets/addtoBag/discount.png" alt="Discount" />
                  <span className="absolute text-center text-sm text-white font-bold">
                    {`${Math.round(service?.discountPercentage)}% OFF`}
                  </span>
                </div>
              </>
            ) : (
              /* If No Discount, Show Base Price */
              <span className="text-[#583FA8]">
                {service?.adminSetPrice} PKR
              </span>
            )}
          </div>

          {/* Star Rating */}
          <div className="flex items-center mt-2">
            {[...Array(4)].map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-[#583FA8] ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <svg
              className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <h3 className="h-4 ms-1 text-gray-300 dark:text-gray-500">
              (4/5) <span className="mx-2">|</span> 201 reviews
            </h3>
          </div>
          <hr className="my-2.5 border-t border-gray-400 dark:text-gray-500 w-full" />

          {/* Duration, Gender, Sub service */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="flex items-center font-semibold text-gray-700 dark:text-gray-700">
              <span>Duration:</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 flex gap-2 flex-wrap">
              {service?.duration ? (
                <span className="px-2 py-1 border bg-white hover:bg-[#6B21A8] hover:text-white cursor-pointer border-gray-300 dark:border-gray-600 rounded-md text-sm">
                  {service.duration} mins
                </span>
              ) : (
                "No duration"
              )}
            </div>

            <div className="flex items-center font-semibold text-gray-700 dark:text-gray-700">
              <span>Gender:</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {service?.subCategoryName
                ? service.subCategoryName
                : "No sub-category"}
            </div>

            <div className="flex items-center font-semibold text-gray-700 dark:text-gray-700">
              <span>Sub Service:</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {service?.subSubCategoryName
                ? service.subSubCategoryName
                : "No sub-sub-category"}
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex items-center gap-4 mt-4">
            <button
              className={`flex-1 w-full flex items-center text-xs justify-center gap-2 py-3 xl:px-6 px-4 border text-purple-800 font-semibold rounded-md`}
              onClick={handleBuy}
            >
              BOOK NOW
            </button>
            <button
              className={`flex-1 w-full flex items-center text-xs justify-center gap-2 py-3 xl:px-6 px-4 border bg-[#583FA8] text-white font-semibold rounded-md`}
              onClick={() => {
                if (!service) return;
                handleAddToCart(service);
              }}
            >
              <Image
                alt="cart-icon"
                width={15}
                height={15}
                src={"/assets/addtoBag/cart-icon.png"}
              />
              ADD TO BAG
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="px-3 border border-[#583FA8] text-[#583FA8 ] h-11 rounded-md"
            >
              <Image
                src={
                  isWishlisted
                    ? "/assets/addtoBag/heart-filled.png"
                    : "/assets/addtoBag/heart.png"
                }
                alt="wishlist"
                width={20}
                height={20}
              />
            </button>
          </div>
          <Modal
            title={
              <h2 className="text-xl font-bold text-gray-800">
                Complete Your Booking
              </h2>
            }
            open={isCheckoutModalOpen}
            onCancel={() => setIsCheckoutModalOpen(false)}
            footer={null}
            centered
            className="rounded-lg mb-[15rem]"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input Fields */}
              {[
                {
                  label: "Customer Name",
                  name: "customerName",
                  type: "text",
                  error: errors.customerName,
                },
                {
                  label: "Customer Email",
                  name: "customerEmail",
                  type: "email",
                },
                {
                  label: "Customer Phone",
                  name: "customerPhone",
                  type: "tel",
                  error: errors.customerPhone,
                },
                {
                  label: "Booking Date",
                  name: "bookingDate",
                  type: "date",
                  error: errors.bookingDate,
                },
                {
                  label: "Booking Time",
                  name: "bookingTime",
                  type: "time",
                  error: errors.bookingTime,
                },
              ].map(({ label, name, type, error }) => (
                <div key={name}>
                  <label className="font-semibold text-gray-700 block mb-1">
                    {label}:
                  </label>

                  {type === "date" ? (
                    <DatePicker
                      format="YYYY-MM-DD"
                      disabledDate={(current) =>
                        current && current.isBefore(dayjs(), "day")
                      }
                      onChange={(date, dateString) =>
                        setBulkForm((prev) => ({ ...prev, [name]: dateString }))
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  ) : name === "bookingTime" ? (
                    <TimePicker
                      use12Hours
                      format="h:mm A"
                      minuteStep={30}
                      disabledHours={disabledHours}
                      disabledMinutes={() => {
                        const allowed = [0, 30];
                        return Array.from({ length: 60 }, (_, i) => i).filter((min) => !allowed.includes(min));
                      }}
                      hideDisabledOptions
                      showNow={false}
                      onChange={(time) =>
                        setBulkForm((prev) => ({
                          ...prev,
                          bookingTime: time ? time.format("h:mm A") : "",
                        }))
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={(bulkForm as Record<string, string>)[name] || ""}
                      onChange={handleChange}
                      className={`w-full p-3 border ${error ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-purple-500 outline-none`}
                      required
                    />
                  )}

                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>
              ))}

              {/* Payment Method */}
              <label className="font-semibold text-gray-700 block mb-2">
                Payment Method:
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Pay at Counter"
                    checked={bulkForm.paymentMethod === "Pay at Counter"}
                    onChange={handleChange}
                    className="cursor-pointer"
                  />
                  Counter Payment
                </label>
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Prepaid (Card)"
                    onChange={handleChange}
                    className="cursor-pointer"
                  />
                  Card Payment
                </label>
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                className="w-full bg-purple-900 text-white py-3 rounded-md hover:bg-purple-800 transition"
              >
                Confirm Booking
              </button>
            </form>
          </Modal>

          {/* Tabs Section */}
          <div className="mt-12">
            <div className="flex border-b border-gray-300">
              {tabs.map((tab) => (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(tab.title)}
                  className={`flex-1 py-2 px-4 font-semibold ${activeTab === tab.title
                    ? "text-purple-800 border-b-2 border-purple-800"
                    : "text-gray-600"
                    }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Description Content */}
            <div className="p-4 text-gray-700 dark:text-gray-500">
              {tabs.find((tab) => tab.title === activeTab)?.content}
            </div>
          </div>

          {/* Ratings Section for Mobile */}
          <div className="mt-12 w-full lg:hidden">
            <h2 className="text-4xl font-semibold text-gray-800">Ratings</h2>
            <p className="text-gray-700 mt-1 text-xl">
              {service?.ratings ? `${service.ratings}/5` : "No ratings yet"}
            </p>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ms-1 ${service?.ratings && index < Math.round(service.ratings)
                    ? "text-purple-800"
                    : "text-gray-300"
                    }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Percentage Bar Section for Mobile */}
          <div className="mt-[1rem] w-full lg:hidden">
            {[5, 4, 3, 2, 1].map((star, index) => {
              const percentage = star * 20;
              return (
                <div
                  key={star}
                  className={`flex items-center gap-3 ${index < 4 ? "mb-4" : ""
                    }`}
                >
                  <span className="text-purple-800">{star} ★</span>
                  <div className="w-full bg-gray-200 rounded-md h-3 flex-1">
                    <div
                      className="h-3 bg-purple-800 rounded-md"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-[99vw] p-10 justify-center md:mb-5 md:flex-row md:gap-1">
        <h2 className="text-4xl font-semibold">Related Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-10">
          {data.length ? (
            data.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.02 }}
                className="flex"
              >
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
          {isCheckoutModalOpen && selectedItem && (
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
    </>
  );
};

export default ServiceDetails;
