"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import HeroImg1 from "@/assets/selfcare-slider/selfcare-slider-1.png";
import HeroImg2 from "@/assets/selfcare-slider/selfcare-slider-2.png";
import Image, { StaticImageData } from "next/image";

type Props = {
  srcs?: StaticImageData[];
};

const Hero = ({ srcs = [] }: Props) => {
  const router = useRouter();
  const banners = srcs.length > 0 ? srcs : [HeroImg1, HeroImg2];

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

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

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [autoplay]
  );

  return (
    <div className="w-screen overflow-x-hidden">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {banners.map((banner, index) => (
          <div
            key={index}
            className="keen-slider__slide relative cursor-pointer"
            onClick={index === 0 ? () => router.push("/products") : undefined}
          >
            <Image
              src={banner}
              alt={`Hero Banner ${index + 1}`}
              fill
              sizes="100vw"
              className="object-cover w-full h-[600px] transition-transform duration-500 hover:scale-105 hover:brightness-110"
              priority={index === 0}
              placeholder="blur"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      {loaded && instanceRef.current && (
        <div className="flex justify-center mt-4 gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === idx ? "bg-green-500 scale-110" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
