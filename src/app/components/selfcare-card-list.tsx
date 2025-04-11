"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RealCardItem } from "@/data";
import { getAllProducts } from "@/api/product";
import Card from "@/common/Card";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SelfcareCardList = () => {
  const router = useRouter();
  const [products, setProducts] = useState<RealCardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts();

        if (response && Array.isArray(response.products)) {
          const randomProducts = getRandomProducts(response.products, 4);
          setProducts(randomProducts);
        } else {
          setError("Failed to load products, unexpected response format.");
        }
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Resize Logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setCardsToShow(1);
        setIsSmallScreen(true);
      } else if (width <= 768) {
        setCardsToShow(2);
        setIsSmallScreen(false);
      } else if (width <= 1024) {
        setCardsToShow(3);
        setIsSmallScreen(false);
      } else {
        setCardsToShow(4);
        setIsSmallScreen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + cardsToShow < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const getRandomProducts = (
    products: RealCardItem[],
    count: number
  ): RealCardItem[] => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleViewMore = () => router.push("/products");

  return (
    <div className="w-full max-w-[82rem] px-4 md:px-10 mx-auto py-10">
      {/* Title */}
      <Link href="/selfcare-products" className="block">
        <h2 className="text-3xl font-semibold mb-8">
          Self-Care Items
        </h2>
      </Link>

      {/* Loading & Error */}
      {loading && <p className="text-center text-gray-500">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Arrows for small screens */}
      {isSmallScreen && (
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + cardsToShow >= products.length}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
          >
            <FaArrowRight />
          </button>
        </div>
      )}

      {/* Product Grid / Carousel */}
      <div
        className={`${isSmallScreen
            ? "flex overflow-x-auto gap-4 pb-4"
            : "grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
      >
        {products.length > 0 ? (
          products
            .slice(startIndex, startIndex + cardsToShow)
            .map((product) => (
              <Card key={product._id} item={product}/>
            ))
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </div>

      {/* View More Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleViewMore}
          className="bg-[#583FA8] text-white py-2 px-6 rounded-lg hover:bg-[#472c9f]"
        >
          View More
        </button>
      </div>
    </div>

  );
};

export default SelfcareCardList;
