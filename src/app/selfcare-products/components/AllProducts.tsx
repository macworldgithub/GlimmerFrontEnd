"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";
import ProductCards from "@/common/ProductCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false); // View More / Less toggle

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/product/get_all_products?page_no=1`
      );
      setProducts(response.data?.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Show either first 4 or all products
  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <div className="px-2 w-[99vw] flex flex-col justify-center items-center overflow-hidden">
      <h2 className="text-4xl mb-4 cursor-pointer select-none">ALL PRODUCTS</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full flex flex-col items-center">
          {/* Product Slider */}
          <ProductCards
            title=""
            productProp={displayedProducts}
            filter="all_products"
          />

          {/* View More Button - Just below scrollbar */}
          {products.length > 4 && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="mt-[-10px] px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-all"
            >
              {showAll ? "View Less" : "View More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
