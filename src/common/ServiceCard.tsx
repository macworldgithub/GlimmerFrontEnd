"use client";

import React, { FC } from "react";
import "tailwindcss/tailwind.css";
import { FaHeart } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { Rating } from "react-simple-star-rating";
import { useRouter } from "next/navigation";

interface ServiceCardProps {
  item: any;
  onAddToCart: (item: any) => void;
}

const ServiceCard: FC<ServiceCardProps> = ({ item, onAddToCart }) => {
  const router = useRouter();

  const discountedPrice = item.hasDiscount
    ? item.adminSetPrice - (item.adminSetPrice * item.discountPercentage) / 100
    : item.adminSetPrice;

  const handleClick = () => {
    router.push(`/salons/services/details?serviceId=${item._id}&salonId=${item.salonId}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item); // Trigger adding the item to cart
  };

  return (
    <div className="w-[280px] shadow-lg cursor-pointer rounded-lg" onClick={handleClick}>
      <div className="relative w-full h-[150px]">
        <img
          src={item.image1 || "/assets/images/default_image.jpg"}
          alt={item.name || "Service Image"}
          className="w-full h-full max-lg:object-cover rounded-t-lg"
        />

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 w-full justify-center px-2 max-md:justify-between">
          <button
            className="w-full py-2 gap-1 bg-[#583FA8] flex justify-center items-center rounded-md"
            onClick={handleAddToCart}
          >
            <RiShoppingBag4Line className="text-white h-5 w-5" />
            <p className="text-white text-[9px] mt-1 max-md:hidden">ADD TO BAG</p>
          </button>

          <div className="md:h-8 mt-1 px-2 border-[#583FA8] border bg-white flex justify-center items-center rounded-md">
            <FaHeart className="text-purple-300 hover:text-purple-800 text-base" />
          </div>
        </div>

        {item.hasDiscount && item.discountPercentage > 0 && (
          <div className="absolute -top-4 -right-3 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            <img src="/assets/addtoBag/discount.png" alt="Discount" className="w-full h-full" />
            <span className="absolute text-center text-white flex flex-col items-center leading-none">
              <span className="font-bold text-[12px]">{`${item.discountPercentage}%`}</span>
              <span className="font-normal text-[8px]">OFF</span>
            </span>
          </div>
        )}
      </div>

      <div className="p-1 px-3 mt-2">
        <div className="flex flex-col">
          <h2 className="font-light text-[14px] overflow-hidden line-clamp-1 text-[#636363]">
            {item.name ? (item.name.length > 12 ? item.name.slice(0, 12) + "..." : item.name) : "Service Name"}
          </h2>

          <h2 className="text-[12px] font-medium text-[#303030] mt-2 mb-3 overflow-hidden line-clamp-1">
            {item.description || "No description available"}
          </h2>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-800 text-xl font-bold">
            <span className="text-[14px] font-medium">
              {discountedPrice.toFixed(2)} PKR
            </span>
            {item.hasDiscount && item.discountPercentage > 0 && (
              <span className="text-gray-500 line-through ml-2 mr-2 text-[14px]">
                {item.adminSetPrice.toFixed(2)} PKR
              </span>
            )}
          </p>
        </div>

        <div className="flex w-max">
          <Rating
            size={14}
            initialValue={item.rating || 3}
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
