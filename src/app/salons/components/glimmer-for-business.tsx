"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Img from "@/assets/images/admin-pannel-img.png";
import { handleLogout } from "@/lib/session";

const GlimmerForBusiness = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/salons/business");
  };

  return (
    <div className="flex justify-center px-2 sm:px-6 md:px-10 lg:px-[8rem] pb-16 md:pb-20 lg:pb-[8rem] w-[99vw]">
      <div
        className="relative w-full cursor-pointer"
        onClick={handleRegisterClick}
      >
        {/* Image */}
        <img
          src={Img.src}
          alt="Glimmer for Business"
          className="w-full h-auto object-cover"
        />

        {/* Overlay Content inside image */}
        <div className="absolute top-0 left-0 h-full flex flex-col justify-start pt-[6%] sm:pt-[10%] md:pt-[12%] lg:justify-center space-y-2 sm:space-y-3 md:space-y-4 pl-2 sm:pl-8 md:pl-12 max-w-[90%] sm:max-w-sm lg:max-w-md">
          <h2 className="text-gray-600 text-[14px] sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-snug">
            Glimmer For Business
          </h2>
          <p className="text-blue-900 text-[10px] sm:text-sm md:text-base lg:text-lg font-medium leading-tight sm:leading-snug max-w-[95%] sm:max-w-none">
            Join Glimmer to showcase your services
            <br />
            attract more clients effortlessly
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent parent click
              handleRegisterClick();
            }}
            className="bg-gray-600 text-white py-1.5 sm:py-3 md:py-4 rounded hover:bg-gray-800 transition w-28 sm:w-44 md:w-60 text-[11px] sm:text-sm md:text-base"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlimmerForBusiness;
