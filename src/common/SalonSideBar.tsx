import React, { useState } from "react";
import { motion } from "framer-motion";

interface SalonSidebarProps {
  onFilterChange: (filterId: string) => void;
}

const SalonSidebar = ({ onFilterChange }: SalonSidebarProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Salons" },
    { id: "recommended-salon", label: "Recommended" },
    { id: "new-to-glimmer", label: "New to Glimmer" },
    { id: "trending-salon", label: "Trending" },
  ];

  const handleFilterChange = (id: string) => {
    setSelectedFilter(id);
    onFilterChange(id);
  };

  return (
    <div className="p-6 border-r bg-[#FDF3D2] shadow-md hidden md:block w-72">
      <h2 className="font-bold text-2xl text-gray-800 mb-4">Filters</h2>

      <div className="space-y-4">
        {filters.map((filter) => (
          <label
            key={filter.id}
            className="flex items-center cursor-pointer"
          >
            <input
              type="radio"
              name="filter"
              checked={selectedFilter === filter.id}
              onChange={() => handleFilterChange(filter.id)}
              className="mr-2 hidden"
            />
            <span
              className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
                selectedFilter === filter.id
                  ? "border-purple-700"
                  : "border-gray-400"
              }`}
            >
              {selectedFilter === filter.id && (
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

export default SalonSidebar;
