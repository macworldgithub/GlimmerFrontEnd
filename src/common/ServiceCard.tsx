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
  salonId?: string;
  salonName?: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ item, salonId, salonName, onAddToCart }) => {
  const router = useRouter();

  const discountedPrice = item.hasDiscount
    ? item.adminSetPrice - (item.adminSetPrice * item.discountPercentage) / 100
    : item.adminSetPrice;

  const handleClick = () => {
    router.push(`/salons/services/details?serviceId=${item._id}&salonId=${item.salonId}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
  };

  return (
    <div
      className="w-[280px] h-[320px] sm:w-[300px] sm:h-[350px] md:max-w-[320px] md:h-[370px] bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transition duration-300 cursor-pointer snap-start shrink-0 relative overflow-visible"
      onClick={handleClick}
    >
      {/* Top half - Image */}
      <div className="relative w-full h-1/2">
        <img
          src={item.image1 || "/assets/images/default_image.jpg"}
          alt={item.name || "Service Image"}
          className="w-full h-full object-cover rounded-t-2xl"
        />

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 w-full justify-center px-2 max-md:justify-between">
          <button
            className="w-full py-2 max-xl:py-1 xl:gap-2 max-xl:gap-[2px] max-xl:px-1 gap-1 bg-[#583FA8] flex justify-center items-center max-md:py-1 rounded-md max-lg:px-2 max-lg:gap-1 max-md:w-fit"
            onClick={handleAddToCart}
          >
            <RiShoppingBag4Line size={20} className="text-white" />
            <p className="text-white text-[12px] mt-1 max-xl:text-[8px] max-md:hidden">ADD TO BAG</p>
          </button>

          <div className="md:h-8 mt-1 px-2 border-[#583FA8] border bg-white flex justify-center items-center rounded-md">
            <FaHeart className="text-purple-300 hover:text-purple-800 text-base" />
          </div>
        </div>

        {item.hasDiscount && item.discountPercentage > 0 && (
          <div className="absolute -top-0 -right-3 w-10 h-10 z-10">
            <img src="/assets/addtoBag/discount.png" alt="Discount" className="w-full h-full" />
            <span className="absolute inset-0 flex flex-col items-center justify-center text-white text-xs leading-tight font-bold">
              <span>{`${item.discountPercentage}%`}</span>
              <span className="text-[8px] font-normal">OFF</span>
            </span>
          </div>
        )}
      </div>

      {/* Bottom half - Content */}
      <div className="p-4 h-1/2 flex flex-col justify-between">
        <div>
          {item.salonId === salonId && salonName && (
            <h3 className="text-lg font-semibold truncate mb-2">
              {salonName}
            </h3>
          )}

          <h4 className="text-base font-medium text-gray-800 truncate mb-1">
            {item.name ? item.name.slice(0, 40) : "Service Name"}
          </h4>

          {item.duration && (
            <p className="text-sm text-gray-500 italic mt-2">
              Duration: {item.duration} min
            </p>
          )}
        </div>

        <div className="mt-2">
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-gray-900">
              {discountedPrice.toFixed(2)} PKR
            </span>
            {item.hasDiscount && (
              <span className="text-gray-400 text-sm line-through">
                {item.adminSetPrice.toFixed(2)} PKR
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 truncate mt-1">
          {item.description || "No description available"}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
