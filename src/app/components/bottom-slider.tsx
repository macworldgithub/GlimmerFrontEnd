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
              <div className="absolute top-[10%] sm:top-[14%] md:top-[18%] lg:top-[25%] left-4 sm:left-8 lg:left-[10%] max-w-[90%] sm:max-w-[80%] lg:max-w-[50%] flex flex-col items-start gap-2 sm:gap-3 lg:gap-6 z-10">
                <div className="text-purple-800 font-bold text-[14px] sm:text-base md:text-xl lg:text-5xl leading-snug">
               
                  <br />
               
                </div>
                <div className="text-purple-700 text-[12px] sm:text-sm md:text-base lg:text-2xl">
                
                </div>
                {/* <button className="bg-purple-800 text-white px-4 py-1.5 sm:px-6 sm:py-2 lg:px-8 lg:py-3 rounded-full text-xs sm:text-sm md:text-base lg:text-lg hover:bg-purple-900 transition">
                  Shop Now
                </button> */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomSlider;
