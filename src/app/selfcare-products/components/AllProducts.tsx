"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";
import ProductCards from "@/common/ProductCard";
import { useRouter } from "next/navigation"; // ✅ import router

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ initialize router

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

  return (
    <div className="px-2 w-[99vw] flex flex-col justify-center items-center overflow-hidden">
      <h2
        onClick={() => router.push("/products")} // ✅ click to navigate
        className="text-4xl mb-4 cursor-pointer select-none hover:underline"
      >
        ALL PRODUCTS
      </h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <ProductCards
            title=""
            productProp={products}
            filter="all_products"
          />
        </div>
      )}
    </div>
  );
};

export default AllProducts;
