// Hero.tsx
"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeroImg1 from "@/assets/selfcare-slider/selfcare-slider-1.png";
import { StaticImageData } from "next/image";

type Props = {
  srcs?: StaticImageData[];
};

const Hero = ({ srcs = [] }: Props) => {
  const router = useRouter();
  const _srcs = srcs.length > 0 ? srcs : [HeroImg1];

  const handleBannerClick = () => {
    router.push("/products");
  };

  return (
    <div className="w-screen overflow-x-hidden relative aspect-[1920/600]">
      <Image
        src={_srcs[0]}
        alt="Hero banner"
        fill
        sizes="(max-width: 768px) 768px, 1920px"
        priority
        placeholder="blur"
        className="object-cover"
        onClick={handleBannerClick}
      />
    </div>
  );
};

export default Hero;