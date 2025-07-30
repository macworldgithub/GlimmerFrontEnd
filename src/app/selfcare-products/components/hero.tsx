"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import HeroImg1 from "@/assets/selfcare-slider/selfcare-slider-1.png";
import HeroImg2 from "@/assets/selfcare-slider/selfcare-slider-2.png";
// import HeroImg3 from "@/assets/selfcare-slider/selfcare-slider-3.png";
import AutoSlider from "@/common/auto-slider";

type Props = {
  srcs?: string[];
};

const Hero = ({ srcs = [] }: Props) => {
  const router = useRouter();

  const _srcs =
    srcs.length > 0 ? srcs : [HeroImg1.src, HeroImg2.src];

  // Custom function to be passed only for first banner
  const handleFirstBannerClick = () => {
    router.push("/products");
  };

  return (
    <div className="w-screen overflow-x-hidden">
      {/* Only pass onBannerClick when first image is shown */}
      <AutoSlider
        srcs={_srcs}
        onBannerClick={
          _srcs[0] === HeroImg1.src ? handleFirstBannerClick : undefined
        }
      />
    </div>
  );
};

export default Hero;
