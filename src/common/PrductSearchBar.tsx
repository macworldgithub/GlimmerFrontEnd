"use client";
import React, { useState } from "react";
import { Input } from "antd";
import { BsSearch } from "react-icons/bs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

const PrductSearchBar = ({
  selections,
  products,
  className,
}: {
  selections: CategorySelection[];
  products: any[];
  className?: string;
}) => {
  console.log(selections);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isSalonPage = pathname.startsWith("/salons");

  const handleSearch = () => {
    if (!searchQuery) return;

    let matchedCategory: string | null = null;
    let matchedSubCategory: string | null = null;
    let matchedItem: string | null = null;
    let matchedName: string | null = null;

    // First try to match a product name exactly
    const matchedProduct = products.find((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (matchedProduct) {
      matchedName = matchedProduct.name;
      matchedCategory = matchedProduct.category_id;
      matchedSubCategory = matchedProduct.sub_category_id;
      matchedItem = matchedProduct.item_id;
    }

    // If no product match, try to match categories, subcategories, and items
    if (!matchedCategory && !matchedSubCategory && !matchedItem) {
      // Check for special category cases
      if (searchQuery.toLowerCase() === "makeup") {
        matchedCategory = "6790d2749a0b078319c69e9d";
      } else if (searchQuery.toLowerCase() === "fragrance") {
        matchedCategory = "6790d27d9a0b078319c69e9f";
      } else {
        // Search through all categories, subcategories, and items
        selections.forEach((category) => {
          // Check category name
          if (
            category.category_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          ) {
            matchedCategory = category.category_id;
          }

          // Check subcategories if category didn't match
          if (!matchedCategory && !matchedSubCategory) {
            category.sub_categories.forEach((subCategory) => {
              if (
                subCategory.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ) {
                matchedCategory = category.category_id;
                matchedSubCategory = subCategory.sub_category_id;
              }

              // Check items if subcategory didn't match
              if (!matchedSubCategory && !matchedItem) {
                subCategory.items.forEach((item) => {
                  console.log("item", item)
                  if (
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                  ) {
                    matchedCategory = category.category_id;
                    matchedSubCategory = subCategory.sub_category_id;
                    matchedItem = item.item_id;
                  }
                });
              }
            });
          }
        });
      }
    }

    if (
      !matchedCategory &&
      !matchedSubCategory &&
      !matchedItem &&
      !matchedName
    ) {
      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 2000);
      return;
    }

    const params = new URLSearchParams(searchParams);
    
    // Clear all filters first
    params.delete("category");
    params.delete("sub_category");
    params.delete("item");
    params.delete("name");

    // Set the matched filters
    if (matchedCategory) params.set("category", matchedCategory);
    if (matchedSubCategory) params.set("sub_category", matchedSubCategory);
    if (matchedItem) params.set("item", matchedItem);
    if (matchedName) params.set("name", matchedName);

    params.set("page", "1"); // Reset to page 1
    router.push(`/products?${params.toString()}`);
  };

  return (
    <>
      {!isSalonPage && (
        <div
          className={`flex items-center w-full max-w-[350px] h-[50px] border border-gray-300 rounded-md shadow-sm bg-white overflow-hidden transition-all duration-300 focus-within:ring-1 ${className}`}
        >
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
      )}
    </>
  );
};

export default PrductSearchBar;
