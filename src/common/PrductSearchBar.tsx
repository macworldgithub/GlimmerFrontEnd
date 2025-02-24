"use client";
import React, { useState } from "react";
import { Input } from "antd";
import { BsSearch } from "react-icons/bs";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

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


const PrductSearchBar = ({ selections, products, className }: { selections: CategorySelection[]; products: any[]; className?: string }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();

  const handleSearch = () => {
    if (!searchQuery) return;

    let matchedCategory: string | null = null;
    let matchedSubCategory: string | null = null;
    let matchedItem: string | null = null;
    let matchedName: string | null = searchQuery; 

    const matchedProduct = products.find((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("match Product", matchedProduct);
    if (matchedProduct) {
      matchedName = matchedProduct.name;
      console.log(matchedName);
      matchedCategory = matchedProduct.category_id;
      matchedSubCategory = matchedProduct.sub_category_id;
    }
    // Special case: If the search query is "Makeup", set category ID directly
    if (searchQuery.toLowerCase() === "makeup") {
      matchedCategory = "6790d2749a0b078319c69e9d";
    } else {
      selections.forEach((category) => {
        if (!matchedCategory && category.category_name.toLowerCase().includes(searchQuery.toLowerCase())) {
          matchedCategory = category.category_id;
        }

        category.sub_categories.forEach((subCategory) => {
          if (!matchedSubCategory && subCategory.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            matchedSubCategory = subCategory.sub_category_id;
            matchedCategory = category.category_id;
          }

          subCategory.items.forEach((item) => {
            if (!matchedItem && item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
              matchedItem = item.item_id;
              matchedSubCategory = subCategory.sub_category_id;
              matchedCategory = category.category_id;
            }
          });
        });
      });
    }

    if (!matchedCategory && !matchedSubCategory && !matchedItem && !matchedName) {
      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 2000);
      return;
    }

    // Create URL search params
    const params = new URLSearchParams(searchParams);
    if (matchedCategory) params.set("category", matchedCategory);
    if (matchedSubCategory) params.set("sub_category", matchedSubCategory);
    if (matchedItem) params.set("item", matchedItem);
    if (matchedName) params.set("name", matchedName);
    params.set("page", "1"); // Reset page to 1 when filtering

    // Navigate to the updated URL
    router.push(`/products?${params.toString()}`);
  };

  return (
    <>
      <div className={`flex items-center w-full max-w-[350px] h-[50px] border border-gray-300 rounded-md shadow-sm bg-white overflow-hidden transition-all duration-300 focus-within:ring-1 ${className}`}>
        <Input
          placeholder="Search for products and brands"
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
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-lg shadow-xl p-6 w-80 text-center"
            >
              <p className="text-lg font-semibold text-gray-800">
                No matching category, subcategory, item or product found.
              </p>
            </motion.div>
          </div>
        )}
      </div>

    </>
  );
};

export default PrductSearchBar;
