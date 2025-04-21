"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { RealCardItem } from "@/data";
import { Rating } from "react-simple-star-rating";
import { FaHeart } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";

const ProductCard: React.FC<{ item: RealCardItem }> = ({ item }) => {
  const router = useRouter();
  let queryParams = new URLSearchParams();

  if (item.rate_of_salon) queryParams.append("rate", item.rate_of_salon.toString());
  if (item.ref_of_salon) queryParams.append("ref", item.ref_of_salon);

  const path = `/${item.category}/${item.sub_category}/${item.item}/${item._id}`;
  const finalPath = queryParams.toString() ? `${path}?${queryParams.toString()}` : path;

  return (
    <div className="w-full max-w-[320px] h-[370px] bg-white rounded-2xl bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg transition duration-300 cursor-pointer flex flex-col overflow-visible relative"
      onClick={() => router.push(finalPath)}>
      {/* Top 50% Image */}
      <div className="relative w-full h-1/2">
        <img
          src={item.image1 || "/assets/images/default_image.jpg"}
          alt={item.name}
          className="w-full h-full object-cover rounded-t-2xl"
        />

        {/* Discount badge */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 w-full 
               justify-center px-2 max-md:justify-between">
          <button
            onClick={() => router.push(finalPath)}
            className=" w-full py-2 max-xl:py-1 xl:gap-2 max-xl:gap-[2px] max-xl:px-1  gap-1 bg-[#583FA8]  flex justify-center items-center 
                 max-md:py-1  rounded-md max-lg:px-2 max-lg:gap-1 max-md:w-fit">
            <RiShoppingBag4Line size={20} className="text-white max-lg:h-5 max-lg:w-5 max-md:w-7 max-md:h-7" />
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
          <div className="absolute -top-3 -right-3 w-10 h-10 z-10">
            <img
              src="/assets/addtoBag/discount.png"
              alt="Discount"
              className="w-full h-full"
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center text-white text-xs leading-tight font-bold">
              <span>{`${Math.round(((item.base_price - item.discounted_price) / item.base_price) * 100)}%`}</span>
              <span className="text-[8px] font-normal">OFF</span>
            </span>
          </div>
        )}
      </div>

      {/* Bottom 50% Content */}
      <div className="p-4 h-1/2 flex flex-col justify-between">
        <div>
          <h2 className="text-sm text-gray-600 font-medium truncate">{item.name}</h2>
          <p className="text-xs text-gray-700 mt-2 truncate">{item.description}</p>
        </div>

        <div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-bold text-gray-800">
              {item.discounted_price > 0 ? item.discounted_price : item.base_price} PKR
            </span>
            {item.discounted_price > 0 && item.base_price > item.discounted_price && (
              <span className="text-gray-400 text-xs line-through">
                {item.base_price.toFixed(2)} PKR
              </span>
            )}
          </div>
          <div className="flex mt-2">
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
    </div>

  );
};

export default ProductCard;
