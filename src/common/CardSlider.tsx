"use client";
import React from "react";
import Card from "@/common/Card";

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CardSlider = ({ ProductList }: { ProductList: any }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
        //@ts-ignore
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
        //@ts-ignore
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-[99vw] px-5 h-max relative p-10 max-md:text-center">
      <div className="relative">
        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md z-10"
          onClick={scrollLeft}
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="w-full overflow-x-auto flex-nowrap flex gap-4 scroll-smooth no-scrollbar"
        >
          {ProductList.map((item:any, index :any) => (
            <div key={index} className="flex-shrink-0 w-[300px] ">
              <Card item={item} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md z-10"
          onClick={scrollRight}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CardSlider;
