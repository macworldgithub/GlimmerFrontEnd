"use client";
import * as React from "react";
import HeroImg1 from "@/assets/images/home-hero-img-1.webp";
import HeroImg2 from "@/assets/images/home-hero-img-2.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-fade";

type Props = {
  srcs?: string[];
  type?: "slide" | "fade" | "cube" | "coverflow" | "flip" | "creative" | "cards";
  delay?: number | null;
  onBannerClick?: () => void; // 👈 Add this
};

const AutoSlider = ({ srcs = [], type = "slide", delay = 3000, onBannerClick }: Props) => {
  const _srcs = srcs.length > 0 ? srcs : [HeroImg1.src, HeroImg2.src];
  const modules = [];
  if (delay) modules.push(Autoplay);
  if (type === "fade") modules.push(EffectFade);

  return (
    <div className="relative w-full max-w-screen-2xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <Swiper
        modules={modules}
        spaceBetween={50}
        slidesPerView={1}
        effect={type}
        autoplay={delay ? { delay: delay as number } : undefined}
        loop={true}
        //  simulateTouch={false} 
        cssMode={true}
        className="w-full"
      >
        {_srcs.map((s, index) => (
          <SwiperSlide key={s}>
            {onBannerClick ? (
              // 👇 If onBannerClick is passed (from GymBanner), make image clickable
              <img
                src={s}
                onClick={onBannerClick}
                className="w-full h-full cursor-pointer max-xl:object-cover rounded-lg transition-transform duration-500 hover:scale-105 hover:brightness-110"
                alt="Swiper Carousel component"
              />
            ) : (
              // 👇 Default behavior: clickable image with link
              <Link href={index === 0 ? "/salons" : "/products"}>
                <img
                  src={s}
                  className="w-full h-full max-xl:object-cover rounded-lg transition-transform duration-500 hover:scale-105 hover:brightness-110"
                  alt="Swiper Carousel component"
                />
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AutoSlider;
