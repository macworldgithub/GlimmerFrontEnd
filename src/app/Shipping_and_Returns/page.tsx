import React from "react";

const ShippingAndReturnsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Shipping and Returns</h1>

      <p className="mb-4">
        <strong>Returns accepted within 24 hours of delivery</strong> if the product is eligible (e.g., damaged or incorrect).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">How to Initiate a Return</h2>

      <p className="mb-4">
        If you received a <strong>damaged, incorrect, or defective item</strong>, you may request a return within 24 hours of delivery by following these steps:
      </p>

      <ol className="list-decimal list-inside space-y-3 mb-6">
        <li>
          <strong>Send an Email to:</strong><br />
          <a href="mailto:returns@glimmer.com.pk" className="text-blue-600">returns@glimmer.com.pk</a>
        </li>
        <li>
          <strong>Include the Following Details:</strong>
          <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
            <li>Your Order Number</li>
            <li>Your Full Name</li>
            <li>Product Name and Quantity</li>
            <li>Clear Photos showing the issue (damaged product, wrong item, etc.)</li>
            <li>A brief description of the issue</li>
          </ul>
        </li>
        <li>
          <strong>Subject Line:</strong><br />
          <span className="italic">"Return Request – Order #XXXX"</span>
        </li>
        <li>
          Our team will review your request and respond within <strong>1–2 working days</strong>.
        </li>
      </ol>

      <h3 className="text-lg font-semibold text-red-700 mb-3">Important Notes</h3>
      <ul className="list-disc list-inside space-y-2 mb-10 text-gray-700">
        <li>Products must be unused, unopened, and in original packaging.</li>
        <li>Return requests made after 24 hours of delivery will not be accepted.</li>
        <li>Items marked as non-returnable or used hygiene products cannot be returned.</li>
        <li>Items not eligible for return include used products and hygiene items.</li>
      </ul>
    </div>
  );
};

export default ShippingAndReturnsPage;
