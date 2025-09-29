"use client";
import * as React from "react";
import glimmerBannerImg from "@/assets/salon-profile/Glimmer-Banner-img.png";
import AutoSlider from "@/common/auto-slider";
import { StaticImageData } from "next/image";

type Props = {
  srcs?: StaticImageData[];
};

const GlimmerBanner = ({ srcs = [] }: Props) => {
  const _srcs = srcs.length > 0 ? srcs : [glimmerBannerImg];

  return (
    <div className="w-full flex justify-center items-center px-4 md:px-10 md:mb-14 pb-10 mx-auto">
      <div className="max-w-[1300px] w-[100%] ">
        <AutoSlider srcs={_srcs} />
      </div>
    </div>
  );
};

export default GlimmerBanner;
