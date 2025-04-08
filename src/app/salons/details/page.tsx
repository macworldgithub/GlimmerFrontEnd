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
              <h2 className="text-4xl">{salonData.salon_name || "Glimmer's Saloon"}</h2>
            </div>
            <div>
              <MdOutlineIosShare size={30} />
            </div>
          </div>

          <div className="flex flex-row items-center mb-3 text-2xl">
            <p className="mr-1">5.0</p>
            <div className="flex flex-row mr-1">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar key={index} className="p-0 m-0" />
              ))}
            </div>
            <BsFillCircleFill className="mx-3" size={10} />
            <p className="mr-1">{"Mon-Fri"}</p>
            <p className="mr-1">
              {`(${salonData.openingHour} am` || "(10:00 am"}
            </p>
            <p className="mr-1">
              {` - ${salonData.closingHour} pm)` || "10:00 pm)"}
            </p>
          </div>
        </div>

        {/* Grid for larger screens */}
        <div className="hidden md:grid grid-cols-10 gap-4">
          {/* Left Column */}
          <div className={`col-span-4 grid gap-2 ${[salonData.image1, salonData.image2].filter(Boolean).length === 2 ? 'grid-rows-2' : 'grid-rows-1'}`}>
            {salonData.image1 && (
              <img
                src={salonData.image1}
                className="w-full h-[100px] md:h-full object-cover rounded-none"
                alt="left img 1"
              />
            )}
            {salonData.image2 && (
              <img
                src={salonData.image2}
                className="w-full h-[175px] md:h-full object-cover rounded-none"
                alt="left img 2"
              />
            )}
          </div>

          {/* Right Column */}
          <div className={`col-span-4 grid gap-2 ${[salonData.image3, salonData.image4].filter(Boolean).length === 2 ? 'grid-rows-2' : 'grid-rows-1'}`}>
            {salonData.image3 && (
              <img
                src={salonData.image3}
                className="w-full h-[175px] md:h-full object-cover rounded-none"
                alt="right img 3"
              />
            )}
            {salonData.image4 && (
              <img
                src={salonData.image4}
                className="w-full h-[175px] md:h-full object-cover rounded-none"
                alt="right img 4"
              />
            )}
          </div>
        </div>
      </div>
      <SalonServices />
      <AboutSalon description={salonData?.about} />
      <RecommendedProducts />
      <SalonsNearby />
      <GlimmerBanner />
    </>
  );
};

export default SalonDetailsPage;
