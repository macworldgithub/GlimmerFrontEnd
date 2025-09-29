// AutoSlider.tsx
"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import HeroImg1 from "@/assets/images/home-hero-img-1.webp";
import HeroImg2 from "@/assets/images/home-hero-img-2.webp";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import("swiper/react").then((mod) => mod.SwiperSlide), { ssr: false });
import { Autoplay } from "swiper/modules";

type Props = {
  srcs?: StaticImageData[];
  delay?: number | null;
  onBannerClick?: () => void;
};

const AutoSlider = ({ srcs = [], delay = 3000, onBannerClick }: Props) => {
  const _srcs = srcs.length > 0 ? srcs : [HeroImg1, HeroImg2];

  return (
    <div className="relative w-full max-w-screen-2xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={delay ? { delay: delay as number, disableOnInteraction: false } : undefined}
        loop
        simulateTouch={false}
        lazyPreloadPrevNext={1}
        className="w-full aspect-[1920/600]"
      >
        {_srcs.map((image, index) => (
          <SwiperSlide key={image.src} className="relative aspect-[1920/600]">
            {onBannerClick ? (
              <div className="w-full h-full overflow-hidden">
                <Image
                  src={image}
                  alt="Promotional carousel banner"
                  fill
                  sizes="(max-width: 768px) 768px, 1920px"
                  priority={index === 0}
                  placeholder="blur"
                  className="object-cover rounded-lg"
                  onClick={onBannerClick}
                />
              </div>
            ) : (
              <Link href={index === 0 ? "/salons" : "/products"}>
                <Image
                  src={image}
                  alt="Promotional carousel banner"
                  fill
                  sizes="(max-width: 768px) 768px, 1920px"
                  priority={index === 0}
                  placeholder="blur"
                  className="object-cover rounded-lg"
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