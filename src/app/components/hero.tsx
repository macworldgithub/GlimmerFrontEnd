"use client";
import HeroImg1 from "@/assets/images/home-hero-img-1.webp";
import HeroImg2 from "@/assets/images/home-hero-img-2.webp";
import AutoSlider from "@/common/auto-slider";

type Props = {
  srcs?: string[];
};

const Hero = ({ srcs = [] }: Props) => {
  const _srcs = srcs.length > 0 ? srcs : [HeroImg1.src, HeroImg2.src];
  return (
    <div className="w-screen max-w-none overflow-hidden mx-0 px-0">
      <AutoSlider srcs={_srcs} />
    </div>
  );
};

export default Hero;
