// HairBanner.tsx
"use client";
import * as React from "react";
import Image from "next/image";
import GymBanner1 from "@/assets/images/bottom-slider-img-2.webp";
import { StaticImageData } from "next/image";

type Props = {
  srcs?: StaticImageData[];
};

const HairBanner = ({ srcs = [] }: Props) => {
  const _srcs = srcs.length > 0 ? srcs : [GymBanner1];

  return (
    <div className="lg:px-[6rem] max-lg:px-[1rem] mb-6 mx-auto md:mb-14 relative aspect-[1920/600]">
      <Image
        src={_srcs[0]}
        alt="Hair banner"
        fill
        sizes="(max-width: 768px) 768px, 1920px"
        placeholder="blur"
        className="object-cover rounded-lg"
      />
    </div>
  );
};

export default HairBanner;