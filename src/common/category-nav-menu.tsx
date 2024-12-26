"use client";
import { cn } from "@/lib/utils";
// Navbar.tsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FaSortDown } from "react-icons/fa";
// import { categories } from './categoriesData';
// categoriesData.ts
export const categories = [
	{
		name: "MAKE UP",
		items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
	},
	{
		name: "SKIN CARE",
		items: ["Item 6", "Item 7", "Item 8", "Item 9", "Item 10"],
	},
	{
		name: "FRAGRANCE",
		items: ["Item 11", "Item 12", "Item 13", "Item 14", "Item 15"],
	},
	{
		name: "HAIR CARE",
		items: ["Item 16", "Item 17", "Item 18", "Item 19", "Item 20"],
	},
	{
		name: "WATCHES",
		items: ["Item 21", "Item 22", "Item 23", "Item 24", "Item 25"],
	},
	{
		name: "FASHION",
		items: ["Item 26", "Item 27", "Item 28", "Item 29", "Item 30"],
	},
];
const CategoryNavMenu = ({ className }: { className?: string }) => {
	const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

	const handleMouseEnter = (categoryName: string) => {
		setHoveredCategory(categoryName);
	};

	const handleMouseLeave = () => {
		setHoveredCategory(null);
	};

	const renderCard = () => {
		if (!hoveredCategory) return null;

		const category = categories.find((cat) => cat.name === hoveredCategory);

		if (!category) return null;

		return ReactDOM.createPortal(
			<div
				className={cn(
					"fixed container top-[105px]   left-1/2 transform -translate-x-1/2 bg-base-300 shadow-lg rounded-lg w-full md:w-11/12 max-h-60 md:max-h-full overflow-y-auto p-4 mt-2 z-50",
				)}
				onMouseEnter={() => setHoveredCategory(hoveredCategory)}
				onMouseLeave={handleMouseLeave}
			>
				<div className="container mx-auto flex flex-wrap">
					{category.items.map((item, index) => (
						<div key={index} className="w-1/2 md:w-1/4 lg:w-1/6 p-2">
							<div className="bg-gray-100 p-4 rounded-lg">
								<p className="text-black font-medium">{item}</p>
							</div>
						</div>
					))}
				</div>
			</div>,
			document.body,
		);
	};

	return (
		<div className={cn("bg-primary", className)}>
			<div className="flex lg:justify-center overflow-x-auto whitespace-nowrap">
				{categories.map((category, i) => (
					<div
						key={category.name}
						className="relative "
						onMouseEnter={() => handleMouseEnter(category.name)}
						onMouseLeave={handleMouseLeave}
					>
						<button
							className={cn(
								"btn btn-primary min-w-[150px] flex-none rounded-none text-neutral text-nowrap flex flex-row",
								i === 0 && "rounded-l-md",
								i === categories.length && "rounded-r-md",
							)}
						>
							<span>{category.name}</span>
							<FaSortDown className="size-3 mb-1 -ml-1" />
						</button>
						{/* <button className="text-black font-semibold px-4">
							{category.name} <span className="ml-1">&#9662;</span>
						</button> */}
					</div>
				))}
			</div>
			{renderCard()}
		</div>
	);
};

export default CategoryNavMenu;
