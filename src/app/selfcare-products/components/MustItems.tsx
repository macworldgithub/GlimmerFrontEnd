"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";
import ProductCard from "@/common/ProductCard";

const MustItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchYouMustHaveThisProducts = async () => {
	try {
	  const response = await axios.get(`${BACKEND_URL}/admin/product-highlights?filter=you_must_have_this`);
	  setProducts(response.data); 
	} catch (error) {
	  console.error("Failed to fetch products:", error);
	} finally {
	  setLoading(false);
	}
  };

  useEffect(() => {
    fetchYouMustHaveThisProducts();
  }, []);

  if (loading) {
	return <div>Loading...</div>; 
  }

  return (
	<div className="px-2 w-[99vw]">
	  <ProductCard title="YOU MUST HAVE SEE THIS" productProp={products} filter="you_must_have_this"/>
	</div>
  );
};

export default MustItems;
