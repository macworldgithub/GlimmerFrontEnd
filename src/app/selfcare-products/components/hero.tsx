"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import HeroImg1 from "@/assets/selfcare-slider/selfcare-slider-1.png";
import HeroImg2 from "@/assets/selfcare-slider/selfcare-slider-2.png";
import Image, { StaticImageData } from "next/image";

type Props = {
  srcs?: StaticImageData[];
};

const Hero = ({ srcs = [] }: Props) => {
  const router = useRouter();

  const banners = srcs.length > 0 ? srcs : [HeroImg1, HeroImg2];

  const handleFirstBannerClick = () => {
    router.push("/products");
  };

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
    <div className="w-screen overflow-x-hidden">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={index === 0 ? handleFirstBannerClick : undefined}
          >
            <Image
              src={banner}
              alt={`Hero Banner ${index + 1}`}
              width={1920}
              height={600}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 hover:brightness-110"
              priority={index === 0}
              placeholder="blur"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
