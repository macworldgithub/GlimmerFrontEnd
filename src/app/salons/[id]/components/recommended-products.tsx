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
		<div className="w-[99vw] xl:px-16 text-center">
			<div className="mx-auto max-w-full">
				<Link href="/selfcare-products">
					<h2 className="text-3xl font-semibold mb-4 text-left pl-4 lg:pl-12">Recommended Products</h2>
				</Link>

				{loading && <p>Loading products...</p>}
				{error && <p className="text-red-500">{error}</p>}

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 py-4 justify-center">
					{products.length > 0 ? (
						products.map((product: RealCardItem) => (
							<Card key={product._id} item={product} />
						))
					) : (
						<p>No products available</p>
					)}
				</div>

				<div className="text-center">
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
