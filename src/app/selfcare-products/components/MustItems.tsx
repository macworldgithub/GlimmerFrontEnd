"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";
import ProductCard from "@/common/ProductCard";

const MustItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(true); // 👈 products shown by default

  const fetchYouMustHaveThisProducts = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/admin/product-highlights?filter=you_must_have_this`
      );
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

  const handleClick = () => {
    setShowProducts((prev) => !prev); // 👈 toggle show/hide
  };

  return (
    <div className="px-2 w-[99vw] flex flex-col items-center">
      {/* Heading (same look, just clickable) */}
      <h2
        className="text-4xl  mb-4 cursor-pointer select-none"
        onClick={handleClick}
      >
        YOU MUST HAVE SEE THIS
      </h2>

      {loading && <div>Loading...</div>}

      {showProducts && !loading && (
        <ProductCard
          title="" // 👈 prevent heading duplication
          productProp={products}
          filter="you_must_have_this"
        />
      )}
    </div>
  );
};

export default MustItems;
