import SalonCards from "@/common/salon-cards";
import React from "react";


const RecommendedSaloons = () => {
	return (
		<div className="px-2 w-[99vw]">
			<SalonCards title="Recommended" showButton={true}/>
		</div>
	);
};

export default RecommendedSaloons;
