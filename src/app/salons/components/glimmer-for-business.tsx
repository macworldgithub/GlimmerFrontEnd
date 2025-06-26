import React from "react";
import Img from "@/assets/images/admin-pannel-img.png";

const GlimmerForBusiness = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-2 sm:px-6 md:px-10 lg:px-[8rem] pb-16 md:pb-20 lg:pb-[8rem] md:flex-row md:space-y-0 w-[99vw]">
      {/* Image Container */}
      <div className="flex items-center justify-center md:w-[100%] mx-auto ">
        <img
          src={Img.src}
          alt="Glimmer for Business"
          className="h-auto w-full object-cover"
        />
      </div>
    </div>
  );
};

export default GlimmerForBusiness;
