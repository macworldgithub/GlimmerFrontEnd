import React, { useState } from "react";
import { motion } from "framer-motion";

const SalonSidebar = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Salons" },
    { id: "recommended", label: "Recommended" },
    { id: "new", label: "New to Glimmer" },
    { id: "trending", label: "Trending" },
  ];

  const handleFilterChange = (id: string) => {
    setSelectedFilter(id);
    // Optionally trigger salon filtering logic here
    // e.g., props.onFilterChange(id) or dispatch action
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
