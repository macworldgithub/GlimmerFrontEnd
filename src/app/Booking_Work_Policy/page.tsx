import React from "react";

const BookingWorkPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">How Booking Works</h1>

      <ol className="list-decimal list-inside space-y-3 mb-6">
        <li><strong>Browse Services</strong> – Choose the type of service you want.</li>
        <li><strong>Select a Salon</strong> – Based on location, reviews, and prices.</li>
        <li><strong>Choose Time Slot</strong> – Pick your preferred date and time.</li>
        <li><strong>Confirm Booking</strong> – Instant or manual confirmation sent to your phone/email.</li>
        <li><strong>Visit & Enjoy</strong> – Go to the salon, get the service, and pay directly.</li>
      </ol>

      <p className="text-green-700 font-medium mb-10">
        “All partner salons are verified by Glimmer.”
      </p>

      <h2 className="text-2xl font-bold mb-4">Salon Booking Policy</h2>

      <ul className="list-disc list-inside space-y-3 mb-6">
        <li>Bookings are subject to salon availability.</li>
        <li>Confirmation is sent via SMS/email.</li>
        <li>Customers should arrive 10 minutes early.</li>
        <li>Cancel or reschedule at least 2 hours before your appointment.</li>
        <li>No-shows may not be rebooked without a penalty.</li>
        <li>All payments are made at the salon unless explicitly stated.</li>
      </ul>

      <h3 className="text-lg font-semibold text-red-700 mt-8 mb-2">Disclaimer</h3>
      <p className="text-gray-700">
        “Glimmer is a facilitator platform. Service quality is the sole responsibility of the salon.
        However, we’re here to assist with any complaints.”
      </p>
    </div>
  );
};

export default BookingWorkPolicyPage;
