import React from "react";
import { reviewsData } from "@/data";
import CardList from "@/common/card-list";
import Link from "next/link";

const FakeReviewList = () => {
	return (
		<>
		<div className="lg:px-[8rem] mb-[15rem] w-[99vw]">
			<Link href="/selfcare-products" className="prose lg:prose-xl">
				<h2 className="mb-2 md:mb-3">Our Trusted Clients</h2>
			</Link>
			<CardList cards={reviewsData} dataType="review" />
		</div>


			{/* <div className="ml-auto my-2 h-[2px] w-[80%] bg-neutral"></div>
			<h2 className="w-[99vw] my-4 text-center font-bold text-3xl">
				Our Trusted Clients
			</h2>
			<div className="mb-[15rem] custom-swiper">
				<CardList
					dataType="review"
					cards={reviewsData}
				/>
			</div> */}
		</>
	);
};

export default FakeReviewList;
