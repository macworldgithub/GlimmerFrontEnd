"use client";
import * as React from "react";
import Slider from "react-slick";
import GymBanner1 from "@/assets/images/bottom-slider-img-2.jpg";
import Image, { StaticImageData } from "next/image";

type Props = {
  srcs?: StaticImageData[];
};

const HairBanner = ({ srcs = [] }: Props) => {
  const banners = srcs.length > 0 ? srcs : [GymBanner1];

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

  return (
    <div className="lg:px-[6rem] max-lg:px-[1rem] mb-6 mx-auto md:mb-14">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
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
    </div>
  );
};

export default HairBanner;
