import SalonCards from "@/common/salon-cards";
import React from "react";


const SalonsNearby = () => {
	return (
		<div>
            <SalonCards title="Other Salons" showButton={true} className="!w-[99vw] !max-w-none lg:!mx-10 xl:!mx-10 " />
		</div>
	);
};

export default SalonsNearby;
