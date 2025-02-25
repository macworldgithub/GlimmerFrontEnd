"use client";
import React from "react";
import "tailwindcss/tailwind.css";
import "swiper/css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RealCardItem } from "@/data";
import { Rating } from "react-simple-star-rating";

import { FaHeart } from "react-icons/fa";

const Card: React.FC<{ item: RealCardItem }> = ({ item }) => {
  const router = useRouter();

  const path = `/${item.category}/${item.sub_category}/${item.item}`;

  return (
    <div
      className="w-[280px] h-[350px] shadow-lg max-md:w-full cursor-pointer rounded-lg"
      onClick={() => {
        router.push(`${path}/${item._id}`);
      }}
    >
      <div className="relative w-full h-[200px]">
        <img
          src={item.image1 ? item.image1 : "/assets/images/default_image.jpg"}
          alt="Image 1"
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 w-full 
                  max-md:w-[50%] max-sm:w-[60%] justify-center px-2">
          <button
            onClick={() => {
              router.push(`${path}/${item._id}`);
            }}
            className=" w-full py-2 gap-2 bg-[#583FA8]  flex justify-center items-center 
                 max-md:py-1 max-sm:w-full rounded-md">
            <Image
              src={"/assets/addtoBag/icon.png"}
              width={12}
              height={12}
              alt="bag"
            />
            <p className="text-white text-[12px] mt-1 max-xl:text-[10px] max-sm:text-[9px]">
              ADD TO BAG
            </p>
          </button>

          <div className="px-2 h-[38px] border-[#583FA8] border border-solid bg-white flex justify-center items-center 
                    max-md:h-[32px] max-sm:h-[30px] rounded-md">
            <FaHeart className="text-purple-300 hover:text-purple-800 text-base max-md:text-sm max-sm:text-xs" />
          </div>
        </div>
        {item?.base_price > item?.discounted_price && item?.discounted_price > 0 && (
          <div className="absolute top-2 right-2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            <img
              src="/assets/addtoBag/discount.png"
              alt="Discount"
              className="w-full h-full"
            />
            <span className="absolute text-center text-white text-sm  font-bold">
              {`${Math.round(((item?.base_price - item?.discounted_price) / item?.base_price) * 100)}% OFF`}
            </span>
          </div>
        )}
      </div>

      <div className="p-1 px-3 mt-2">
        <div className="flex justify-between mb-2">
          <div className="flex flex-col">
            <h2 className={`font-light font-sans text-[18px] overflow-hidden line-clamp-1 text-[#636363] ${!item.name && 'h-[24px]'}`}>
              {item.name || " "}
            </h2>

            <h2 className={`text-[14px] font-sans font-medium text-[#303030] mt-3 mb-3 overflow-hidden line-clamp-1 ${!item.description && 'h-[24px]'}`}>
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

            <span className="text-[18px] font-sans font-medium">
              {item?.discounted_price > 0 ? item?.discounted_price : item?.base_price} PKR
            </span>

            {item?.discounted_price > 0 && item?.base_price > item?.discounted_price && (
              <span className="text-gray-500 line-through ml-2 mr-2 text-xs">
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
            size={15}
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
