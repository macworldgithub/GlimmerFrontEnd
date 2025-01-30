"use client";
import React from "react";
import Card from "@/common/Card";

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TrendingProducts = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const fakeProducts = [
    {
      id: 1,
      name: "Hydrating Face Cream",
      image1: "/assets/logo.png",
      discounted_price: 29.99,
    },
    {
      id: 2,
      name: "Glow Boost Serum",
      image1: "/assets/logo.png",
      discounted_price: 39.99,
    },
    {
      id: 3,
      name: "Daily Moisturizer",
      image1: "/assets/logo.png",
      discounted_price: 24.99,
    },
    {
      id: 4,
      name: "Daily Moisturizer",
      image1: "/assets/logo.png",
      discounted_price: 24.99,
    },
    {
      id: 5,
      name: "Daily Moisturizer",
      image1: "/assets/logo.png",
      discounted_price: 24.99,
    },
    {
      id: 6,
      name: "Daily Moisturizer",
      image1: "/assets/logo.png",
      discounted_price: 24.99,
    },
    {
      id: 7,
      name: "Daily Moisturizer",
      image1: "/assets/logo.png",
      discounted_price: 24.99,
    },
    {
      id: 8,
      name: "Daily Moisturizer",
      image1: "/assets/logo.png",
      discounted_price: 24.99,
    },
  ];
  return (
    <div className="w-[99vw] px-5 h-max relative">
      <h1 className="font-sans font-semibold text-[28px]">TRENDING PRODUCTS</h1>

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
          {fakeProducts.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-[300px] px-10">
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

export default TrendingProducts;
