"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";
import ProductCards from "@/common/ProductCard";
import { useRouter } from "next/navigation";

interface AllProductsProps {
  onLoaded?: () => void;
}

const TrendingProducts = ({ onLoaded }: AllProductsProps) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      onLoaded?.();
    }
  };

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const handleClick = () => {
    router.push("/product_highlights?filter=trending_product");
  };

  if (loading) return null;

  return (
    <div className="px-2 w-[99vw] flex flex-col justify-center items-center">
      <h2
        className="text-2xl lg:text-4xl mb-4 cursor-pointer select-none hover:underline"
        onClick={handleClick}
      >
        TRENDING
      </h2>


      {!loading && (
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
