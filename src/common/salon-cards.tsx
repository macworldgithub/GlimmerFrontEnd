"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { getAllSalons } from "@/api/salon";
import { Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/reduxStore";

interface Salon {
  _id: number;
  salon_name: string;
  rating: number;
  reviews: number;
  address: string;
  openingHour: string;
  closingHour: string;
  image1: string;
  about: string;
}

const SalonCard: React.FC<{ salons: Salon }> = ({ salons }) => (
  <div className="w-[320px] h-[370px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
    <div className="h-[50%] w-full relative">
      {salons.image1 ? (
        <Image
          src={salons.image1}
          alt={salons.salon_name}
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
    <div className="h-[50%] px-5 py-4 flex flex-col justify-between bg-gradient-to-b from-white to-gray-100 rounded-b-xl shadow-md">
      {/* Salon Name */}
      <h3 className="text-lg font-semibold text-gray-900 truncate text-left mb-2">
        {salons.salon_name}
      </h3>

      {/* Rating Section */}
      <div className="flex items-center gap-2 text-left mb-2">
        <span className="text-yellow-500 flex items-center gap-1 text-sm font-semibold">
          4 <FaStar size={16} className="drop-shadow-md" />
        </span>
        <span className="text-gray-500 text-sm">(2859 Reviews)</span>
      </div>

      {/* Address */}
      <Tooltip title={salons.address}>
        <span
          className="text-sm text-gray-600 font-medium text-left mb-2 truncate cursor-pointer"
          style={{ maxWidth: "200px", display: "inline-block" }}
        >
          {salons.address.length > 30
            ? `${salons.address.substring(0, 30)}...`
            : salons.address}
        </span>
      </Tooltip>

      {/* Opening Hours */}
      {salons.openingHour && salons.closingHour ? (
        <span className="text-xs bg-green-100 text-green-700 px-4 py-1 rounded-full font-medium shadow-sm border border-green-300 text-left w-fit mb-2">
          {salons.openingHour}am - {salons.closingHour}pm
        </span>
      ) : (
        <span className="text-xs bg-red-100 text-red-700 px-4 py-1 rounded-full font-medium shadow-sm border border-red-300 text-left w-fit mb-2">
          24/7 Available
        </span>
      )}

      {/* About Section */}
      <Tooltip title={salons.about}>
        <span
          className="text-xs text-gray-500 truncate cursor-pointer mt-2 text-left leading-relaxed"
          style={{ maxWidth: "200px", display: "inline-block" }}
        >
          {salons.about.length > 30
            ? `${salons.about.substring(0, 30)}...`
            : salons.about}
        </span>
      </Tooltip>
    </div>
  </div>
);

const SalonCards: React.FC<{ title?: string; salon: Salon[] }> = ({ title, salon }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [showArrows, setShowArrows] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const result = await dispatch(getAllSalons(1)).unwrap();
        setSalons(result.salons); // Assuming response has `salons` array
      } catch (err) {
        setError("Failed to load salons");
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  useEffect(() => {
    const getVisibleCount = () => {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 768) return 2;
      if (window.innerWidth <= 1024) {
        setShowArrows(true);
        return 3;
      }
      setShowArrows(false);
      return 4;
    };

    const handleResize = () => setVisibleCount(getVisibleCount());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => setStartIndex((prev) => (prev + 1) % salons.length);
  const prevSlide = () =>
    setStartIndex((prev) => (prev - 1 + salons.length) % salons.length);
  const handleViewMore = () => router.push("/salons/all_salons");

  if (loading)
    return <p className="text-center text-gray-500">Loading salons...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const visibleSalons = salons.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="relative w-full max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-semibold mb-4 text-left pl-6">{title}</h2>
      <div className="flex justify-center gap-5 py-4 px-4">
        {visibleSalons.map((salons) => (
          <SalonCard key={salons._id} salons={salons} />
        ))}
      </div>

      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 border border-gray-300 bg-white p-2 rounded-full shadow-md"
          >
            <FiArrowLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 border border-gray-300 bg-white p-2 rounded-full shadow-md"
          >
            <FiArrowRight size={24} />
          </button>
        </>
      )}

      <button
        className="mt-4 bg-[#583FA8] text-white py-2 px-6 rounded-lg mb-6"
        onClick={handleViewMore}
      >
        View More
      </button>
    </div>
  );
};

export default SalonCards;
