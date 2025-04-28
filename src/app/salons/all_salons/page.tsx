"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { message } from "antd";
import Salonfilter from "../components/salonFIlter";
import { useDispatch } from "react-redux";
import { getAllSalons, getAllSalonsHighlights } from "@/api/salon";
import { FaStar } from "react-icons/fa";

import Image from "next/image";
import type { AppDispatch } from "@/store/reduxStore";
import SalonSidebar from "@/common/SalonSideBar";

const SalonsList = () => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const page = Number(searchParams.get("page_no")) || 1;
  const pageSize = 8;

const formatTime = (timeStr: any) => {
  const [hourStr, minute = "00"] = timeStr.split(':');
  let hour = parseInt(hourStr, 10);
  const isPM = hour >= 12;
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const suffix = isPM ? 'pm' : 'am';
  return `${formattedHour}:${minute} ${suffix}`;
};


  const fetchData = async () => {
    try {
      const result = selectedFilter === "all"
        ? await dispatch(getAllSalons(page)).unwrap()
        : await dispatch(getAllSalonsHighlights({ filter: selectedFilter })).unwrap();

      if (selectedFilter === "all") {
        setData(result.salons);
        setTotal(result.total);
      } else {
        setData(result);
        setTotal(result.length);
      }
    } catch (error) {
      message.error("Failed to fetch salons");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, selectedFilter]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page_no", newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (filterId: string) => {
    console.log(filterId)
    setSelectedFilter(filterId);
    router.push(`${pathname}`, { scroll: false });
  };

  const handleSalonClick = (salonId: number, openingHour: string, closingHour: string) => {
    router.push(`/salons/details/?salonId=${salonId}&openingHour=${openingHour}&closingHour=${closingHour}`);
  };

  return (
    <div className="flex flex-col w-[99vw] pb-[8rem]">
      <div className="px-10 py-10 bg-[#FBE8A5] mb-4 z-10">
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


      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >

        {/* Sort and Filter UI */}
        {/* SORT BY*/}
        <div className="flex flex-col md:flex-row gap-6 px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full md:w-[20%] lg:w-[20%] p-6"
          >
            <SalonSidebar onFilterChange={handleFilterChange} />
          </motion.aside>
          <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-12">
            {data.length > 0 ? (
              data.map((salon) => (
                <motion.div
                  key={salon._id}
                  whileHover={{ scale: 1.03 }}
                  className="flex flex-col rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-gray-100"
                  onClick={() => handleSalonClick(salon._id, formatTime(salon.openingHour), formatTime(salon.closingHour))}
                  style={{ cursor: "pointer" }}
                >
                  <div className="h-[200px] w-full relative">
                    {salon.image1 ? (
                      <Image
                        src={salon.image1.startsWith("http") ? salon.image1 : `/${salon.image1}`}
                        alt={salon.salon_name}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500">
                        <Image
                          src={"/assets/saloonPicture/salon_profile.jpg"}
                          alt="salon_profile"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 px-2">
                    <h2 className="text-lg font-semibold text-gray-900 truncate text-left mb-2">{salon.salon_name || "No Name"}</h2>
                    {/* Rating */}
                    <div className="flex items-center gap-2 text-left mb-2">
                      <span className="text-yellow-500 flex items-center gap-1 text-sm font-semibold">
                        4 <FaStar size={16} className="drop-shadow-md" />
                      </span>
                      <span className="text-gray-500 text-sm">(2859 Reviews)</span>
                    </div>

                    <span
                      className="text-sm text-gray-600 font-medium text-left mb-2 truncate cursor-pointer"
                      style={{ maxWidth: "200px", display: "inline-block" }}
                    >
                      {salon.address.length > 30
                        ? `${salon.address.substring(0, 30)}...`
                        : salon.address}
                    </span>



                    {/* Availability Badge */}
                    {salon.openingHour && salon.closingHour ? (
                      <div className="text-xs bg-green-100 text-green-700 px-4 py-1 rounded-full font-medium shadow-sm border border-green-300 text-left w-fit mb-2">
                        {formatTime(salon.openingHour)} - {formatTime(salon.closingHour)}
                      </div>
                    ) : (
                      <div className="text-xs bg-red-100 text-red-700 px-4 py-1 rounded-full font-medium shadow-sm border border-red-300 text-left w-fit mb-2">
                        24/7 Available
                      </div>
                    )}

                    <span
                      className="text-xs text-gray-500 truncate cursor-pointer mt-2 text-left leading-relaxed"
                      style={{ maxWidth: "200px", display: "inline-block" }}
                    >
                      {salon.about.length > 30
                        ? `${salon.about.substring(0, 30)}...`
                        : salon.about}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-full">No Salons Available</p>
            )}
          </div>
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
  );
};

export default SalonsList;


