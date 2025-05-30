import React from "react";

const BookingCancellationPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Booking Cancellation Policy</h1>

      <p className="mb-4">
        At Glimmer, we understand that plans change. Here’s how booking cancellations work on our platform:
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Cancellation Window</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>You can cancel or reschedule your booking up to <strong>2 hours</strong> before your scheduled appointment time.</li>
        <li>After that, the booking is <strong>non-refundable</strong> and cannot be cancelled via the website.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">How to Cancel</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Go to <strong>“My Appointments”</strong> in your account dashboard.</li>
        <li>Click on the booking you want to cancel.</li>
        <li>Select <strong>“Cancel Booking”</strong> and choose a reason.</li>
        <li>
          OR contact our support team via email:{" "}
          <a href="mailto:support@glimmer.com.pk" className="text-blue-600 underline">
            support@glimmer.com.pk
          </a>{" "}
          with your booking ID.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Late Cancellations & No-Shows</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          If you do not show up or cancel less than 2 hours before, the salon may refuse future bookings, and you may be marked as a no-show.
        </li>
        <li>
          If you prepaid online, <strong>no refund</strong> will be issued for late cancellations or no-shows.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Salon-Initiated Cancellations</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>If the salon cancels your appointment, we will notify you immediately.</li>
        <li>You will be given the option to:
          <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
            <li>Reschedule</li>
            <li>Choose another salon</li>
            <li>Get a full refund (if prepaid)</li>
          </ul>
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Refund Policy (for paid bookings)</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>If cancelled within the allowed time:</li>
        <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
          <li>Refunds will be processed within <strong>5–7 working days</strong>.</li>
          <li>Refunds go back to the original payment method (Card, Bank, etc.).</li>
        </ul>
      </ul>
    </div>
  );
};

export default BookingCancellationPolicy;
