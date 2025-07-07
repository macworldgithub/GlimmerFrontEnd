"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MdOutlineIosShare } from "react-icons/md";
import { getSalonById } from "@/api/salon";
import AboutSalon from "../[id]/components/about-salon";
import GlimmerBanner from "../[id]/components/glimmer-banner";
import RecommendedProducts from "../[id]/components/recommended-products";
import SalonServices from "../[id]/components/salon-services";
import SalonsNearby from "../[id]/components/salons-nearby";

const SalonDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("salonId");

  const [salonData, setSalonData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (id) {
      const fetchSalonData = async () => {
        try {
          const data = await getSalonById(id as string);
          setSalonData(data);
        } catch (error) {
          setError("Failed to load salon details");
        } finally {
          setLoading(false);
        }
      };
      fetchSalonData();
    }
  }, [id]);

  const formatTime = (timeStr: any) => {
    const [hourStr, minute = "00"] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const suffix = isPM ? "pm" : "am";
    return `${formattedHour}:${minute} ${suffix}`;
  };

  const images = [
    salonData?.image1,
    salonData?.image2,
    salonData?.image3,
    salonData?.image4,
  ].filter(Boolean);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Loading salon details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!salonData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No data available for this salon.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 w-[99vw] md:mb-8 pt-0 pb-10 px-10">
        <div className="flex flex-col mt-0">
          <div className="flex justify-between items-center">
            <div className="prose">
              <h2 className="text-5xl">
                {salonData.salon_name || "Glimmer's Saloon"}
              </h2>
            </div>
            <div>
              <MdOutlineIosShare size={30} />
            </div>
          </div>

          <div className="flex flex-row items-center mb-3 text-2xl">
            <p className="mr-1">{"Mon-Fri"}</p>
            <p className="mr-1">
              {salonData.openingHour
                ? `(${formatTime(salonData.openingHour)}`
                : "(10:00 am"}
            </p>
            <p className="mr-1">
              {salonData.closingHour
                ? ` - ${formatTime(salonData.closingHour)})`
                : " - 10:00 pm)"}
            </p>
          </div>
        </div>

        {/* ✅ Top Image Display */}
        <div className="mt-6 mb-8 max-w-screen-xl mx-auto px-4">
          {images.length > 0 && (
            <div
              className="w-full h-[65vh] overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer"
              onClick={() => setSelectedImageIndex(currentImageIndex)}
            >
              <img
                src={images[currentImageIndex]}
                alt="Selected Salon Image"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}

          {/* ✅ View More Button */}
          {!showAllImages && images.length > 1 && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAllImages(true)}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
              >
                View More
              </button>
            </div>
          )}

          {showAllImages && images.length > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex gap-4 overflow-x-auto w-full px-2 scrollbar-hide">
                {images.map((src, index) => (
                  <div
                    key={index}
                    className={`w-[70vw] sm:w-[200px] h-[40vw] sm:h-[140px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 cursor-pointer border-2 ${
                      currentImageIndex === index
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index); // ✅ change top image
                    }}
                  >
                    <img
                      src={src}
                      alt={`salon image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Fullscreen Modal (only top image opens this) */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute left-4 text-white text-6xl font-bold select-none"
              onClick={(e) => {
                e.stopPropagation();
                if (selectedImageIndex > 0) {
                  setSelectedImageIndex(selectedImageIndex - 1);
                  setCurrentImageIndex(selectedImageIndex - 1);
                }
              }}
              disabled={selectedImageIndex === 0}
            >
              ‹
            </button>

            <img
              src={images[selectedImageIndex]}
              alt="Fullscreen"
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-4 text-white text-6xl font-bold select-none"
              onClick={(e) => {
                e.stopPropagation();
                if (selectedImageIndex < images.length - 1) {
                  setSelectedImageIndex(selectedImageIndex + 1);
                  setCurrentImageIndex(selectedImageIndex + 1);
                }
              }}
              disabled={selectedImageIndex === images.length - 1}
            >
              ›
            </button>

            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 text-white text-4xl bg-black bg-opacity-50 rounded-full px-3"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* ✅ Other Sections */}
      <AboutSalon description={salonData?.about} />
      <SalonServices />
      <RecommendedProducts />
      <SalonsNearby />
      <GlimmerBanner />
    </>
  );
};

export default SalonDetailsPage;
