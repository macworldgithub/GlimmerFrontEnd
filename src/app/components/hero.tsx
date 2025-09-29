"use client";
import HeroImg1 from "@/assets/images/home-hero-img-1.webp";
import HeroImg2 from "@/assets/images/home-hero-img-2.webp";
import AutoSlider from "@/common/auto-slider";
import type { StaticImageData } from "next/image";

type SlideContent = {
  src: StaticImageData; // store static import object
  heading: string;
  buttonText: string;
};

const Hero = () => {
  const slides: SlideContent[] = [
    {
      src: HeroImg1,
      heading: "",
      buttonText: "",
    },
    {
      src: HeroImg2,
      heading: "",
      buttonText: "",
    },
  ];

  return (
    <div className="w-screen max-w-none overflow-hidden mx-0 px-0">
      <AutoSlider srcs={slides.map((slide) => slide.src)} />
    </div>
  );
};

export default Hero;
