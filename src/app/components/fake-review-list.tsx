import React from "react";
import { reviewsData } from "@/data";
import CardList from "@/common/card-list";
import Link from "next/link";

const FakeReviewList = () => {
	return (
		<>
		<div className="lg:px-[8rem] w-[99vw]">
			<Link href="/selfcare-products" className="prose lg:prose-xl">
				<h2 className="mb-2 md:mb-3">Our Trusted Clients</h2>
			</Link>
			<CardList cards={reviewsData} dataType="review" />
		</div>
		</>
	);
};

export default FakeReviewList;
