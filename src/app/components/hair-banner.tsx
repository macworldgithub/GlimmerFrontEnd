"use client";
import * as React from "react";
import GymBanner1 from "@/assets/images/bottom-slider-img-2.webp";
import AutoSlider from "@/common/auto-slider";
type Props = {
  srcs?: string[];
};

const HairBanner = ({ srcs = [] }: Props) => {
  const _srcs = srcs.length > 0 ? srcs : [GymBanner1.src];

  return (
    <div className="lg:px-[6rem] max-lg:px-[1rem] mb-6 mx-auto md:mb-14 ">
      <AutoSlider delay={null} srcs={_srcs} />
    </div>
  );
};

export default HairBanner;
