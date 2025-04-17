"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RealCardItem } from "@/data";
import { useSearchParams } from "next/navigation";
import { getRecommendedProductsOfSalon } from "@/api/salon";
import Card from "@/common/Card";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const RecommendedProducts = () => {
	const searchParams = useSearchParams();
	const [products, setProducts] = useState<RealCardItem[]>([]);
	const [startIndex, setStartIndex] = useState(0);
	const cardsToShow = 4;

	const salonId = searchParams.get("salonId") ?? "";

	useEffect(() => {
		const fetchProductsOfSalon = async () => {
			const response = await getRecommendedProductsOfSalon(salonId);
			setProducts(response);
		};

		fetchProductsOfSalon();
	}, [salonId]);

	const handlePrev = () => {
		if (startIndex > 0) {
			setStartIndex((prev) => Math.max(prev - cardsToShow, 0));
		}
	};

	const handleNext = () => {
		if (startIndex + cardsToShow < products.length) {
			setStartIndex((prev) =>
				Math.min(prev + cardsToShow, products.length - cardsToShow)
			);
		}
	};

	return (
		<div className="w-full max-w-[82rem] px-4 md:px-10 py-10">
			{/* Title */}
			<Link href="/selfcare-products" className="block">
				<h2 className="text-3xl font-semibold mb-8">Recommended Products</h2>
			</Link>

			{/* Swiper Controls */}
			<div className="flex justify-between items-center mb-6">
				<button
					onClick={handlePrev}
					disabled={startIndex === 0}
					className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
				>
					<FaArrowLeft />
				</button>
				<button
					onClick={handleNext}
					disabled={startIndex + cardsToShow >= products.length}
					className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
				>
					<FaArrowRight />
				</button>
			</div>

			{/* Product Grid (Swiper View) */}
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
				{products.length > 0 ? (
					products
						.slice(startIndex, startIndex + cardsToShow)
						.map((product) => (
							<Card key={product._id} item={product} />
						))
				) : (
					<p className="text-center text-gray-500 w-full col-span-4">
						No products available
					</p>
				)}
			</div>
		</div>
	);
};

export default RecommendedProducts;
