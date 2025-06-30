"use client";
import * as React from "react";
import BottomSliderImg1 from "@/assets/images/bottom-slider-img-1.webp";
import BottomSliderImg12 from "@/assets/images/bottom-slider-img-2.webp";
import { useRouter } from "next/navigation";

type Slide = {
  src: string;
  onClick?: () => void;
};

type Props = {
  srcs?: string[];
};

const BottomSlider = ({ srcs = [] }: Props) => {
  const router = useRouter();

  const customSlides: Slide[] =
    srcs.length > 0
      ? srcs.map((s) => ({ src: s }))
      : [
          {
            src: BottomSliderImg1.src,
            onClick: () => router.push("/products"),
          },
        ];

  return (
    <div className="lg:px-[6rem] max-lg:px-[1rem] mb-6 md:mb-14 w-[99vw]">
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        {customSlides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-auto cursor-pointer transition-transform duration-300 relative"
            onClick={slide.onClick}
          >
            <img
              src={slide.src}
              alt={`slider-${index}`}
              className="w-full object-cover"
            />
            {index === 0 && (
              <div className="absolute top-[15%] left-[5%] sm:top-[18%] sm:left-[7%] md:top-[25%] md:left-[10%] max-w-[90%] sm:max-w-[80%] md:max-w-[50%] flex flex-col items-start gap-3 sm:gap-4 md:gap-6 z-10">
                <div className="text-purple-800 font-bold text-2xl sm:text-3xl md:text-5xl leading-snug">
                  Reliable delivery
                  <br />
                  at your finger tips
                </div>
                <div className="text-purple-700 text-base sm:text-lg md:text-2xl">
                  Order now, Enjoy soon...
                </div>
                <button className="bg-purple-800 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base md:text-lg hover:bg-purple-900 transition">
                  Shop Now
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomSlider;
