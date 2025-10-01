"use client";
import * as React from "react";
import Slider from "react-slick";
import glimmerBannerImg from "@/assets/salon-profile/Glimmer-Banner-img.png";
import Image, { StaticImageData } from "next/image";

type Props = {
  srcs?: StaticImageData[];
};

const GlimmerBanner = ({ srcs = [] }: Props) => {
  const banners = srcs.length > 0 ? srcs : [glimmerBannerImg];

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
    <div className="w-full flex justify-center items-center px-4 md:px-10 md:mb-14 pb-10 mx-auto">
      <div className="max-w-[1300px] w-full">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="relative">
              <Image
                src={banner}
                alt={`Glimmer Banner ${index + 1}`}
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
    </div>
  );
};

export default GlimmerBanner;
