"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProductFilter = () => {
  const router = useRouter();
  const picture = [
    {
      id: 1,
      name: "Hydrating Face Cream",
      image1: "/assets/saloonPicture/salon.png",
      discounted_price: 29.99,
    },
    {
      id: 2,
      name: "Glow Boost Serum",
      image1: "/assets/saloonPicture/spa.png",
      discounted_price: 39.99,
    },
    {
      id: 3,
      name: "Daily Moisturizer",
      image1: "/assets/saloonPicture/clinic.png",
      discounted_price: 24.99,
    },
    {
      id: 4,
      name: "Daily Moisturizer",
      image1: "/assets/saloonPicture/gym.png",
      discounted_price: 24.99,
    },
  ];

  const handleFilterClick = (id: any) => {
    const params = new URLSearchParams(window.location.search);

    if (id === 1) {
      const pastWeek = new Date();
      pastWeek.setDate(pastWeek.getDate() - 7);
      params.set("filter", "new");
      params.set("created_at", pastWeek.toISOString());
    }
    const currentPage = params.get("page") || "1";
    params.set("page", currentPage);
    router.push(`/products?${params.toString()}`);
  };

  useEffect(() => {
    const savedFilters = localStorage.getItem("productFilters");
    if (savedFilters) {
      router.push(`/products?${savedFilters}`);
    }
  }, []);

  return (
    <div className="flex flex-col w-[99vw] px-5 md:p-[0rem]  h-max rounded cursor-pointer">
      <div className="flex flex-wrap gap-5 gap-y-4 justify-center max-md:flex-col pb-[6rem] gap-2">
        {picture.map((item) => (
          <div
            key={item.id}
            className="w-[44%] max-md:w-[100%] h-auto flex justify-center"
            onClick={() => handleFilterClick(item.id)}
          >
            <img
              src={item.image1}
              className="w-[75%] h-auto object-cover rounded-[10px] transition-transform duration-300 hover:scale-110"
              alt={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
