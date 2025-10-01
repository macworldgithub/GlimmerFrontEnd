"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import glimmerBannerImg from "@/assets/salon-profile/Glimmer-Banner-img.png";
import Image, { StaticImageData } from "next/image";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

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
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: false,
    adaptiveHeight: true,
  };

  return (
    <div className="w-full flex justify-center items-center px-4 md:px-10 md:mb-14 pb-10 mx-auto">
      <div className="max-w-[1300px] w-full">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="relative aspect-[16/5] w-full">
              <Image
                src={banner}
                alt={`Glimmer Banner ${index + 1}`}
                fill
                className="object-cover rounded-lg transition-transform duration-500 hover:scale-105 hover:brightness-110"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1920px"
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
