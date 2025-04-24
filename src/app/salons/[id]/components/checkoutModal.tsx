"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useSearchParams } from "next/navigation";

const CheckoutModal = ({ form, errors, onChange, onDateChange, onClose, onSubmit }: any) => {
    const searchParams = useSearchParams();

    const openingHour = searchParams.get("openingHour") ?? "";
    const closingHour = searchParams.get("closingHour") ?? "";

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
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
                    <X size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">Complete Your Booking</h2>
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
                                    minuteStep={30}
                                    disabledHours={disabledHours}
                                    disabledMinutes={() => {
                                        const allowed = [0, 30];
                                        return Array.from({ length: 60 }, (_, i) => i).filter((min) => !allowed.includes(min));
                                    }}
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
                                    className={`w-full p-2 border ${errors[name] ? "border-red-500" : "border-gray-300"} rounded`}
                                />
                            )}
                            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
                        </div>
                    ))}

                    <label className="block font-semibold">Payment Method:</label>
                    <div className="flex gap-4">
                        {["Pay at Counter", "Prepaid (Card)"].map((method) => (
                            <label key={method} className="flex items-center gap-2 text-gray-700">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method}
                                    checked={form.paymentMethod === method}
                                    onChange={onChange}
                                />
                                {method}
                            </label>
                        ))}
                    </div>

                    <button type="submit" className="w-full bg-purple-900 text-white py-3 rounded hover:bg-purple-800">
                        Confirm Booking
                    </button>
                </form>
            </motion.div>
        </motion.div>
    )
};

export default CheckoutModal;
