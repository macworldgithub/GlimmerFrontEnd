import React from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

interface ProductSidebarProps {
  onFilterChange: (filterId: string) => void;
}

const ProductSidebar = ({ onFilterChange }: ProductSidebarProps) => {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter");

  const filters = [
    { id: "best_seller", label: "Best Seller" },
    { id: "trending_product", label: "Trending Products" },
    { id: "you_must_have_this", label: "You Must Have This" },
  ];

  const handleFilterChange = (id: string) => {
    onFilterChange(id);
  };

  return (
    <div className="p-6 border-r bg-[#FDF3D2] shadow-md hidden md:block w-72">
      <h2 className="font-bold text-2xl text-gray-800 mb-4">Filters</h2>

      <div className="space-y-4">
        {filters.map((filter) => (
          <label key={filter.id} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="filter"
              checked={currentFilter === filter.id}
              onChange={() => handleFilterChange(filter.id)}
              className="mr-2 hidden"
            />
            <span
              className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
                currentFilter === filter.id
                  ? "border-purple-700"
                  : "border-gray-400"
              }`}
            >
              {currentFilter === filter.id && (
                <motion.div
                  className="w-3 h-3 bg-purple-500 rounded-full"
                  layoutId="filterSelection"
                />
              )}
            </span>
            <span className="text-gray-800 font-medium">{filter.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProductSidebar;
