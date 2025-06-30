"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Img from "@/assets/images/admin-pannel-img.png";

const GlimmerForBusiness = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
 router.push("/salons/business");
  };

  return (
    <div className="flex justify-center px-2 sm:px-6 md:px-10 lg:px-[8rem] pb-16 md:pb-20 lg:pb-[8rem] w-[99vw]">
      <div className="relative w-full">
        {/* Image */}
        <img
          src={Img.src}
          alt="Glimmer for Business"
          className="w-full h-auto object-cover"
        />

        {/* Overlay Content inside image */}
        <div className="absolute top-0 left-0 h-full flex flex-col justify-center space-y-2 sm:space-y-4 pl-3 sm:pl-8 md:pl-12 max-w-xs sm:max-w-sm">
          <h2 className="text-gray-600 text-2xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Glimmer For Business
          </h2>
          <p className="text-blue-900 text-[11px] sm:text-sm md:text-base font-medium leading-snug">
            Join Glimmer to showcase your services
            <br />
            and attract more clients effortlessly
          </p>
          <button
            onClick={handleRegisterClick}
            className="bg-gray-600 text-white py-2 sm:py-4 rounded hover:bg-gray-800 transition w-36 sm:w-60 text-xs sm:text-base"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlimmerForBusiness;
