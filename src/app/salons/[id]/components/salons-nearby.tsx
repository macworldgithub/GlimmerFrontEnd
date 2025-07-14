"use client";

import SalonCards from "@/common/salon-cards";
import React from "react";

const SalonsNearby = () => {
  return (
    <div className="px-4 lg:px-10 xl:px-24 mt-0 pt-0 !mt-[-35px] !pt-0">
      <SalonCards
        title="Other Salons"
        showButton={true}
        className="w-full max-w-[1200px] mx-auto !mt-0 !pt-0"
      />
    </div>
  );
};

export default SalonsNearby;
