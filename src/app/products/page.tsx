"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import CategoryNavMenu from "@/common/category-nav-menu";
import Card from "@/common/Card";
import { getAllProductItem, getAllProducts } from "@/api/product";
import Sidebar from "@/common/Sidebar";
import { motion } from "framer-motion";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";

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


const priceOptions = ["Low to High", "High to Low"];


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
  const nameFilter = searchParams.get("name") ?? "";
  const minPriceFilter = Number(searchParams.get("min_price")) ?? 0;
  const maxPriceFilter = Number(searchParams.get("max_price")) ?? 0;
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
      const res = await getAllProducts(categoryFilter, subCategoryFilter, itemFilter, nameFilter, 0, 0, page);
      console.log("1111111");
      console.log(res.products);
      // Filter products by name if nameFilter is provided
      const filteredProducts = res.products.filter((product: any) => {
        const productName = product.name?.toLowerCase() || '';
        const productPrice = product.base_price || 0;

        // Apply price filter
        const matchesPrice = (minPriceFilter ? productPrice >= minPriceFilter : true) &&
          (maxPriceFilter ? productPrice <= maxPriceFilter : true);

        // Apply name filter if it's present
        const matchesName = nameFilter ? productName.includes(nameFilter.toLowerCase()) : true;

        return matchesPrice && matchesName;
      });

      setData(filteredProducts);
      setTotal(res.total || filteredProducts.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, categoryFilter, subCategoryFilter, itemFilter, nameFilter, minPriceFilter, maxPriceFilter]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: { category?: string; sub_category?: string; item?: string; name?: string; min_price?: string; max_price?: string }) => {
    const params = new URLSearchParams(searchParams);

    if (newFilters.category && !newFilters.sub_category && !newFilters.item && !newFilters.name && !newFilters.min_price && !newFilters.max_price) {
      params.set("category", newFilters.category);
      params.delete("sub_category");
      params.delete("item");
      params.delete("name");
      params.delete("min_price");
      params.delete("max_price");
    } else {
      if (newFilters.category) params.set("category", newFilters.category);
      if (newFilters.sub_category) params.set("sub_category", newFilters.sub_category);
      if (newFilters.item) params.set("item", newFilters.item);
      if (newFilters.name) params.set("item", newFilters.name);
      if (newFilters.min_price) params.set("min_price", newFilters.min_price);
      if (newFilters.max_price) params.set("max_price", newFilters.max_price);
    }
    // Reset the page to 1 whenever a filter changes
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  const [activeSort, setActiveSort] = useState("Date");
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  return (
    <div className="flex flex-col w-[99vw] pb-[17rem]">

      {/* Category Navigation Menu */}
      <div className="w-full mb-4">
        <CategoryNavMenu />
      </div>
      {/* Breadcrumbs */}
      <div className="breadcrumbs mb-4 text-xl lg:text-xl px-10">
        <Link href="/" className="text-gray-500 font-medium text-base lg:text-xl">Home</Link>
        <span className="mx-2 text-gray-500 font-medium text-base lg:text-xl">/</span>
        <Link href="/selfcare-products" className="text-gray-500 font-medium text-base lg:text-xl">Selfcare Products</Link>

        {(categoryFilter || subCategoryFilter || itemFilter || nameFilter) && (
          <>
            <span className="mx-2 text-purple-800 text-base lg:text-xl">/</span>
            <span className="text-purple-800 font-medium text-base lg:text-xl">Products</span>
          </>
        )}
      </div>
      {/* Banner Image */}
      <div className="pt-[3rem] px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[6rem] xl:px-[10rem]">
        <div className="w-full min-h-[250px] sm:min-h-[300px] md:h-[400px] lg:h-[450px] relative group">
          <img
            src="https://gymnation.com/media/d1efluel/ronaldo-cr7.jpg"
            alt="Banner"
            className="w-full h-full object-contain sm:object-cover transition-transform duration-500 "
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-500 px-4 lg:p-[8rem]">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center">
              Explore Our Best Collection
            </h1>
          </div>
        </div>
      </div>



      {/* Content Area: Sidebar & Items Grid */}
      <div className="flex flex-col md:flex-row px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[5rem] xl:px-[10rem] lg:py-[2rem]">

        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-[30%] lg:w-[30%] p-6"
        >
          <Sidebar selections={selections} onFilterChange={handleFilterChange} />
        </motion.aside>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {/* SORT BY*/}
          <div className="flex items-center gap-3 px-4 pt-6">
            <span className="text-gray-600 text-sm">Sort by</span>

            <button
              onClick={() => setActiveSort("Date")}
              className={`border px-5 py-1 rounded-sm ${activeSort === "Date" ? "border-black font-medium" : "border-gray-300"
                }`}
            >
              Date
            </button>

            <div className="relative">
              <button
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className={`flex items-center gap-1 border px-5 py-1 rounded-sm ${activeSort === "Price" ? "border-black font-medium" : "border-gray-300"
                  }`}
              >
                Price <BiChevronDown size={16} />
              </button>

              {showPriceDropdown && (
                <div className="absolute left-0 mt-2 w-36 bg-white border border-gray-300 rounded-md shadow-md">
                  {priceOptions.map((price) => (
                    <button
                      key={price}
                      onClick={() => {
                        setActiveSort("Price");
                        setShowPriceDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {price}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>



          <div className="w-full h-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {data.length ? (
              data.map((item) => (
                <motion.div key={item.id} whileHover={{ scale: 1.03 }} className="flex">
                  <Card item={item} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center min-h-[70vh]">
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
