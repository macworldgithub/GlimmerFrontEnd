"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
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

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
  }
  return shuffledArray;
};

const SalonCard: React.FC<{ salons: Salon; onClick: () => void }> = ({
  salons,
  onClick,
}) => (
  <div
    className="w-[320px] h-[370px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden cursor-pointer"
    onClick={onClick}
  >
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
      <h3 className="text-lg font-semibold text-gray-900 truncate text-left mb-2">
        {salons.salon_name}
      </h3>
      <div className="flex items-center gap-2 text-left mb-2">
        <span className="text-yellow-500 flex items-center gap-1 text-sm font-semibold">
          4 <FaStar size={16} className="drop-shadow-md" />
        </span>
        <span className="text-gray-500 text-sm">(2859 Reviews)</span>
      </div>
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
      {salons.openingHour && salons.closingHour ? (
        <span className="text-xs bg-green-100 text-green-700 px-4 py-1 rounded-full font-medium shadow-sm border border-green-300 text-left w-fit mb-2">
          {salons.openingHour}am - {salons.closingHour}pm
        </span>
      ) : (
        <span className="text-xs bg-red-100 text-red-700 px-4 py-1 rounded-full font-medium shadow-sm border border-red-300 text-left w-fit mb-2">
          24/7 Available
        </span>
      )}
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

const SalonCards: React.FC<{ title?: string; showButton?: boolean }> = ({
  title,
  showButton = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Index for carousel navigation
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [showArrows, setShowArrows] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const result = await dispatch(getAllSalons(1)).unwrap();
        const shuffledSalons = shuffleArray(result.salons);
        setSalons(shuffledSalons);
      } catch (err) {
        setError("Failed to load salons");
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setCardsToShow(1);
        setIsSmallScreen(true);
      } else if (width <= 768) {
        setCardsToShow(2);
        setIsSmallScreen(false);
      } else if (width <= 1024) {
        setCardsToShow(3);
        setShowArrows(true);
      } else {
        setCardsToShow(4);
        setShowArrows(false);
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const handleNext = () => {
    if (startIndex + cardsToShow < salons.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleViewMore = () => router.push("/salons/all_salons");

  const handleSalonClick = (salonId: number) => {
    router.push(`/salons/details/?salonId=${salonId}`);
  };



  if (loading)
    return <p className="text-center text-gray-500">Loading salons...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="relative w-full max-w-7xl mx-auto text-center">
    <h2 className="text-3xl font-semibold mb-4 text-left pl-6">{title}</h2>

    <div className="relative flex items-center justify-center">
  {/* Left Arrow - Only visible on small and medium screens */}
  {isSmallScreen && (
    <button
      className="absolute left-2 sm:-left-6 z-10 bg-white p-3 rounded-full shadow-lg text-2xl font-bold stroke-2 text-gray-900 shadow-gray-700 
      top-1/2 transform -translate-y-1/2"
      onClick={handlePrev}
      disabled={startIndex === 0}
    >
      <FaArrowLeft />
    </button>
  )}

  {/* Salon Cards Wrapper */}
  <div className="flex gap-4 py-4 px-2 max-lg:overflow-hidden justify-center">
    {salons.slice(startIndex, startIndex + cardsToShow).map((salon) => (
      <SalonCard
        key={salon._id}
        salons={salon}
        onClick={() => handleSalonClick(salon._id)}
      />
    ))}
  </div>

  {/* Right Arrow - Only visible on small and medium screens */}
  {isSmallScreen && (
    <button
      className="absolute right-2 sm:-right-6 z-10 bg-white p-3 rounded-full shadow-lg text-2xl font-bold stroke-2 text-gray-900 shadow-gray-700 
      top-1/2 transform -translate-y-1/2"
      onClick={handleNext}
      disabled={startIndex + cardsToShow >= salons.length}
    >
      <FaArrowRight />
    </button>
  )}
</div>


    {showButton && (
      <button
        className="mt-4 bg-[#583FA8] text-white py-2 px-6 rounded-lg mb-6"
        onClick={handleViewMore}
      >
        View More
      </button>
    )}
  </div>
  );
};

export default SalonCards;
