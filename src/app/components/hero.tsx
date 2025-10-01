"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import HeroImg1 from "@/assets/images/home-hero-img-1.jpg";
import HeroImg2 from "@/assets/images/home-hero-img-2.jpg";
import Image, { StaticImageData } from "next/image";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

type SlideContent = {
  src: StaticImageData;
  heading?: string;
  buttonText?: string;
};

const Hero = () => {
  const slides: SlideContent[] = [
    { src: HeroImg1 },
    { src: HeroImg2 },
  ];

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
    <div className="w-screen max-w-none overflow-hidden mx-0 px-0">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <Image
              src={slide.src}
              alt={`Hero Slide ${index + 1}`}
              width={1920}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105 hover:brightness-110"
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
