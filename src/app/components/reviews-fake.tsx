"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import { ReviewType } from "@/types";
import { cn } from "@/lib/utils";

const FakeReview = ({
	review,
	className,
}: { review: ReviewType; className?: string }) => {
	return (
		<div
			className={cn(
				"prose flex flex-col justify-between rounded-lg p-4",
				className,
			)}
		>
			<div>
				<div className="mb-2 flex">
					{[...Array(review.stars)].map((_, index) => (
						<FaStar key={index} className="mr-3 size-5 text-primary" />
					))}
				</div>
				<h2 className="m-0 mb-2">{review.title}</h2>
				<p className="m-0 mb-4">{review.description}</p>
			</div>
			<div className="flex gap-4">
				<img
					src={review.image}
					alt="Reviewer"
					className="m-0 h-[50px] w-[50px] rounded-full"
				/>

				<div>
					<p className="m-0 font-bold">{review.name}</p>
					<p className="m-0 text-sm">{review.city}</p>
				</div>
			</div>
		</div>
	);
};
export default FakeReview;
