"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useSearchParams } from "next/navigation";

const CheckoutModal = ({
  form,
  errors,
  onChange,
  onDateChange,
  onClose,
  onSubmit,
}: any) => {
  const searchParams = useSearchParams();

  const openingHour = searchParams.get("openingHour") ?? "";
  const closingHour = searchParams.get("closingHour") ?? "";

  // Parse those into dayjs
  const opening = dayjs(openingHour, "h:mm a");
  const closing = dayjs(closingHour, "h:mm a");

  const disabledHours = () => {
    const start = opening.hour();
    const end = closing.hour();

    if (isNaN(start) || isNaN(end)) return [];

    const disabled = [];

    for (let i = 0; i < 24; i++) {
      // Disable hours outside of range
      if (start < end) {
        if (i < start || i >= end) disabled.push(i);
      } else {
        // If time range crosses midnight (e.g., 10 PM to 6 AM)
        if (i < start && i >= end) disabled.push(i);
      }
    }

    return disabled;
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-6 overflow-y-auto"
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          Complete Your Booking
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {[
            { label: "Customer Name", name: "customerName", type: "text" },
            { label: "Customer Email", name: "customerEmail", type: "email" },
            { label: "Customer Phone", name: "customerPhone", type: "tel" },
            { label: "Booking Date", name: "bookingDate", type: "date" },
            { label: "Booking Time", name: "bookingTime", type: "time" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block font-semibold mb-1">{label}:</label>
              {type === "date" ? (
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={(current) =>
                    current && current.isBefore(dayjs(), "day")
                  }
                  onChange={(date, dateStr) => onDateChange(name, dateStr)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                />
              ) : name === "bookingTime" ? (
                <TimePicker
                  use12Hours
                  format="h:mm A"
                  minuteStep={1}
                  disabledHours={disabledHours}
                  hideDisabledOptions
                  showNow={false}
                  onChange={(date, dateStr) => onDateChange(name, dateStr)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={onChange}
                  className={`w-full p-2 border ${errors[name] ? "border-red-500" : "border-gray-300"
                    } rounded`}
                />
              )}
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <label className="block font-semibold">Payment Method:</label>
          <div className="flex flex-col gap-3">
            {/* Counter Payment */}
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="paymentMethod"
                value="Pay at Counter"
                checked={form.paymentMethod === "Pay at Counter"}
                onChange={onChange}
                className="cursor-pointer"
              />
              Counter Payment
            </label>

            {/* Prepaid (Card)
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="paymentMethod"
                value="Prepaid (Card)"
                checked={form.paymentMethod === "Prepaid (Card)"}
                onChange={onChange}
                className="cursor-pointer"
              />
              Prepaid (Card)
            </label> */}

            {/* Bank Alfalah Online Payment */}
            <label
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all
      ${form.paymentMethod === "Bank Alfalah"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
                }`}
              onClick={() =>
                onChange({
                  target: { name: "paymentMethod", value: "Bank Alfalah" },
                })
              }
            >
              <input
                type="radio"
                name="paymentMethod"
                value="Bank Alfalah"
                checked={form.paymentMethod === "Bank Alfalah"}
                onChange={onChange}
                className="hidden"
              />
              <span>🏦</span>
              <span className="font-medium">Online Payment (Bank Alfalah)</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-900 text-white py-3 rounded hover:bg-purple-800"
          >
            Confirm Booking
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CheckoutModal;
