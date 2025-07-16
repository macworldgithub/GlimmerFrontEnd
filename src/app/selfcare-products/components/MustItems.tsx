"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/api/config";
import ProductCard from "@/common/ProductCard";
import { useRouter } from "next/navigation";

const MustItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    router.push("/product_highlights?filter=you_must_have_this");
  };

  return (
    <div className="px-2 w-[99vw] flex flex-col items-center">
      {/* Heading (same look, just clickable) */}
      <h2
        className="text-2xl lg:text-4xl mb-4 cursor-pointer select-none hover:underline"
        onClick={handleClick}
      >
        YOU MUST HAVE SEE THIS
      </h2>

      {loading && <div>Loading...</div>}

      {!loading && (
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
