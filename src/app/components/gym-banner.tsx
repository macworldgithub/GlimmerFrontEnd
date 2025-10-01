"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import GymBanner1 from "@/assets/images/gym-banner.jpg";
import RegisterGymModal from "@/common/RegisterGymModal";
import Image from "next/image";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const GymBanner = () => {
  const [visible, setVisible] = React.useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: false,
    adaptiveHeight: true,
  };

  const banners = [GymBanner1];

  return (
    <div className="lg:px-[6rem] max-lg:px-[1rem] mb-6 md:mb-14 w-[99vw]">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div
            key={index}
            onClick={handleOpen}
            className="cursor-pointer relative"
          >
            <Image
              src={banner}
              alt={`Banner ${index + 1}`}
              width={1920}
              height={600}
              className="w-full h-auto object-cover rounded-lg transition-transform duration-500 hover:scale-105 hover:brightness-110"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1920px"
              placeholder="blur"
            />
          </div>
        ))}
      </Slider>

      <RegisterGymModal
        visible={visible}
        onCancel={handleClose}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default GymBanner;
