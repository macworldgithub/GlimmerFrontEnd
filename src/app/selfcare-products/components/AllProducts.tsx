"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";
import ProductCards from "@/common/ProductCard"; // aapka existing component

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(true); // ✅ Toggle display
  const [page, setPage] = useState(1); // ✅ for pagination (optional)

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/product/get_all_products?page_no=${page}`
      );
      setProducts(response.data?.products || []); // adjust if API response shape is different
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [page]);

  const handleClick = () => {
  setShowProducts(true); 
};


  return (
    <div className="px-2 w-[99vw] flex flex-col justify-center items-center">
      <h2
        className="text-4xl mb-4 cursor-pointer select-none"
        onClick={handleClick}
      >
        ALL PRODUCTS 
      </h2>

      {loading && <div>Loading...</div>}

      {showProducts && !loading && (
        <ProductCards
          title="" // no extra heading
          productProp={products}
          filter="all_products" // optional prop for consistency
        />
      )}
    </div>
  );
};

export default AllProducts;
