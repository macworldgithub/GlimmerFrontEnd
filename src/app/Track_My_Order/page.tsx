"use client";

import React, { useState } from "react";

const mockData = {
  ORDER12345: {
    status: "Shipped",
    courier: "TCS",
    trackingLink: "https://www.tcsexpress.com/track/ORDER12345",
  },
  ORDER98765: {
    status: "Delivered",
    courier: "Leopard",
    trackingLink: "https://leopardcourier.com/track/ORDER98765",
  },
};

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [orderInfo, setOrderInfo] = useState<null | {
    status: string;
    courier: string;
    trackingLink: string;
  }>(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = () => {
    //@ts-ignore
    const info = mockData[orderId.trim().toUpperCase()];
    if (info) {
      setOrderInfo(info);
      setNotFound(false);
    } else {
      setOrderInfo(null);
      setNotFound(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Track My Order</h1>

      <div className="mb-6">
        <label htmlFor="orderId" className="block mb-2 font-medium">
          Enter your Order Number:
        </label>
        <input
          id="orderId"
          type="text"
          placeholder="e.g., ORDER12345"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleTrack}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Track Order
        </button>
      </div>

      {orderInfo && (
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Order Status</h2>
          <p>
            <strong>Status:</strong> {orderInfo.status}
          </p>
          <p>
            <strong>Courier:</strong> {orderInfo.courier}
          </p>
          <p>
            <strong>Tracking Link:</strong>{" "}
            <a
              href={orderInfo.trackingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {orderInfo.trackingLink}
            </a>
          </p>
        </div>
      )}

      {notFound && (
        <div className="mt-4 text-red-600">
          No order found with that number. Please double-check your input.
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
