"use client";

import React from "react";

const ProductFilter = () => {
  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1220px]">
        {/* Card 1 */}
        <div className="bg-[#FFF1C8] rounded-[10px] p-6 flex flex-col justify-between w-full max-w-[750px] min-h-[576px] mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Salon Booking
            </h2>
            <p className="text-sm text-gray-700">Starting from</p>
            <p className="text-lg font-bold text-[#D92C59]">$29.99</p>
          </div>
          <div className="mt-4 w-full h-[358px] overflow-hidden rounded-[10px]">
            <img
              src="/assets/saloonPicture/salon.png"
              alt="Salon Booking"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F5F5F5] rounded-[10px] p-6 flex flex-col justify-between w-full max-w-[750px] min-h-[576px] mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Spa Booking
            </h2>
            <p className="text-sm text-gray-700">Starting from</p>
            <p className="text-lg font-bold text-[#D92C59]">$24.99</p>
          </div>
          <div className="mt-4 w-full h-[358px] overflow-hidden rounded-[10px]">
            <img
              src="/assets/saloonPicture/spa.png"
              alt="Spa Booking"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#F5F5F5] rounded-[10px] p-6 flex flex-col justify-between w-full max-w-[750px] min-h-[576px] mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Aesthetic Clinic Appointments
            </h2>
          </div>
          <div className="mt-4 w-full h-[342px] overflow-hidden rounded-[10px]">
            <img
              src="/assets/saloonPicture/clinic.png"
              alt="Clinic"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#FFF1C8] rounded-[10px] p-6 flex flex-col justify-between w-full max-w-[750px] min-h-[576px] mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Gym Memberships
            </h2>
            <p className="text-sm text-gray-700">MAKEUP</p>
            <p className="text-sm text-gray-700">Ultimate Beauty Kit</p>
            <p className="text-lg font-bold text-[#D92C59]">$49.99</p>
          </div>
          <div className="mt-4 w-full h-[342px] overflow-hidden rounded-[10px]">
            <img
              src="/assets/saloonPicture/gym.png"
              alt="Gym"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
