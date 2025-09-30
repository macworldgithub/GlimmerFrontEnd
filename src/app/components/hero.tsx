"use client";
import * as React from "react";
import Slider from "react-slick";
import HeroImg1 from "@/assets/images/home-hero-img-1.webp";
import HeroImg2 from "@/assets/images/home-hero-img-2.webp";
import Image, { StaticImageData } from "next/image";

type SlideContent = {
  src: StaticImageData;
  heading?: string;
  buttonText?: string;
};

const Hero = () => {
  const slides: SlideContent[] = [
    { src: HeroImg1, heading: "", buttonText: "" },
    { src: HeroImg2, heading: "", buttonText: "" },
  ];

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
    <div className="w-screen max-w-none overflow-hidden mx-0 px-0">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <Image
              src={slide.src}
              alt={`Hero Slide ${index + 1}`}
              width={1920}
              height={600}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 hover:brightness-110"
              priority={index === 0}
              placeholder="blur"
            />
            {slide.heading && (
              <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-white pointer-events-none">
                <h2 className="text-4xl font-bold">{slide.heading}</h2>
                {slide.buttonText && (
                  <button className="mt-4 px-6 py-2 bg-green-500 rounded-lg">
                    {slide.buttonText}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
