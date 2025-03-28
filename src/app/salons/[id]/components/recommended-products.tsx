"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RealCardItem } from "@/data";
import { getAllProducts } from "@/api/product";
import Card from "@/common/Card";
import { useRouter } from "next/navigation";

const RecommendedProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState<RealCardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
	const fetchProducts = async () => {
	  setLoading(true);
	  try {
		const response = await getAllProducts();

		if (response && Array.isArray(response.products)) {
		  const randomProducts = getRandomProducts(response.products, 4);
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

  const getRandomProducts = (
	products: RealCardItem[],
	count: number
  ): RealCardItem[] => {
	const shuffled = [...products].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
  };

  const handleViewMore = () => router.push("/products");

  return (
	<div className="lg:px-[2rem] w-[99vw]">
	  <Link href="/selfcare-products" className="prose lg:prose-lg">
		<h2 className="mb-8 md:mb-8">Recommended Products</h2>
	  </Link>

	  {loading && <p>Loading products...</p>}
	  {error && <p className="text-red-500">{error}</p>}

	  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2rem] mb-8">
		{products.length > 0 ? (
		  products.map((product: RealCardItem) => (
			<Card key={product._id} item={product} />
		  ))
		) : (
		  <p>No products available</p>
		)}
		<div className="relative w-[99vw] max-w-7xl mx-auto text-center">
		  <button
			className="mt-4 bg-[#583FA8] text-white py-2 px-6 rounded-lg mb-6"
			onClick={handleViewMore}
		  >
			View More
		  </button>
		</div>
	  </div>
	</div>
  );
};

export default RecommendedProducts;
