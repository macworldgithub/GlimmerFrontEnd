"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RealCardItem } from "@/data";
import { useSearchParams } from "next/navigation";
import { getRecommendedProductsOfSalon } from "@/api/salon";
import Card from "@/common/Card";

interface RecommendedProductsProps {
  salonId?: string;
}

const RecommendedProducts = ({ salonId }: RecommendedProductsProps) => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<RealCardItem[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const cardsToShow = 4;

  useEffect(() => {
    if (!salonId) return;
    const fetchProductsOfSalon = async () => {
      const response = await getRecommendedProductsOfSalon(salonId);
      console.log("Full API Response:", response);
      // setProducts(response?.data || response);
      const productList = response?.[0]?.productList || [];
      setProducts(productList);
    };

    fetchProductsOfSalon();
  }, [salonId]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => Math.max(prev - cardsToShow, 0));
    }
  };

  const handleNext = () => {
    if (startIndex + cardsToShow < products.length) {
      setStartIndex((prev) =>
        Math.min(prev + cardsToShow, products.length - cardsToShow)
      );
    }
  };

  return (
    <div className="w-[99vw] px-4 md:px-10 py-8">
      {/* Title */}
      <Link href="/selfcare-products" className="block">
        <h2 className="text-2xl sm:text-2xl md:text-3xl font-semibold mb-8">
          Recommended Products
        </h2>
      </Link>

      {/* Swiper Controls (only show on desktop) */}
      {/* {!isSmallScreen && (
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + cardsToShow >= products.length}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
          >
            →
          </button>
        </div>
      )} */}

      {/* Product Display */}
      {isSmallScreen ? (
        // Horizontal scroll for mobile
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-0 mb-0 mt-0 scroll-smooth scrollbar-hide px-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="shrink-0 w-[48%] snap-start">
                <Card item={product} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">
              No products available
            </p>
          )}
        </div>
      ) : (
        // Grid for desktop
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {products.length > 0 ? (
            products
              .slice(startIndex, startIndex + cardsToShow)
              .map((product) => <Card key={product._id} item={product} />)
          ) : (
            <p className="text-center text-gray-500 w-full col-span-4">
              No products available
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendedProducts;
