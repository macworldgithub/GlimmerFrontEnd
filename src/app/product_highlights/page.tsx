"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import CategoryNavMenu from "@/common/category-nav-menu";
import Card from "@/common/Card";
import { getAllProductHighlights } from "@/api/product";
import { motion } from "framer-motion";
import Link from "next/link";
import ProductSidebar from "@/common/ProductSideBar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/reduxStore";
import { message } from "antd";

const Loading = () => (
  <div className="justify-center flex min-h-[70vh] w-full items-center">
    <div className="text-center font-bold text-3xl">Loading...</div>
  </div>
);

const ProductHighlights = () => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const page = Number(searchParams.get("page_no")) || 1;
  const filter = searchParams.get("filter") || "";
  const pageSize = 8;

  const fetchData = async () => {
    try {
      const result = await dispatch(
        getAllProductHighlights({ filter })
      ).unwrap();

      const combined = [
        ...(result.best_seller || []),
        ...(result.trending_product || []),
        ...(result.you_must_have_this || []),
      ];

      setData(combined);
      setTotal(combined.length);
    } catch (error) {
      message.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, filter]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page_no", newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (filterId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", filterId);
    params.set("page_no", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex flex-col w-[99vw] pb-[8rem]">
      <div className="w-full mb-4">
        <CategoryNavMenu />
      </div>

      <div className="hidden md:block pt-[3rem] px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[6rem] xl:px-[12rem]">
        <div className="w-full h-[50vh] rounded-lg overflow-hidden relative group">
          <img
            src="/assets/images/banner.png"
            alt="Banner"
            className="w-full h-full transition-transform duration-500"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-500 px-4 lg:p-[8rem]">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center">
              Explore Our Best Collection
            </h1>
            <div className="breadcrumbs mt-4 text-white text-base sm:text-lg lg:text-xl text-center">
              <Link href="/" className="text-white font-medium">
                Home
              </Link>
              <span className="mx-2 text-white font-medium">/</span>
              <Link
                href="/selfcare-products"
                className="text-white font-medium"
              >
                Selfcare Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[5rem] xl:px-[10rem] lg:py-[2rem]">
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-[30%] p-6"
        >
          <ProductSidebar onFilterChange={handleFilterChange} />
        </motion.aside>

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="w-full h-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-10 p-6">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <motion.div
                  key={item._id || index}
                  whileHover={{ scale: 1.03 }}
                  className="flex"
                >
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

          {total > 0 && (
            <div className="flex justify-center items-center gap-2 py-6">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-lg text-gray-600">
                Page {page} of {Math.ceil(total / pageSize)}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= Math.ceil(total / pageSize)}
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
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
      <ProductHighlights />
    </Suspense>
  );
};

export default Temp;
