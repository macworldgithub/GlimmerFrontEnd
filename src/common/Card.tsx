"use client";
import React from "react";
import "tailwindcss/tailwind.css";
import "swiper/css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RealCardItem } from "@/data";
import { Rating } from "react-simple-star-rating";

import { FaHeart } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";

const Card: React.FC<{ item: RealCardItem }> = ({ item }) => {
  const router = useRouter();

  const path = `/${item.category}/${item.sub_category}/${item.item}`;

  return (
    <div
      className="w-[280px] xl:w-[350px] h-auto shadow-lg max-md:w-full cursor-pointer rounded-lg"
      onClick={() => {
        router.push(`${path}/${item._id}`);
      }}
    >
      <div className="relative w-full h-[150px]">
        <img
          src={item.image1 ? item.image1 : "/assets/images/default_image.jpg"}
          alt="Image 1"
          className="w-full h-full max-lg:object-cover rounded-t-lg"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 w-full 
               justify-center px-2 max-md:justify-between">
          <button
            onClick={() => {
              router.push(`${path}/${item._id}`);
            }}  
            className=" w-full py-2 max-xl:py-1 xl:gap-2 max-xl:gap-[2px] max-xl:px-1  gap-1 bg-[#583FA8]  flex justify-center items-center 
                 max-md:py-1  rounded-md max-lg:px-2 max-lg:gap-1 max-md:w-fit">
                  <RiShoppingBag4Line size={20} className="text-white max-lg:h-5 max-lg:w-5 max-md:w-7 max-md:h-7"/>
            <p className="text-white text-[12px] mt-1 max-xl:text-[8px] max-lg:text-6px max-sm:text-[9px] max-md:hidden">
              ADD TO BAG
            </p>
          </button>

          <div className="md:h-8 mt-1 px-2  border-[#583FA8] border border-solid bg-white flex justify-center items-center 
                    max-md:h-[32px] max-sm:h-[30px] rounded-md ">
            <FaHeart className="text-purple-300 hover:text-purple-800 text-base max-md:w-6  max-md:h-6 max-sm:text-xs" />
          </div>
        </div>
        {item?.base_price > item?.discounted_price && item?.discounted_price > 0 && (
  <div className="absolute -top-4 -right-3 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
    <img
      src="/assets/addtoBag/discount.png"
      alt="Discount"
      className="w-full h-full"
    />
    <span className="absolute text-center text-white  flex flex-col items-center leading-none">
      <span className="font-bold text-[12px]">{`${Math.round(((item?.base_price - item?.discounted_price) / item?.base_price) * 100)}%`}</span>
      <span className="font-normal text-[8px]">OFF</span>
    </span>
  </div>
)}

      </div>

      <div className="p-1 px-3 mt-2">
        <div className="flex justify-between mb-2">
          <div className="flex flex-col">
            <h2 className={`font-light font-sans text-[14px] overflow-hidden line-clamp-1 text-[#636363] ${!item.name && 'h-[24px]'}`}>
              {item.name || " "}
            </h2>

            <h2 className={`text-[12px] font-sans font-medium text-[#303030] mt-3 mb-3 overflow-hidden line-clamp-1 ${!item.description && 'h-[24px]'}`}>
              {item.description || "..."}
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

            <span className="text-[14px] font-sans font-medium">
              {item?.discounted_price > 0 ? item?.discounted_price : item?.base_price} PKR
            </span>

            {item?.discounted_price > 0 && item?.base_price > item?.discounted_price && (
              <span className="text-gray-500 line-through ml-2 mr-2 text-[14px]">
                {item?.base_price} PKR
              </span>
            )}

          </p>

          {/* Discount percentage (optional) */}
          {/* <p className="text-green-500 font-semibold">
    {discountPercentage}% off
  </p> */}
        </div>
        <div className="flex w-max">
          <Rating
            size={14}
            initialValue={3}
            SVGstyle={{ display: "inline-flex" }}
            allowHover={false}
            fillColor="#583FA8"
          />
        </div>

      </div>
    </div>
  );
};

export default Card;
