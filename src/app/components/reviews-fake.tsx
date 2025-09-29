"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import { ReviewType } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

const FakeReview = ({
  review,
  className,
}: {
  review: ReviewType;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "prose flex flex-col justify-between rounded-lg p-4",
        className
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
        <Image
          src={review.image || "/assets/images/default_avatar.jpg"}
          alt={review.name ? `${review.name} profile picture` : "Reviewer"}
          width={50}
          height={50}
          sizes="50px"
          className="m-0 h-[50px] w-[50px] rounded-full object-cover"
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
