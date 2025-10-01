"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import exclusiveOffer from "@/assets/images/exclusive-offer-img.png";
import Image, { StaticImageData } from "next/image";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

type Props = {
  srcs?: StaticImageData[];
};

const Hero = ({ srcs = [] }: Props) => {
  const banners = srcs.length > 0 ? srcs : [exclusiveOffer];

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
    <div className="mb-6 md:mb-14">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="relative">
            <Image
              src={banner}
              alt={`Hero Banner ${index + 1}`}
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
    </div>
  );
};

export default Hero;
