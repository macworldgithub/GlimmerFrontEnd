"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";
import ProductCard from "@/common/ProductCard";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(true); // 👈 Show by default

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
    }
  };

  useEffect(() => {
    fetchBestSellerProducts();
  }, []);

  const handleClick = () => {
    setShowProducts((prev) => !prev); // 👈 Toggle visibility
  };

  return (
    <div className="px-2 w-[99vw] flex flex-col items-center">
      {/* Clickable heading */}
      <h2
        className="text-4xl mb-4 cursor-pointer select-none"
        onClick={handleClick}
      >
        BEST SELLER
      </h2>

      {loading && <div>Loading...</div>}

      {showProducts && !loading && (
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
