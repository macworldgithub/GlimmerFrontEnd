"use client";
import * as React from "react";
import Slider from "react-slick";
import GymBanner1 from "@/assets/images/gym-banner.webp";
import RegisterGymModal from "@/common/RegisterGymModal";
import Image from "next/image";

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
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  };

  const banners = [GymBanner1]; // You can add more images here

  return (
    <div className="lg:px-[6rem] max-lg:px-[1rem] mb-6 md:mb-14 w-[99vw]">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} onClick={handleOpen} className="cursor-pointer">
            <Image
              src={banner}
              alt={`Banner ${index + 1}`}
              width={1920}
              height={600}
              className="w-full h-full object-cover rounded-lg transition-transform duration-500 hover:scale-105 hover:brightness-110"
              priority={index === 0}
              placeholder="blur"
            />
          </div>
        ))}
      </Slider>

      <RegisterGymModal visible={visible} onCancel={handleClose} onSubmit={() => {}} />
    </div>
  );
};

export default GymBanner;
