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

  // Custom slides with optional click handlers
  const customSlides: Slide[] =
    srcs.length > 0
      ? srcs.map((s) => ({ src: s }))
      : [
          {
            src: BottomSliderImg1.src,
            onClick: () => router.push("/products"), // ✅ only this image routes
          },
        
        ];

  return (
    <div className="lg:px-[6rem] max-lg:px-[1rem] mb-6 md:mb-14 w-[99vw]">
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        {customSlides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-auto cursor-pointer transition-transform duration-300"
            onClick={slide.onClick}
          >
            <img
              src={slide.src}
              alt={`slider-${index}`}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomSlider;
