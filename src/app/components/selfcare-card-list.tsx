"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RealCardItem } from "@/data"; 
import { getAllProducts } from "@/api/product";
import Card from "@/common/Card"; 

const SelfcareCardList = () => {
  const [products, setProducts] = useState<RealCardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts();
        
        if (response && Array.isArray(response.products)) {
          const randomProducts = getRandomProducts(response.products, 3);
          setProducts(randomProducts);
        } else {
          setError("Failed to load products, unexpected response format.");
        }
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getRandomProducts = (products: RealCardItem[], count: number): RealCardItem[] => {
    const shuffled = [...products].sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, count);
  };

  return (
    <div className="lg:px-[6rem] w-[99vw]">
      <Link href="/selfcare-products" className="prose lg:prose-xl">
        <h2 className="mb-8 md:mb-8">Self-Care Items</h2>
      </Link>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[6rem] mb-8">
        {products.length > 0 ? (
          products.map((product: RealCardItem) => (
            <Card key={product._id} item={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default SelfcareCardList;
