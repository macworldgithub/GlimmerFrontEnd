import React from "react";
import { reviewsData } from "@/data";
import CardList from "@/common/card-list";

const FakeReviewList = () => {
	return (
		<>
			<div className="ml-auto my-2 h-[2px] w-[80%] bg-neutral"></div>
			<h2 className="w-[99vw] my-4 text-center font-bold text-3xl">
				Our Trusted Clients
			</h2>
			<div className="mb-[15rem] custom-swiper">
				<CardList
					dataType="review"
					cards={reviewsData}
					className="xl:justify-center w-[99vw] mx-auto"
				/>
			</div>
		</>
	);
};

export default FakeReviewList;
