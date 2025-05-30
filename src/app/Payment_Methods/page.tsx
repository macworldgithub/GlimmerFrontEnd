import React from "react";

const PaymentMethodsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Payment Methods</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Payment Methods for Products</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Cash on Delivery (COD)</li>
          <li>Credit/Debit Card (Visa and Mastercard accepted)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Payment Methods for Salon Appointments</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Pay Online by Card:</strong> Securely pay using your Debit or Credit Card at the time of booking.
          </li>
          <li>
            <strong>Pay at Salon:</strong> Make payment directly at the salon.
            <p className="ml-4 mt-1 text-sm text-gray-600">
              Note: Some salons may only accept “Pay at Salon” based on their settings. Payment option will be shown
              before you confirm your booking.
            </p>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Shipping Guide</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Orders are processed within 24 hours and delivered in 3–4 working days across Pakistan via reputed courier services.</li>
          <li>Delivery time may vary slightly for remote areas.</li>
          <li>Nationwide delivery across Pakistan.</li>
          <li>Estimated delivery time: 3–4 working days after order confirmation.</li>
          <li>Products purchased through salon profiles are processed like regular orders.</li>
          <li>Same return policy applies (24 hours from delivery, if eligible).</li>
        </ul>
      </section>
    </div>
  );
};

export default PaymentMethodsPage;
