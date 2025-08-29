"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "antd";

const OrderSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-r from-green-300 via-transparent to-purple-700 pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        <CheckCircle2 className="text-green-500 w-20 h-20 mb-4" />
      </motion.div>

      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-3xl font-bold mb-2"
      >
        Thank you for your order!
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-gray-600 mb-8 max-w-md"
      >
        Your order has been placed successfully. You’ll receive a confirmation
        email shortly with the details of your purchase.
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          type="primary"
          size="large"
          shape="round"
          className="bg-green-500 hover:bg-green-600 border-none shadow-lg"
          onClick={() => router.push("/")}
        >
          Continue Shopping
        </Button>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-green-400 rounded-full absolute"
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
            }}
            animate={{
              x: Math.random() * 600 - 300,
              y: Math.random() * 500 - 250,
              opacity: 0,
            }}
            transition={{
              duration: 2,
              delay: i * 0.05,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default OrderSuccessPage;
