"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";
import ProductCards from "@/common/ProductCard";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrendingProducts = async () => {
	try {
	  const response = await axios.get(`${BACKEND_URL}/admin/product-highlights?filter=trending_product`);
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

  if (loading) {
	return <div>Loading...</div>; 
  }

  return (
	<div className="px-2 w-[99vw] flex justify-center">
	  <ProductCards title="TRENDING" productProp={products} filter="trending_product"/>
	</div>
  );
};

export default TrendingProducts;
