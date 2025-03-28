"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, getAllActiveServices } from "@/api/salon";
import { AppDispatch, RootState } from "@/store/reduxStore";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Framer Motion for animations
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

const SalonServices = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  const [data, setData] = useState<any[]>([]);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [bulkForm, setBulkForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    bookingDate: "",
    paymentMethod: "",
    notes: "",
  });

  const [errors, setErrors] = useState({
    customerName: "",
    customerPhone: "",
    bookingDate: "",
  });

  const token = useSelector((state: RootState) => state.login.token);
  const salonIdFilter = searchParams.get("id") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  const fetchData = async () => {
    try {
      const result = await dispatch(
        getAllActiveServices({
          page_no: page,
          salonId: salonIdFilter,
        })
      );
      if (result.payload) {
        setData(result.payload.services);
      }
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, salonIdFilter]);

  const addToCart = (service: any) => {
    setSelectedServices((prev) => {
      const isAlreadyAdded = prev.some((item) => item._id === service._id);
      if (!isAlreadyAdded) {
        return [...prev, service];
      }
      return prev;
    });
    setIsModalOpen(true);
  };

  const removeFromCart = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.filter((item) => item._id !== serviceId)
    );
  };

  const proceedToCheckout = () => {
    setIsModalOpen(false);
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const serviceIds = selectedServices.map((service) => service._id).join(",");
    const finalPrice = selectedServices.reduce((total, service) => {
      const discountedPrice =
        service.adminSetPrice -
        (service.adminSetPrice * service.discountPercentage) / 100;
      return total + discountedPrice;
    }, 0);

    const bookingData = {
      ...bulkForm,
      serviceId: serviceIds,
      finalPrice: finalPrice,
    };

    console.log("Submitting Booking Data:", bookingData);

    try {
      const response = await createBooking(bookingData, token);

      console.log("Booking Successful:", response);
      alert("Booking Confirmed!");

      setIsModalOpen(false); // Close modal only on success
    } catch (error) {
      console.error("Booking Failed:", error);
      alert("Failed to book service. Please try again.");
    }
  };

  return (
    <div className="w-[99vw] p-10 md:mb-8">
      <div className="prose lg:prose-xl">
        <h2 className="mb-2 md:mb-3">Services</h2>
      </div>

      <div className="relative p-5 bg-[#FBE8A5]">
        <Swiper
          slidesPerView="auto"
          loop={false}
          breakpoints={{
            280: { slidesPerView: 3 },
            768: { slidesPerView: 10 },
          }}
        >
          {data?.map((item) => (
            <SwiperSlide
              key={item._id}
              className="hover:bg-black hover:text-white transition-all duration-500 ease-in-out p-4 rounded-md text-center"
            >
              <p className="font-bold">{item.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full p-5 bg-[#FBE8A5]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg border border-gray-300 shadow-md p-4 space-y-2"
            >
              <div className="flex flex-row justify-between">
                <div className="text-lg font-semibold text-gray-800">
                  {item.name} | {item.description || "No description"}
                </div>
                <div className="text-sm text-gray-500">
                  {item.duration} mins
                </div>
                <div className="text-sm text-gray-500">
                  {item.actualPrice} PKR
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => addToCart(item)}
                  className="w-[200px] py-2 text-black border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Link
            href="/salons/services"
            className="text-center py-2 px-4 border-2 border-black rounded-lg text-black font-medium hover:bg-black hover:text-white transition duration-200"
          >
            View All Services
          </Link>
        </div>
      </div>

      {/* Animated Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-[400px] bg-white h-full p-5 shadow-lg relative"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <X size={24} />
              </button>

              <h2 className="text-lg font-semibold mb-4">Selected Services</h2>

              {/* Selected Services List */}
              <div className="space-y-4">
                {selectedServices.length > 0 ? (
                  selectedServices.map((service) => {
                    const discountedPrice =
                      service.adminSetPrice -
                      (service.adminSetPrice * service.discountPercentage) /
                        100;

                    return (
                      <motion.div
                        key={service._id}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-600">
                            {discountedPrice} PKR with discount
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(service._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </motion.div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No services added.</p>
                )}
              </div>

              {/* Checkout Button */}
              <div className="mt-5">
                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <X size={24} />
              </button>

              <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
                Complete Your Booking
              </h2>

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
                          setBulkForm((prev) => ({
                            ...prev,
                            [name]: dateString,
                          }))
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    ) : (
                      <input
                        type={type}
                        name={name}
                        value={(bulkForm as Record<string, string>)[name] || ""}
                        onChange={handleChange}
                        className={`w-full p-3 border ${
                          error ? "border-red-500" : "border-gray-300"
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
                      checked={bulkForm.paymentMethod === "Prepaid (Card)"}
                      onChange={handleChange}
                      className="cursor-pointer"
                    />
                    Card Payment
                  </label>
                </div>

                {/* Notes Field */}
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Additional Notes:
                  </label>
                  <textarea
                    name="notes"
                    value={bulkForm.notes}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                    rows={3}
                    placeholder="Any additional instructions..."
                  />
                </div>

                {/* Confirm Button */}
                <button
                  type="submit"
                  className="w-full bg-purple-900 text-white py-3 rounded-md hover:bg-purple-800 transition"
                >
                  Confirm Booking
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SalonServices;
