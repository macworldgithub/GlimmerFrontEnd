import React from "react";
import { reviewsData } from "@/data";
import CardList from "@/common/card-list";

const FakeReviewList = () => {
	return (
		<>
			<div className="mx-auto my-2 h-[2px] w-[80%] bg-neutral"></div>
			<h2 className="my-4 text-center font-bold text-3xl">
				Our Trusted Clients
			</h2>
			<CardList
				dataType="review"
				cards={reviewsData}
				className="xl:justify-center"
			/>
		</>
	);
};

export default FakeReviewList;
