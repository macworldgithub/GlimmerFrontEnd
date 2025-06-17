// pages/checkout.tsx
"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function Checkout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Sample data — Replace with dynamic cart data
      const orderDto = {
        customerName: 'Muhammad Anas',
        customerEmail: 'anas@example.com',
        total: 1200,
        discountedTotal: 1000,
        payment: {
          status: 'Pending',
          gateway: 'JazzCash',
        },
        productList: [
          {
            storeId: 'store123',
            quantity: 1,
            total_price: 1200,
            product: {
              _id: 'product123',
              name: 'Sample Product',
              base_price: 1200,
              discounted_price: 1000,
              status: 'active',
              type: [],
              size: [],
            },
          },
        ],
        ShippingInfo: {
          fullName: 'Muhammad Anas',
          email: 'anas@example.com',
          phone: '03123456789',
          country: 'Pakistan',
          city: 'Lahore',
          state: 'Punjab',
          zip: '54000',
          address: 'Gulberg, Lahore',
          shippingMethod: 'Delivery',
        },
      };

      const { data } = await axios.post(
        'http://localhost:3000/jazzcash/initiate-payment',
        orderDto
      );

      // Redirect to JazzCash using form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/'; // use live endpoint in production

      Object.entries(data.paymentParams).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error('Order Error:', err);
      alert('Error creating order.');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>JazzCash Checkout</h2>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Pay with JazzCash'}
      </button>
    </div>
  );
}