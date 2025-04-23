"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

const CartModal = ({ selectedServices, onClose, onRemove, onProceed }: any) => (
    <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
    >
        <motion.div
            className="w-[400px] bg-white h-full p-5 shadow-lg relative"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
        >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
                <X size={24} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Selected Services</h2>
            <div className="space-y-4 overflow-y-auto max-h-[calc(100%-100px)]">
                {selectedServices.length > 0 ? (
                    selectedServices.map((service: any) => {
                        const discounted = service.adminSetPrice - (service.adminSetPrice * service.discountPercentage) / 100;
                        return (
                            <div key={service._id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                                <div>
                                    <p className="font-medium">{service.name}</p>
                                    <p className="text-sm text-gray-600">{discounted} PKR with discount</p>
                                </div>
                                <button onClick={() => onRemove(service._id)} className="text-red-500 hover:text-red-700">
                                    Remove
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500">No services added.</p>
                )}
            </div>
            <div className="mt-5">
                <button onClick={onProceed} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                    Proceed to Checkout
                </button>
            </div>
        </motion.div>
    </motion.div>
);

export default CartModal;
