"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import CategoryNavMenu from "@/common/category-nav-menu";
import Card from "@/common/Card";
import { getAllProductItem, getAllProducts } from "@/api/product";
import Sidebar from "@/common/Sidebar";
import { motion } from "framer-motion";
import GlimmerBanner from "../salons/[id]/components/glimmer-banner";

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

// A loading component for suspense fallback
const Loading = () => (
  <div className="justify-center flex min-h-[70vh] w-full items-center">
    <div className="text-center font-bold text-3xl">Loading...</div>
  </div>
);

const ProductsList = () => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [selections, setSelections] = useState<CategorySelection[]>([]);
  const pageSize = 8;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const categoryFilter = searchParams.get("category") ?? "";
  const subCategoryFilter = searchParams.get("sub_category") ?? "";
  const itemFilter = searchParams.get("item") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchSelections = async () => {
      try {
        const productItemsRes = await getAllProductItem();
        const transformedSelections = transformData(productItemsRes);
        setSelections(transformedSelections);
      } catch (error) {
        console.error("Error fetching selections:", error);
      }
    };
    fetchSelections();
  }, []);

  function transformData(data: any[]): CategorySelection[] {
    return data.map((category) => ({
      category_id: category.product_category._id,
      category_name: category.product_category.name,
      sub_categories: category.sub_categories.map((subCategory: any) => ({
        sub_category_id: subCategory._id,
        name: subCategory.name,
        items: subCategory.items.map((item: any) => ({
          item_id: item._id,
          name: item.name,
        })),
      })),
      created_at: category.product_category.created_at,
    }));
  }

  const fetchData = async () => {
    try {
      const res = await getAllProducts(categoryFilter, subCategoryFilter, itemFilter, page);
      setData(res.products);
      setTotal(res.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, categoryFilter, subCategoryFilter, itemFilter]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: { category?: string; sub_category?: string; item?: string }) => {
    const params = new URLSearchParams(searchParams);

    if (newFilters.category) params.set("category", newFilters.category);
    if (newFilters.sub_category) params.set("sub_category", newFilters.sub_category);
    if (newFilters.item) params.set("item", newFilters.item);

    // Reset the page to 1 whenever a filter changes
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col w-[99vw] pb-[17rem]">

      {/* Category Navigation Menu */}
      <div className="w-full">
        <CategoryNavMenu />
      </div>

      {/* Banner Image */}
      <div className="w-full min-h-[250px] sm:min-h-[300px] md:h-[400px] lg:h-[600px] rounded-lg overflow-hidden relative group">
        <img
          src="https://gymnation.com/media/d1efluel/ronaldo-cr7.jpg"
          alt="Banner"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-500 px-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            Explore Our Best Collection
          </h1>
        </div>
      </div>



      {/* Content Area: Sidebar & Items Grid */}
      <div className="flex flex-col md:flex-row">

        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-[30%] lg:w-[20%] p-6"
        >
          <Sidebar selections={selections} onFilterChange={handleFilterChange} />
        </motion.aside>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-[70%] lg:w-[80%] p-6"
        >
          {/* Items Grid */}
          <div className="w-full h-max flex flex-wrap gap-10 p-[2rem]">
            {data.length ? (
              data.map((item) => (
                <motion.div key={item.id} whileHover={{ scale: 1.03 }}>
                  <Card item={item} />
                </motion.div>
              ))
            ) : (
              <div className="justify-center flex min-h-[70vh] w-full items-center">
                <div className="text-center font-bold text-3xl">
                  Oops! No items to display in this category
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {total > 0 && (
            <div className="w-full flex justify-center items-center space-x-2 py-4">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-lg text-gray-600">
                Page {page} of {Math.ceil(total / pageSize)}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === Math.ceil(total / pageSize)}
                className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </motion.main>
      </div>
    </div>
  );

};

const Temp = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsList />
    </Suspense>
  );
};

export default Temp;
