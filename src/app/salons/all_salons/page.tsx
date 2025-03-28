"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Salonfilter from "../components/salonFIlter";
import ServiceSidebar from "@/common/ServiceSidebar";
import { getAllActiveServices, getAllSalons } from "@/api/salon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/reduxStore";
import ServiceCard from "@/common/ServiceCard";
import { BiChevronDown } from "react-icons/bi";
import { message } from "antd";
import SalonCards from "@/common/salon-cards";
import Page from "./../[id]/page";

// A loading component for suspense fallback
const Loading = () => (
  <div className="justify-center flex min-h-[70vh] w-full items-center">
    <div className="text-center font-bold text-3xl">Loading...</div>
  </div>
);

const SalonsList = () => {
  const [activeSort, setActiveSort] = useState("Date");
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);


  const [data, setData] = useState<any[]>([]); // Store services
  console.log(data);
  const [total, setTotal] = useState(0); // Store total services



  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const page = Number(searchParams.get("page")) || 1;

  const pageSize = 3; // Number of items per page
  const fetchData = async () => {
    try {
      const result = await dispatch(getAllSalons({ page })).unwrap();
      setData(result.salons || []);
      setTotal(result.totalCount ?? 0);
    } catch (error) {
      console.error("Error fetching salons:", error);
      message.error("Failed to fetch salons");
    }
  };

  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);
  // Calculate total pages properly
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  useEffect(() => {
    fetchData();
  }, [page]);

 

  const handlePageChange = (newPage : number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`?page=${newPage}`);
    }
  };

  return (
    <div className="flex flex-col w-[99vw] pb-[8rem] ">
      {/* Category Navigation Menu */}
      <div className="hero-content px-10 bg-[#FBE8A5] mb-4 z-10">
        <Salonfilter />
      </div>
      {/* Breadcrumbs */}
      <div className="breadcrumbs mb-4 text-xl lg:text-xl px-10">
        <Link
          href="/salons"
          className="text-gray-500 font-medium text-base lg:text-xl"
        >
          Salons
        </Link>
        <span className="mx-2 text-gray-500 font-medium text-base lg:text-xl">
          /
        </span>
        <Link
          href="/salons/all_salons"
          className="text-purple-800 font-medium text-base lg:text-xl"
        >
          All Salons
        </Link>
      </div>

      {/* Banner Image */}
      <div className="hidden md:block pt-[3rem] px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[6rem] xl:px-[12rem]">
        <div className="w-full h-[50vh] sm:h-[50vh] md:h-[50vh] lg:h-[50vh] xl:h-[50vh] rounded-lg overflow-hidden relative group">
          <img
            src="/assets/images/banner.png"
            alt="Banner"
            className="w-full h-full transition-transform duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-500 px-4 lg:p-[8rem]">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center">
              Explore Our Best Collection
            </h1>
          </div>
        </div>
      </div>

      {/* Content Area: Sidebar & Items Grid */}
      <div className="flex flex-col md:flex-row md:gap-x-8 xl:gap-x-0 px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[5rem] xl:px-[10rem] lg:py-[2rem]">
        {/* Sidebar */}
        {/* <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-[30%] lg:w-[30%] p-6"
        >
          <ServiceSidebar />
        </motion.aside> */}

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {/* Sort and Filter UI */}
          {/* SORT BY*/}
          <div className="flex flex-wrap md:flex-row sm:flex-col items-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8">
            <span className="text-gray-700 text-[20px]">Sort by</span>

            <button
              onClick={() => {
                setActiveSort("Date");
                setSortOrder(sortOrder === "desc" ? "asc" : "desc");
              }}
              className={`border px-6 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out ${activeSort === "Date"
                ? "border-purple-800 text-purple-800 bg-purple-100"
                : "border-gray-400 text-gray-700 hover:bg-[#FDF3D2]"
                }`}
            >
              Date{" "}
              {activeSort === "Date" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className={`flex items-center gap-2 border px-6 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out ${activeSort === "Price"
                  ? "border-purple-800 text-purple-800 bg-purple-100"
                  : "border-gray-400 text-gray-700 hover:bg-[#FDF3D2]"
                  }`}
              >
                Price{" "}
                {activeSort === "Price"
                  ? sortOrder === "desc"
                    ? "↓"
                    : "↑"
                  : ""}{" "}
                <BiChevronDown size={20} />
              </button>

              {showPriceDropdown && (
                <div className="absolute z-50 left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      setActiveSort("Price");
                      setSortOrder("asc");
                      setShowPriceDropdown(false);
                    }}
                    className="block w-full text-left px-5 py-3 text-lg font-medium hover:bg-gray-200"
                  >
                    Low to High
                  </button>
                  <button
                    onClick={() => {
                      setActiveSort("Price");
                      setSortOrder("desc");
                      setShowPriceDropdown(false);
                    }}
                    className="block w-full text-left px-5 py-3 text-lg font-medium hover:bg-gray-200"
                  >
                    High to Low
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                className="flex items-center gap-2 border px-6 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out border-gray-400 text-gray-700 hover:bg-[#FDF3D2]"
              >
                Ratings {ratingFilter ? `${ratingFilter} ★` : ""}{" "}
                <BiChevronDown size={20} />
              </button>

              {showRatingDropdown && (
                <div className="absolute z-50 left-0 mt-2 w-44 bg-white rounded-lg shadow-lg">
                  {showRatingDropdown && (
                    <div className="absolute z-50 left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => {
                            setRatingFilter(star);
                            setShowRatingDropdown(false);
                          }}
                          className="block w-full text-left px-5 py-3 text-lg font-medium hover:bg-gray-200 items-center"
                        >
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < star ? "text-purple-800" : "text-gray-300"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="w-full h-max grid grid-cols-1  gap-y-10 p-6">
            {paginatedData.length > 0 ? (
              paginatedData.map((salon) => (
                <motion.div key={salon._id} whileHover={{ scale: 1.03 }} className="flex">
                  <SalonCards showButton={false} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center min-h-[70vh]">
                <div className="text-center font-bold text-3xl">
                  Oops! No items to display in this category
                </div>
              </div>
            )}


            {/* {data && data.length > 0 ? (
              data.map((salon) => (
                <motion.div
                  key={salon._id}
                  whileHover={{ scale: 1.03 }}
                  className="flex"
                >
                  <SalonCards salon={salon} showButton={false} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center min-h-[70vh]">
                <div className="text-center font-bold text-3xl">
                  Oops! No items to display in this category
                </div>
              </div>
            )} */}
          </div>

          {/* Pagination */}
          <div>
            {data.length > 0 ? (
              <div className="flex justify-center items-center space-x-2 py-4 ">
                <button className="bg-gray-200 py-2 px-6 rounded-lg cursor-pointer"
                 onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span> Page {page} of {totalPages} </span>
          <button className="bg-gray-200 py-2 px-6 rounded-lg cursor-pointer"
           onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            Next
          </button>
              </div>
            ) : (
              <p className="text-center text-gray-500">No salons available.</p>
            )}
          </div>
        </motion.main>
      </div>
    </div>
  );
};

const Temp = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SalonsList />
    </Suspense>
  );
};

export default Temp;
