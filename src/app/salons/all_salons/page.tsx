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
    <div className="flex flex-col w-[99vw] overflow-x-hidden pb-32">
      {/* Filter Section */}
      <div className="px-4 sm:px-6 lg:px-10 py-8 bg-[#FBE8A5] mb-4 z-10">
        <Salonfilter />
      </div>


      {/* Banner Image */}
      <div className="hidden md:block pt-12 px-4 sm:px-6 md:px-10 xl:px-32">
        <div className="w-full h-[40vh] rounded-lg overflow-hidden relative group">
          <img
            src="/assets/images/banner.png"
            alt="Banner"
            className="w-full h-full object-cover transition-transform duration-500"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-500 px-4 md:px-12 lg:px-32">
            <h1 className="text-white text-xl sm:text-3xl md:text-4xl font-bold text-center mb-2">
              Explore Our Best Collection
            </h1>
            {/* Breadcrumbs */}
            <div className="breadcrumbs text-white text-base sm:text-lg lg:text-xl text-center">
              <Link href="/salons" className="text-white font-medium">
                Salons
              </Link>
              <span className="mx-2 text-gray-300 font-medium">/</span>
              <Link href="/salons/all_salons" className="text-white font-medium">
                All Salons
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="flex flex-col md:flex-row px-4 sm:px-6 md:px-8 lg:px-12 xl:px-32 py-6 lg:py-10">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/3 lg:w-1/4 p-4"
        >
          <SalonSidebar onFilterChange={handleFilterChange} />
        </motion.aside>

        {/* Salon Grid */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="w-full h-max grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-6 p-2">
            <div className="flex">
              {data.length > 0 ? (
                data.map((salon) => (
                  <motion.div
                    key={salon._id}
                    whileHover={{ scale: 1.03 }}
                    className="bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer flex flex-col overflow-hidden"
                    onClick={() =>
                      handleSalonClick(
                        salon._id,
                        formatTime(salon.openingHour),
                        formatTime(salon.closingHour)
                      )
                    }
                  >
                    {/* Image */}
                    <div className="relative w-full h-48 sm:h-52 md:h-56">
                      {salon.image1 ? (
                        <Image
                          src={
                            salon.image1.startsWith("http")
                              ? salon.image1
                              : `/${salon.image1}`
                          }
                          alt={salon.salon_name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-t-2xl"
                        />
                      ) : (
                        <Image
                          src="/assets/saloonPicture/salon_profile.jpg"
                          alt="salon_profile"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-t-2xl"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col justify-between h-[180px]">
                      <div>
                        <h2 className="text-lg font-semibold truncate">
                          {salon.salon_name || "No Name"}
                        </h2>
                        <p className="text-sm text-gray-600 md:truncate">
                          {salon.address.length > 30
                            ? `${salon.address.substring(0, 30)}...`
                            : salon.address}
                        </p>

                      </div>
                      <div>
                        {salon.openingHour && salon.closingHour ? (
                          <div className="text-[10px] sm:text-xs bg-green-100 text-green-700 px-2 sm:px-4 py-0.5 sm:py-1 rounded-full w-fit mb-1 border border-green-300">
                            {formatTime(salon.openingHour)} - {formatTime(salon.closingHour)}
                          </div>
                        ) : (
                          <div className="text-[10px] sm:text-xs bg-red-100 text-red-700 px-2 sm:px-4 py-0.5 sm:py-1 rounded-full w-fit mb-1 border border-red-300">
                            24/7 Available
                          </div>
                        )}

                        <p className="text-[11px] sm:text-xs text-gray-500 sm:truncate">
                          {salon.about.length > 30
                            ? `${salon.about.substring(0, 30)}...`
                            : salon.about}
                        </p>
                      </div>

                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center min-h-[60vh]">
                  <div className="text-center font-bold text-2xl">
                    No Salons Available
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
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
                disabled={page === Math.ceil(total / pageSize)}
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

export default SalonsList;


