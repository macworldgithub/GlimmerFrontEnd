"use client";
import React, { useState } from "react";
import { Input } from "antd";
import { BsSearch } from "react-icons/bs";
import { useRouter, useSearchParams } from "next/navigation";

interface CategorySelection {
  category_id: string;
  category_name: string;
  sub_categories: {
    sub_category_id: string;
    name: string;
    items: {
      item_id: string;
      name: string;
    }[];
  }[];
}


const PrductSearchBar = ({ selections, className }: { selections: CategorySelection[]; className?: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    if (!searchQuery) return;

    let matchedCategory = "";
    let matchedSubCategory = "";
    let matchedItem = "";
    let matchedProduct = false;

    // Check for matching categories, subcategories, and items
    selections.forEach((category) => {
      if (category.category_name.toLowerCase().includes(searchQuery.toLowerCase())) {
        matchedCategory = category.category_id;
      }
      category.sub_categories.forEach((subCategory) => {
        if (subCategory.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          matchedSubCategory = subCategory.sub_category_id;
          matchedCategory = category.category_id;
        }
        subCategory.items.forEach((item) => {
          if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            matchedItem = item.item_id;
            matchedSubCategory = subCategory.sub_category_id;
            matchedCategory = category.category_id;
          }
        });
      });
    });

    // Create URL search params
    const params = new URLSearchParams(searchParams);
    if (matchedCategory) params.set("category", matchedCategory);
    if (matchedSubCategory) params.set("sub_category", matchedSubCategory);
    if (matchedItem) params.set("item", matchedItem);
    params.set("page", "1"); // Reset page to 1 when filtering

    // Navigate to the updated URL
    router.push(`/products?${params.toString()}`);
  };



  return (
    <div
      className={`flex items-center w-full max-w-[350px] h-[50px] border border-gray-300 rounded-md shadow-sm bg-white overflow-hidden transition-all duration-300 focus-within:ring-1 ${className}`}
    >
      <Input
        placeholder="Search for products and brand"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onPressEnter={handleSearch}
        className="w-full px-4 py-2 border-none outline-none text-gray-700 focus:ring-0"
      />
      <button
        onClick={handleSearch}
        className="flex items-center justify-center text-gray-400 px-4 h-full transition-all duration-300"
      >
        <BsSearch className="size-5" />
      </button>
    </div>
  );
};

export default PrductSearchBar;
