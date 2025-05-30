import SalonCards from "@/common/salon-cards";
import React from "react";

const SalonsNearby = () => {
  return (
    <div className="ml-6 lg:ml-10 xl:ml-24"> {/* Add left margin here */}
      <SalonCards
        title="Other Salons"
        showButton={true}
        className="!w-[99vw] !max-w-none"
      />
    </div>
  );
};

export default SalonsNearby;
