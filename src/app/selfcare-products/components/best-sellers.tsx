"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";
import ProductCard from "@/common/ProductCard";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBestSellerProducts = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/admin/product-highlights?filter=best_seller`);
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

  if (loading) {
  return <div>Loading...</div>; 
  }

  return (
  <div className="px-2 w-[99vw]">
    <ProductCard title="Best Seller" productProp={products} filter="best_seller"/>
  </div>
  );
};

export default BestSellers;
