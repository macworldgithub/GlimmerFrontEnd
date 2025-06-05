"use client";
import * as React from "react";
import glimmerBannerImg from "@/assets/salon-profile/Glimmer-Banner-img.png";
import AutoSlider from "@/common/auto-slider";

type Props = {
  srcs?: string[];
};

const GlimmerBanner = ({ srcs = [] }: Props) => {
  const _srcs = srcs.length > 0 ? srcs : [glimmerBannerImg.src];

  return (
    <div className="w-[125%] px-4 md:px-10 md:mb-14 flex justify-center pb-10">
      <div className="max-w-[1300px] w-[100%]">
        <AutoSlider srcs={_srcs} />
      </div>
    </div>
  );
};

export default GlimmerBanner;
