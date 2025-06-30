"use client";
import HeroImg1 from "@/assets/images/home-hero-img-1.webp";
import HeroImg2 from "@/assets/images/home-hero-img-2.webp";
import AutoSlider from "@/common/auto-slider";

type SlideContent = {
  src: string;
  heading: string;
  buttonText: string;
};

const Hero = () => {
  const slides: SlideContent[] = [
    {
      src: HeroImg1.src,
      heading: "Book Salon Appointments",
      buttonText: "Book Now",
    },
    {
      src: HeroImg2.src,
      heading: "We have handpicked products for you",
      buttonText: "Shop Now",
    },
  ];

  return (
    <div className="w-screen max-w-none overflow-hidden mx-0 px-0">
      
  <AutoSlider srcs={slides.map(slide => slide.src)} />

    </div>
  );
};

export default Hero;
