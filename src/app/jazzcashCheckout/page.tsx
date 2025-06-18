// pages/checkout.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';


export default function Checkout() {
  const [loading, setLoading] = useState(false);
  
  const handleCheckout = async () => {
    try {
      setLoading(true);
    
      const orderDto = {
        customerName: "Muhammad Anas",
        customerEmail: "anas@example.com",
        total: 1200,
        discountedTotal: 1000,
        payment: {
          status: "Pending",
          gateway: "JazzCash",
          transactionId: `JAZZ-${Date.now()}`,
        },
        productList: [
          {
            storeId: "store123",
            quantity: 1,
            total_price: 1200,
            product: {
              _id: "product123",
              name: "Sample Product",
              base_price: 1200,
              discounted_price: 1000,
              status: "active",
              type: [],
              size: [],
            },
          },
        ],
        ShippingInfo: {
          fullName: "Muhammad Anas",
          email: "anas@example.com",
          phone: "03123456789",
          country: "Pakistan",
          city: "Lahore",
          state: "Punjab",
          zip: "54000",
          address: "Gulberg, Lahore",
          shippingMethod: "Delivery",
        },
        // Add these two fields as required by backend
        customerPhone: "03123456789",
        customerCNIC: "4250156667561",
      };

      // Call backend to initiate payment
      const { data } = await axios.post(
        "https://www.api.glimmer.com.pk/jazzcash/initiate-payment",
        orderDto
      );
      
      // Create form with all parameters from backend
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.redirectUrl;

      // Add all parameters from backend
      Object.entries(data.paymentParams).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Payment initiation failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>JazzCash Checkout</h2>
      <button 
        onClick={handleCheckout} 
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay with JazzCash'}
      </button>
    </div>
  );
}
