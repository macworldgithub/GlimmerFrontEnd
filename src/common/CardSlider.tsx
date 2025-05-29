"use client";
import React, { useState } from "react";
import Card from "@/common/Card";
import { useRouter } from "next/navigation";  // Import useRouter from Next.js

const CardSlider = ({ ProductList }: { ProductList: any }) => {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();  // Initialize the router

  // Display only the first 5 products if showAll is false
  const displayedProducts = showAll ? ProductList : ProductList.slice(0, 5);

  const handleViewMore = () => {
    // Navigate to the '/products' page when the button is clicked
    router.push("/products");
  };

  return (
    <div className="w-full px-5 h-max relative p-10">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8 max-w-7xl mx-auto">
        {displayedProducts.map((item: any, index: number) => (
          <div key={index} className="flex justify-center">
            <Card item={item} />
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-4 text-center">
        <button
          onClick={handleViewMore}  // Call the handleViewMore function to navigate
          className="px-6 py-2 bg-[#583FA8] text-white rounded-md"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default CardSlider;

