"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAllSalons } from "@/api/salon";
import { Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/reduxStore";
import Link from "next/link";
import { extractCityFromAddress, formatSlug, sanitizeSlug } from "@/lib/utils";

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

const SalonCard: React.FC<{ salons: Salon; onClick: () => void }> = ({
  salons,
  onClick,
}) => (
  <div
    className="w-full bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
    onClick={onClick}
  >
    <div className="relative rounded-t-xl overflow-hidden aspect-[4/3]">
      {salons.image1 ? (
        <Image
          src={
            salons.image1.startsWith("http")
              ? salons.image1
              : `/${salons.image1}`
          }
          alt={salons.salon_name}
          fill
          className="object-cover rounded-t-xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <Image
          src="/assets/saloonPicture/salon_profile.jpg"
          alt="salon_profile"
          fill
          className="object-cover rounded-t-xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>

    <div className="h-[50%] px-5 py-4 flex flex-col justify-between bg-gradient-to-b from-white to-gray-100">
      <h3 className="text-lg font-semibold truncate mb-1">
        {salons.salon_name}
      </h3>

      <Tooltip title={salons.address}>
        <p className="text-sm text-gray-600 mb-1">{salons.address}</p>
      </Tooltip>

      {salons.openingHour && salons.closingHour ? (
        <span className="text-[8px] sm:text-xs bg-green-100 text-green-700 px-2 sm:px-4 py-0.5 sm:py-1 rounded-full w-fit mb-1 border border-green-300">
          {salons.openingHour}am - {salons.closingHour}pm
        </span>
      ) : (
        <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full w-fit border border-red-300">
          24/7 Available
        </span>
      )}
      <Tooltip title={salons.about}>
        <p className="text-xs text-gray-500 line-clamp-2 md:line-clamp-3 lg:line-clamp-4 mt-2">
          {salons.about}
        </p>
      </Tooltip>
    </div>
  </div>
);

interface SalonCardsProps {
  title?: string;
  showButton?: boolean;
  className?: string;
  salonsProp?: Salon[];
  titleHref?: string;
  viewMoreHref?: string;
}

const SalonCards: React.FC<SalonCardsProps> = ({
  title = "Featured Salons",
  showButton = false,
  className = "",
  salonsProp,
  titleHref = "/salons",
  viewMoreHref = "/salons/all_salons",
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [salons, setSalons] = useState<Salon[]>(salonsProp || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (salonsProp && salonsProp.length > 0) {
      setLoading(false);
      return;
    }

    const fetchSalons = async () => {
      try {
        const result = await dispatch(getAllSalons(1)).unwrap();
        setSalons(result.salons);
      } catch {
        setError("Failed to load salons");
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, [dispatch, salonsProp]);

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

  const formatTime = (timeStr: any) => {
    const [hourStr, minute = "00"] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const suffix = isPM ? "pm" : "am";
    return `${formattedHour}:${minute} ${suffix}`;
  };

  const handleViewMore = () => router.push(viewMoreHref);
  const handleSalonClick = (
    salonId: number,
    salon_name: string,
    openingHour: string,
    closingHour: string,
    address: string
  ) => {
    let city = "unknown";
    if (address) {
      const parts = address.split(",");
      city = parts[parts.length - 1].replace(/[.]/g, "").trim();
    }

    const rawCity = extractCityFromAddress(address);
    const citySlug = formatSlug(sanitizeSlug(rawCity));
    const salonSlug = formatSlug(sanitizeSlug(salon_name));
    const openingSlug = formatSlug(sanitizeSlug(openingHour));
    const closingSlug = formatSlug(sanitizeSlug(closingHour));

    router.push(
      `/salons/${citySlug}/${salonSlug}?salonId=${salonId}&openingHour=${openingSlug}&closingHour=${closingSlug}`
    );
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading salons...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className={`w-full max-w-[82rem] px-4 md:px-1 mx-auto py-0 md:py-10 ${className}`}
    >
      <Link href={titleHref} className="block">
        <h2 className="text-2xl sm:text-2xl md:text-3xl font-semibold mb-8">
          {title}
        </h2>
      </Link>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {salons
          .slice(0, isSmallScreen ? salons.length : cardsToShow)
          .map((salon) => (
            <SalonCard
              key={salon._id}
              salons={salon}
              onClick={() =>
                handleSalonClick(
                  salon._id,
                  salon.salon_name,
                  formatTime(salon.openingHour),
                  formatTime(salon.closingHour),
                  salon.address
                )
              }
            />
          ))}
      </div>

      {showButton && (
        <div className="mt-4 mb-4 text-center">
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
