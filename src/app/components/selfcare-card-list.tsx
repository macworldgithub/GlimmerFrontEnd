"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RealCardItem } from "@/data";
import { getAllProducts } from "@/api/product";
import Card from "@/common/Card";
import { useRouter } from "next/navigation";

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

  const handleViewMore = () => router.push("/products");

  return (
    <div className="w-full max-w-[82rem] px-4 md:px-1 mx-auto py-10">
      {/* Title */}
      <Link href="/selfcare-products" className="block">
        <h2 className="text-2xl sm:text-2xl md:text-3xl font-semibold mb-8">
          Self-Care Items
        </h2>
      </Link>

      {/* Loading & Error */}
      {loading && <p className="text-center text-gray-500">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Product Grid / Carousel */}
      {isSmallScreen ? (
        // Horizontal scroll for mobile
        <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-4 px-4 scroll-smooth scrollbar-hide">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="shrink-0 w-[270px] snap-start">
                <Card item={product} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">No products available</p>
          )}
        </div>
      ) : (
        // Grid for desktop
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 ? (
            products.slice(startIndex, startIndex + cardsToShow).map((product) => (
              <Card key={product._id} item={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">No products available</p>
          )}
        </div>
      )}

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
