"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";
import ProductCards from "@/common/ProductCard";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(true); // ✅ default = true

  const fetchTrendingProducts = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/admin/product-highlights?filter=trending_product`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const handleClick = () => {
    setShowProducts((prev) => !prev); // ✅ toggle visibility
  };

  return (
    <div className="px-2 w-[99vw] flex flex-col justify-center items-center">
      {/* Styled heading (same as before), now clickable */}
      <h2
        className="text-4xl mb-4 cursor-pointer select-none"
        onClick={handleClick}
      >
        TRENDING
      </h2>

      {loading && <div>Loading...</div>}

      {showProducts && !loading && (
        <ProductCards
          title="" // don't repeat heading
          productProp={products}
          filter="trending_product"
        />
      )}
    </div>
  );
};

export default TrendingProducts;
