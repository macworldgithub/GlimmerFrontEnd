import SalonCards from "@/common/salon-cards";
import React from "react";

const SalonsNearby = () => {
  return (
    <div className="px-4 lg:px-10 xl:px-24">
      <SalonCards
        title="Other Salons"
        showButton={true}
        className="w-full max-w-[1200px] mx-auto"
      />
    </div>
  );
};

export default SalonsNearby;
