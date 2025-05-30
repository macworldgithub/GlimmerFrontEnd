import React from "react";

const DeliveryAndFAQPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Delivery Information & FAQ</h1>

      {/* Delivery Info Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
        <p className="mb-3">
          <strong>We deliver across Pakistan within 3–4 working days.</strong>
        </p>
        <p>
          Orders are shipped via trusted courier services such as <strong>TCS</strong> and <strong>Leopard Courier</strong>, ensuring timely and safe delivery.
        </p>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions (FAQ)</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-lg">1. What types of products are available?</h3>
            <p>We offer a variety of beauty and grooming products, as well as salon booking services.</p>
          </div>

          <div>
            <h3 className="font-medium text-lg">2. How do I book a salon appointment?</h3>
            <p>Simply browse salons, select a time slot, and confirm your booking. You’ll receive a confirmation via SMS or email.</p>
          </div>

          <div>
            <h3 className="font-medium text-lg">3. What payment methods are accepted?</h3>
            <p>Payments are typically made at the salon unless stated otherwise. For products, online payments or cash on delivery may be available depending on your location.</p>
          </div>

          <div>
            <h3 className="font-medium text-lg">4. How can I contact support?</h3>
            <p>You can email our support team at <a href="mailto:support@glimmer.com.pk" className="text-blue-600">support@glimmer.com.pk</a> for any issues regarding your orders or bookings.</p>
          </div>

          <div>
            <h3 className="font-medium text-lg">5. What if I receive a damaged product?</h3>
            <p>If your product arrives damaged, please follow the return process within 24 hours of delivery. Full instructions are available on our <a href="/shipping-and-returns" className="text-blue-600">Shipping and Returns</a> page.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeliveryAndFAQPage;
