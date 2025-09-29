"use client";

import React, { FC } from "react";
import "tailwindcss/tailwind.css";
import { FaHeart } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { Rating } from "react-simple-star-rating";
import { useRouter } from "next/navigation";
import { extractCityFromAddress, formatSlug, sanitizeSlug } from "@/lib/utils";
import Image from "next/image";

interface ServiceCardProps {
  item: any;
  onAddToCart: (item: any) => void;
  salonId?: string;
  salonName?: string;
  salonAddress?: string;
}

const ServiceCard: FC<ServiceCardProps> = ({
  item,
  salonId,
  salonName,
  salonAddress,
  onAddToCart,
}) => {
  const router = useRouter();

  const discountedPrice = item.hasDiscount
    ? item.adminSetPrice - (item.adminSetPrice * item.discountPercentage) / 100
    : item.adminSetPrice;

  const handleClick = () => {
    const rawCity = salonAddress
      ? extractCityFromAddress(salonAddress)
      : "unknown";
    const citySlug = formatSlug(sanitizeSlug(rawCity));
    const salonSlug = formatSlug(sanitizeSlug(salonName ?? "unknown"));
    const serviceSlug = formatSlug(sanitizeSlug(item?.name ?? "service"));
    router.push(
      `/salons/${citySlug}/${salonSlug}/${serviceSlug}?serviceId=${item._id}&salonId=${item.salonId}`
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
  };

  return (
    <div
      className="w-full max-w-[300px] h-[350px] md:w-full md:max-w-[300px] md:h-[370px] bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transition duration-300 cursor-pointer snap-start relative"
      onClick={handleClick}
    >
      {/* Top half - Image */}
      <div className="relative w-full h-1/2">
        <Image
          src={
            item.image1?.startsWith("http")
              ? item.image1
              : "/assets/images/default_image.jpg"
          }
          alt={item?.name ?? "Service Image"}
          width={300}
          height={200}
          sizes="(max-width: 768px) 50vw, 300px"
          className="w-full h-full object-cover rounded-t-2xl"
          loading="lazy"
        />

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 w-full justify-center px-2 max-md:justify-between">
          <button
            className="w-full py-2 max-xl:py-1 xl:gap-2 max-xl:gap-[2px] max-xl:px-1 gap-1 bg-[#583FA8] flex justify-center items-center max-md:py-1 rounded-md max-lg:px-2 max-lg:gap-1 max-md:w-fit"
            onClick={handleAddToCart}
          >
            <RiShoppingBag4Line size={20} className="text-white" />
            <p className="text-white text-[12px] mt-1 max-xl:text-[8px] max-md:hidden">
              ADD TO BAG{" "}
            </p>
          </button>

          <div className="md:h-8 mt-1 px-2 border-[#583FA8] border bg-white flex justify-center items-center rounded-md">
            <FaHeart className="text-purple-300 hover:text-purple-800 text-base" />
          </div>
        </div>

        {item.hasDiscount && item.discountPercentage > 0 && (
          <div className="absolute -top-0 -right-3 w-10 h-10 z-10">
            <Image
              src="/assets/addtoBag/discount.png"
              alt="Discount"
              width={50}
              height={50}
              className="w-full h-full"
              loading="lazy"
            />

            <span className="absolute inset-0 flex flex-col items-center justify-center text-white text-xs leading-tight font-bold">
              <span>{`${item.discountPercentage}%`}</span>
              <span className="text-[8px] font-normal">OFF</span>
            </span>
          </div>
        )}
      </div>

      {/* Bottom half - Content */}
      <div className="p-4 h-1/2 flex flex-col justify-between overflow-hidden">
        <div className="flex-grow overflow-y-auto no-scrollbar">
          <h4 className="text-sm font-bold text-gray-800 mb-1">
            {item?.name ?? "No Name"}
          </h4>

          {salonName && (
            <h3 className="text-sm text-gray-700 mb-1">{salonName}</h3>
          )}

          {item?.duration ? (
            <p className="text-xs text-gray-500 italic mt-1">
              Duration: {item.duration} min
            </p>
          ) : (
            <p className="text-xs text-gray-400 italic mt-1">No duration</p>
          )}

          <p className="text-xs text-gray-600 mt-2">
            {item?.description ?? "No description available"}
          </p>
        </div>

        <div className="mt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900">
              {discountedPrice.toFixed(2)} PKR
            </span>
            {item.hasDiscount && item.discountPercentage > 0 && (
              <span className="text-gray-400 text-xs line-through">
                {item.adminSetPrice.toFixed(2)} PKR
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
