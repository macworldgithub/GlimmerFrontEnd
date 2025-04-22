"use client";

import { getSalonById } from "@/api/salon";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
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
    const [hourStr, minute = "00"] = timeStr.split(':');
    let hour = parseInt(hourStr, 10);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const suffix = isPM ? 'pm' : 'am';
    return `${formattedHour}:${minute} ${suffix}`;
  };


  if (loading) return <p>Loading salon details...</p>;
  if (error) return <p>{error}</p>;
  if (!salonData) return <p>No data available for this salon.</p>;

  // Display salon details
  return (
    <>
      <div className=" mb-6 w-[99vw] md:mb-8 p-10">
        <div className="flex flex-col mt-4">
          <div className="flex justify-between items-center">
            <div className="prose">
              <h2 className="text-5xl">{salonData.salon_name || "Glimmer's Saloon"}</h2>
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
                : '(10:00 am'}
            </p>
            <p className="mr-1">
              {salonData.closingHour
                ? ` - ${formatTime(salonData.closingHour)})`
                : ' - 10:00 pm)'}
            </p>
          </div>
        </div>

        {/* Image Grid - Responsive, 2 per row */}
        <div className="hidden md:grid grid-cols-2 gap-2 mt-4">
          {[salonData.image1, salonData.image2, salonData.image3, salonData.image4]
            .filter(Boolean)
            .map((src, index) => (
              <img
                key={index}
                src={src}
                className="w-full h-[275px] object-cover rounded"
                alt={`salon image ${index + 1}`}
              />
            ))}
        </div>

      </div>
      <AboutSalon description={salonData?.about} />
      <SalonServices />
      <RecommendedProducts />
      <SalonsNearby />
      <GlimmerBanner />
    </>
  );
};

export default SalonDetailsPage;
