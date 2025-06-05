"use client";
import * as React from "react";
import HeroImg1 from "@/assets/selfcare-slider/selfcare-slider-1.png";
import HeroImg2 from "@/assets/selfcare-slider/selfcare-slider-2.png";
import HeroImg3 from "@/assets/selfcare-slider/selfcare-slider-3.png";
import AutoSlider from "@/common/auto-slider";

type Props = {
  srcs?: string[];
};

const Hero = ({ srcs = [] }: Props) => {
  const _srcs =
    srcs.length > 0 ? srcs : [HeroImg1.src, HeroImg2.src, HeroImg3.src];

  return (
    <div className="flex justify-center w-[120%] px-4 md:px-0 mx-auto">
      <div className="w-[100%] max-w-5xl">
        <AutoSlider srcs={_srcs} />
      </div>
    </div>
  );
};

export default Hero;
