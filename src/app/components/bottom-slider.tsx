"use client";
import * as React from "react";
import BottomSliderImg1 from "@/assets/images/bottom-slider-img-1.webp";
import BottomSliderImg12 from "@/assets/images/bottom-slider-img-2.webp";
import AutoSlider from "@/common/auto-slider";
type Props = {
  srcs?: string[];
};
const BottomSlider = ({ srcs = [] }: Props) => {
  const _srcs =
    srcs.length > 0 ? srcs : [BottomSliderImg1.src, BottomSliderImg12.src];

  return (
    <div className="lg:px-[6rem] max-lg:px-[1rem] mb-6 md:mb-14  w-[99vw]">
      <AutoSlider type="fade" delay={2000} srcs={_srcs} />
    </div>
  );
};

export default BottomSlider;
