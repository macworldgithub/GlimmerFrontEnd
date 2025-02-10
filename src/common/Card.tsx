"use client";
import React from "react";
import "tailwindcss/tailwind.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CardItem, RealCardItem } from "@/data";
import { Rating } from "react-simple-star-rating";

import { FaHeart } from "react-icons/fa";

const Card: React.FC<{ item: RealCardItem }> = ({ item }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const subCategory = searchParams.get("sub_category") ?? "";
  const i = searchParams.get("item") ?? "";

  const path = `/${category}/${subCategory}/${i}`;

  return (
    <div className="w-[280px] shadow-lg max-md:w-full cursor-pointer" onClick={() => {
      router.push(`${path}/${item._id}`);
    }}>
      <img
        src={item.image1}
        alt="Image 1"
        className="w-full h-40 object-cover  rounded-[6px]"
      />
      <div className="p-1 px-3 mt-2">
        <div className="flex justify-between mb-2">
          <div className="flex flex-col">
            <h2 className=" font-light font-sans text-[10px] text-[#636363]">
              Skin Care
            </h2>
            <h2 className="text-[14px] font-sans  font-medium text-[#303030] mb-1">
              {item.name}
            </h2>
          </div>
        </div>
        {/* <p className="text-gray-700 mb-4">{item.description}</p> */}

        <div className="flex justify-between items-center">
          <p className="text-gray-800 text-xl font-bold">
            {/* Base price (optional) */}
            {/* <span className="line-through text-[12px] font-light text-gray-500">
      ${item.base_price}
    </span> */}

            <span className="text-[18px] font-sans font-medium">
              PKR.
              {item.discounted_price === 0
                ? item.base_price
                : item.discounted_price}
            </span>
          </p>

          {/* Discount percentage (optional) */}
          {/* <p className="text-green-500 font-semibold">
    {discountPercentage}% off
  </p> */}
        </div>
        <div className="flex w-max">
          <Rating
            size={15}
            initialValue={3}
            SVGstyle={{ display: "inline-flex" }}
            allowHover={false}
            fillColor="#583FA8"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              router.push(`${path}/${item._id}`);
            }}
            className="w-[50%] py-2 gap-1 bg-[#583FA8]  rounded-sm flex justify-center items-center"
          >
            <Image
              src={"/assets/addtoBag/icon.png"}
              width={10}
              height={10}
              alt="bag"
            />
            <p className="text-white text-[8px] mt-1">Add to Bag</p>
          </button>
          <div className="px-2 h-[25px]  border-[#583FA8] border-solid border flex justify-center items-center py-4 ">
            {/* <Image
              src={"/assets/addtoBag/heart.svg"}
              width={15}
              height={15}
              alt="bag"
              color="red"
            /> */}
            <FaHeart className=" hover:text-red-500 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
