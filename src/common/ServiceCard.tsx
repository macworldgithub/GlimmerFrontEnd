"use client"

import React from "react";
import "tailwindcss/tailwind.css";
import "swiper/css";
import { FaHeart } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { Rating } from "react-simple-star-rating";
import { useRouter } from "next/navigation";

const ServiceCard: React.FC<{ item: any }> = ({ item }) => {
  console.log(item);
  const router = useRouter();

  // Calculate discounted price if discount exists
  const discountedPrice = item.hasDiscount
    ? item.adminSetPrice - (item.adminSetPrice * item.discountPercentage) / 100
    : item.adminSetPrice;

  const handleClick = () => {
    router.push(`/salons/services/details?serviceId=${item._id}&salonId=${item.salonId}`);
  };
  return (
    <div className="w-[280px] xl:w-[380px] h-auto shadow-lg max-md:w-full cursor-pointer rounded-lg mx-auto"
      onClick={handleClick}
    >
      <div className="relative w-full h-[150px]">
        {/* Image handling */}
        <img
          src={item.image1 || "/assets/images/default_image.jpg"}
          alt={item.name || "Service Image"}
          className="w-full h-full max-lg:object-cover rounded-t-lg"
        />

        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 w-full 
               justify-center px-2 max-md:justify-between"
        >
          {/* Add to Bag Button */}
      <button
            className=" w-full py-2 max-xl:py-1 xl:gap-2 max-xl:gap-[2px] max-xl:px-1  gap-1 bg-[#583FA8]  flex justify-center items-center 
                 max-md:py-1  rounded-md max-lg:px-2 max-lg:gap-1 max-md:w-fit"
          >
            <RiShoppingBag4Line
              size={20}
              className="text-white max-lg:h-5 max-lg:w-5 max-md:w-7 max-md:h-7"
            />
            <p className="text-white text-[9px] sm:text-[6px] xl:text-[9px] mt-1 max-md:hidden">
              ADD TO BAG
            </p>
          </button>

          {/* Heart Icon */}
          <div
            className="md:h-8 mt-1 px-2  border-[#583FA8] border border-solid bg-white flex justify-center items-center 
                    max-md:h-[32px] max-sm:h-[30px] rounded-md "
          >
            <FaHeart className="text-purple-300 hover:text-purple-800 text-base max-md:w-6  max-md:h-6 max-sm:text-xs" />
          </div>
        </div>

        {/* Discount Badge */}
        {item.hasDiscount && item.discountPercentage > 0 && (
          <div className="absolute -top-4 -right-3 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            <img
              src="/assets/addtoBag/discount.png"
              alt="Discount"
              className="w-full h-full"
            />
            <span className="absolute text-center text-white  flex flex-col items-center leading-none">
              <span className="font-bold text-[12px]">{`${item.discountPercentage}%`}</span>
              <span className="font-normal text-[8px]">OFF</span>
            </span>
          </div>
        )}
      </div>

      <div className="p-1 px-3 mt-2">
        {/* <div className="flex justify-between mb-2"> */}
        <div className="flex flex-col">
          {/* Service Title */}
          <h2
            className={`font-light text-[14px] overflow-hidden line-clamp-1 text-[#636363] ${!item.name && "h-[24px]"
              }`}
          >
            {item.name ? (item.name.length > 12 ? item.name.slice(0, 12) + "..." : item.name) : "Service Name"}
          </h2>



          {/* Description */}
          <h2
            className={`text-[12px] font-medium text-[#303030] mt-2 mb-3 overflow-hidden line-clamp-1 ${!item.description && "h-[24px]"
              }`}
          >
            {item.description || "No description available"}
          </h2>
        </div>
        {/* </div> */}

        <div className="flex justify-between items-center">
          <p className="text-gray-800 text-xl font-bold">
            {/* Price Handling */}
            <span className="text-[14px] font-medium">
              {item.hasDiscount
                ? discountedPrice.toFixed(2)
                : item.adminSetPrice.toFixed(2)}{" "}
              PKR
            </span>

            {/* Display original price if discounted */}
            {item.hasDiscount && item.discountPercentage > 0 && (
              <span className="text-gray-500 line-through ml-2 mr-2 text-[14px]">
                {item.adminSetPrice.toFixed(2)} PKR
              </span>
            )}
          </p>
        </div>

        {/* Rating Component */}
        <div className="flex w-max">
          <Rating
            size={14}
            initialValue={3} // You can replace this with actual rating data from API
            SVGstyle={{ display: "inline-flex" }}
            allowHover={false}
            fillColor="#583FA8"
          />
        </div>
      </div>
    </div>


  );
};

export default ServiceCard;
