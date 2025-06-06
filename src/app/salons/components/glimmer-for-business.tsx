import React from "react";
import Img from "@/assets/images/admin-pannel-img.png";

const GlimmerForBusiness = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-2 sm:px-6 md:px-10 lg:px-[10rem] pb-16 md:pb-20 lg:pb-[10rem] md:flex-row md:space-y-0 w-[99vw]">
      {/* <div className="md:w-[35%]"> */}
        {/* Heading */}
        {/* <div className="mb-4 text-left">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-black">
            Glimmer for Business
          </h1>
        </div> */}

        {/* Subtitle
        <div className="mb-4 max-w-md text-left">
          <p className="text-gray-600 text-lg sm:text-xl">
            Join Glimmer to showcase your services and attract more clients
            effortlessly.
          </p>
        </div> */}

        {/* Button
        <div className="mb-4 text-left">
          <button className="rounded-lg bg-black px-6 py-3 text-sm sm:text-base text-white hover:bg-gray-800">
            Register your Salon
          </button>
        </div> */}
      {/* </div> */}

      {/* Image Container */}
      <div className="flex items-center justify-center md:w-[100%] mx-auto ">
        <img
          src={Img.src}
          alt="Glimmer for Business"
          className="h-auto w-full it object-cover"
        />
      </div>
    </div>
  );
};

export default GlimmerForBusiness;
