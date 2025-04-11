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

// Helper function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const SalonCard: React.FC<{ salons: Salon; onClick: () => void }> = ({
  salons,
  onClick,
}) => (
  <div
    className="w-full max-w-[320px] h-[370px] bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
    onClick={onClick}
  >
    <div className="h-[50%] relative">
      {salons.image1 ? (
        <Image
          src={salons.image1}
          alt={salons.salon_name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
      ) : (
        <Image
          src="/assets/saloonPicture/salon_profile.jpg"
          alt="salon_profile"
          layout="fill"
          objectFit="cover"
        />
      )}
    </div>

    <div className="h-[50%] px-5 py-4 flex flex-col justify-between bg-gradient-to-b from-white to-gray-100">
      <h3 className="text-lg font-semibold truncate mb-1">{salons.salon_name}</h3>

      <div className="flex items-center gap-2 mb-1">
        <span className="text-yellow-500 text-sm font-semibold flex items-center gap-1">
          {salons.rating} <FaStar size={14} />
        </span>
        <span className="text-sm text-gray-500">({salons.reviews} Reviews)</span>
      </div>

      <Tooltip title={salons.address}>
        <p className="text-sm text-gray-600 truncate mb-1">{salons.address}</p>
      </Tooltip>

      {salons.openingHour && salons.closingHour ? (
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full w-fit border border-green-300">
          {salons.openingHour}am - {salons.closingHour}pm
        </span>
      ) : (
        <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full w-fit border border-red-300">
          24/7 Available
        </span>
      )}

      <Tooltip title={salons.about}>
        <p className="text-xs text-gray-500 truncate mt-2">{salons.about}</p>
      </Tooltip>
    </div>
  </div>
);

const SalonCards: React.FC<{ title?: string; showButton?: boolean }> = ({
  title = "Featured Salons",
  showButton = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const result = await dispatch(getAllSalons(1)).unwrap();
        setSalons(shuffleArray(result.salons));
      } catch {
        setError("Failed to load salons");
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setCardsToShow(1);
        setIsSmallScreen(true);
      } else if (width <= 768) {
        setCardsToShow(2);
        setIsSmallScreen(false);
      } else if (width <= 1024) {
        setCardsToShow(3);
        setIsSmallScreen(false);
      } else {
        setCardsToShow(4);
        setIsSmallScreen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + cardsToShow < salons.length) setStartIndex(startIndex + 1);
  };

  const handleViewMore = () => router.push("/salons/all_salons");

  const handleSalonClick = (id: number) => router.push(`/salons/details/?salonId=${id}`);

  if (loading) return <p className="text-center text-gray-500">Loading salons...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full px-4 md:px-10 py-10">
      <h2 className="text-3xl font-semibold mb-8">{title}</h2>

      {isSmallScreen && (
        <div className="flex justify-between items-center mb-4">
          <button
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            <FaArrowLeft />
          </button>
          <button
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
            onClick={handleNext}
            disabled={startIndex + cardsToShow >= salons.length}
          >
            <FaArrowRight />
          </button>
        </div>
      )}

      <div
        className={`${
          isSmallScreen ? "flex overflow-x-auto gap-4 pb-4" : "grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {salons
          .slice(startIndex, startIndex + cardsToShow)
          .map((salon) => (
            <SalonCard
              key={salon._id}
              salons={salon}
              onClick={() => handleSalonClick(salon._id)}
            />
          ))}
      </div>

      {showButton && (
        <div className="mt-8 text-center">
          <button
            className="bg-[#583FA8] text-white px-6 py-2 rounded-lg hover:bg-[#472c9f] transition"
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default SalonCards;
