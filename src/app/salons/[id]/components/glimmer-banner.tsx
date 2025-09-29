// GlimmerBanner.tsx
"use client";
import * as React from "react";
import Image from "next/image";
import glimmerBannerImg from "@/assets/salon-profile/Glimmer-Banner-img.png";
import { StaticImageData } from "next/image";

type Props = {
  srcs?: StaticImageData[];
};

const GlimmerBanner = ({ srcs = [] }: Props) => {
  const _srcs = srcs.length > 0 ? srcs : [glimmerBannerImg];

  return (
    <div className="w-full flex justify-center items-center px-4 md:px-10 md:mb-14 pb-10 mx-auto">
      <div className="max-w-[1300px] w-[100%] relative aspect-[1920/600]">
        <Image
          src={_srcs[0]}
          alt="Glimmer banner"
          fill
          sizes="(max-width: 768px) 768px, 1300px"
          placeholder="blur"
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default GlimmerBanner;