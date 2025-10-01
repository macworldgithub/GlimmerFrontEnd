"use client";
import * as React from "react";
import { useKeenSlider } from "keen-slider/react";
import Image, { StaticImageData } from "next/image";

import HeroImg1 from "@/assets/images/home-hero-img-1.jpg";
import HeroImg2 from "@/assets/images/home-hero-img-2.jpg";

type SlideContent = {
  src: StaticImageData;
  heading?: string;
  buttonText?: string;
};

const Hero = () => {
  const slides: SlideContent[] = [
    { src: HeroImg1, heading: "Slide 1 Heading", buttonText: "Learn More" },
    { src: HeroImg2, heading: "Slide 2 Heading", buttonText: "Get Started" },
  ];

  // Autoplay plugin
  const autoplay = (slider: any) => {
    let timeout: NodeJS.Timeout;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }
    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, 3000);
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 1,
      },
    },
    [autoplay]
  );

  return (
    <div ref={sliderRef} className="keen-slider w-screen h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div key={index} className="keen-slider__slide relative">
          <Image
            src={slide.src}
            alt={`Hero Slide ${index + 1}`}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-500 hover:scale-105 hover:brightness-110"
            priority={index === 0}
            placeholder="blur"
          />
          {slide.heading && (
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-white">
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
    </div>
  );
};

export default Hero;
