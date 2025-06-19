import { useState } from 'react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://www.api.glimmer.com.pk/alfalah/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: "Muhammad Anas",
          customerEmail: "anas@example.com",
          total: 1200,
          discountedTotal: 1000,
          ShippingInfo: {
            fullName: "Muhammad Anas",
            email: "anas@example.com",
            phone: "03123456789",
            country: "Pakistan",
            city: "Lahore",
            state: "Punjab",
            zip: "54000",
            address: "Gulberg, Lahore",
            shippingMethod: "Delivery"
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
                size: []
              }
            }
          ],
          customerPhone: "03123456789",
          customerCNIC: "4250156667561"
        })
      });

      const data = await res.json();

      if (res.ok && data.redirectUrl) {
        window.location.href = data.redirectUrl; // 🔁 redirect to Alfalah
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: 40 }}>
      <h1>Checkout</h1>
      <p>Click the button below to simulate a payment.</p>

      <button
        onClick={handlePayment}
        style={{
          padding: '12px 24px',
          fontSize: 16,
          backgroundColor: '#1e40af',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer'
        }}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay with Alfalah'}
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: 20 }}>
          ❌ {error}
        </p>
      )}
    </div>
  );
}