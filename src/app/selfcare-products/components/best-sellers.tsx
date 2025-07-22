"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";
import ProductCard from "@/common/ProductCard";
import { useRouter } from "next/navigation";

interface AllProductsProps {
  onLoaded?: () => void;
}

const BestSellers = ({ onLoaded }: AllProductsProps) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchBestSellerProducts = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/admin/product-highlights?filter=best_seller`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
      onLoaded?.();
    }
  };

  useEffect(() => {
    fetchBestSellerProducts();
  }, []);

  const handleClick = () => {
    router.push("/product_highlights?filter=best_seller");
  };

  if (loading) return null;

  return (
    <div className="px-2 w-[99vw] flex flex-col items-center">
      {/* Clickable heading */}
      <h2
        className="text-2xl lg:text-4xl mb-4 cursor-pointer select-none hover:underline"
        onClick={handleClick}
      >
        BEST SELLER
      </h2>


      {!loading && (
        <ProductCard
          title="" // 👈 Avoid duplicate heading
          productProp={products}
          filter="best_seller"
        />
      )}
    </div>
  );
};

export default BestSellers;
