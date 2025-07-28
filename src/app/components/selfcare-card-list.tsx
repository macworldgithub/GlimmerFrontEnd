"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RealCardItem } from "@/data";
import { getAllProducts } from "@/api/product";
import Card from "@/common/Card";
import { useRouter } from "next/navigation";
import { Puff } from "react-loader-spinner";

const SelfcareCardList = () => {
  const router = useRouter();
  const [products, setProducts] = useState<RealCardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showAll, setShowAll] = useState(false); // New state to control view more on mobile

  console.log(startIndex);
  console.log(cardsToShow);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          1,
          undefined,
          undefined,
          20
        );

        if (response && Array.isArray(response.products)) {
          setProducts(response.products); // full list
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

  const getRandomProducts = (
    products: RealCardItem[],
    count: number
  ): RealCardItem[] => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleViewMore = () => {
    if (isSmallScreen) {
      setShowAll(true); // Show all cards in horizontal scroll
      router.push("/products");
    } else {
      router.push("/products");
    }
  };

  return (
    <div className="w-full max-w-[82rem] px-4 md:px-1 mx-auto py-6 md:py-10">
      {/* Title */}
      <Link href="/selfcare-products" className="block">
        <h2 className="text-2xl sm:text-2xl md:text-3xl font-semibold mb-8">
          Self-Care Items
        </h2>
      </Link>

      {/* Loading & Error */}
      {loading && (
        <div className="flex justify-center items-center">
          <Puff height="50" width="50" color="purple" ariaLabel="Loading" />
        </div>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Product Grid / Carousel */}
      {isSmallScreen ? (
        <div className="px-2">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory mb-4 scroll-smooth scrollbar-visible ios-scroll-fix">
            {(showAll ? products : products.slice(0, 20)).map((product) => (
              <div
                key={product._id}
                className={`shrink-0 snap-start ${
                  isSmallScreen
                    ? "w-1/2"
                    : "w-[260px] md:w-[280px] lg:w-[300px]"
                }`}
              >
                <Card item={product} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="overflow-x-scroll scroll-smooth scrollbar-visible">
          <div className="flex gap-4 min-w-max snap-x snap-mandatory mb-4">
            {products.length > 0 ? (
              products.slice(0, 20).map((product) => (
                <div
                  key={product._id}
                  className="shrink-0 snap-start w-[280px]"
                >
                  <Card item={product} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No products available</p>
            )}
          </div>
        </div>
      )}
      {/* View More Button */}
      <div className="text-center mt-8">
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
