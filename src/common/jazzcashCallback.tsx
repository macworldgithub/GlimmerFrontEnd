// pages/payment/callback.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Callback() {
  const router = useRouter();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    if (!router.isReady) return;

    const verifyPayment = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/order/payment/callback',
          { params: router.query }
        );

        setStatus(response.data.message);
      } catch (err) {
        console.error(err);
        setStatus('Payment verification failed.');
      }
    };

    verifyPayment();
  }, [router.isReady]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Payment Status</h2>
      <p>{status}</p>
    </div>
  );
}