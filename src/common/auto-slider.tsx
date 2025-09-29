"use client";
import * as React from "react";
import HeroImg1 from "@/assets/images/home-hero-img-1.webp";
import HeroImg2 from "@/assets/images/home-hero-img-2.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-fade";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";

type Props = {
  srcs?: StaticImageData[]; // static imports
  type?: "slide" | "fade" | "cube" | "coverflow" | "flip" | "creative" | "cards";
  delay?: number | null;
  onBannerClick?: () => void;
};

const AutoSlider = ({
  srcs = [],
  type = "slide",
  delay = 3000,
  onBannerClick,
}: Props) => {
  const router = useRouter();
  const _srcs = srcs.length > 0 ? srcs : [HeroImg1, HeroImg2];

  const modules = [];
  if (delay) modules.push(Autoplay);
  if (type === "fade") modules.push(EffectFade);

  // Example overlay content
  const overlays: Record<string, { heading: string[]; buttonText: string; link: string }> = {
    [HeroImg1.src]: { heading: [""], buttonText: "", link: "/salons" },
    [HeroImg2.src]: { heading: [""], buttonText: "", link: "/products" },
  };

  return (
    <div className="relative w-full max-w-screen-2xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <Swiper
        modules={modules}
        spaceBetween={50}
        slidesPerView={1}
        effect={type}
        autoplay={delay ? { delay: delay as number } : undefined}
        loop
        simulateTouch={false}
        className="w-full"
      >
        {_srcs.map((image, index) => {
          const overlay = overlays[image.src];
          const isFirstSlide = index === 0;

          return (
            <SwiperSlide key={image.src} className="relative">
              {onBannerClick ? (
                <div className="w-full h-full overflow-hidden">
                  <Image
                    src={image}                        // static import
                    alt="Promotional carousel banner"
                    width={1920}
                    height={600}
                    priority={index === 0}
                    sizes="100vw"
                    placeholder="blur"                  // works with static import
                    className="w-full h-full cursor-pointer max-xl:object-cover rounded-lg transition-transform duration-500 hover:scale-105 hover:brightness-110"
                    onClick={onBannerClick}
                  />
                </div>
              ) : (
                <Link href={overlay?.link || (index === 0 ? "/salons" : "/products")}>
                  <Image
                    src={image}                        // static import
                    alt="Promotional carousel banner"
                    width={1920}
                    height={600}
                    priority={index === 0}
                    sizes="100vw"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-500 hover:scale-105 hover:brightness-110"
                 // works with static import
                  />
                </Link>
              )}

              {overlay && (
                <div className="absolute inset-0 px-2 sm:px-4 md:px-16 flex justify-start items-start pt-16 sm:pt-20 md:pt-28 lg:pt-40 pointer-events-none">
                  <div className="flex flex-col items-start text-left space-y-2 sm:space-y-3 md:space-y-4 max-w-[90%] sm:max-w-[85%] md:max-w-[80%] pointer-events-auto">
                    {overlay.heading.map((line, i) => (
                      <div
                        key={i}
                        className={`font-bold break-words ${
                          isFirstSlide ? "text-black" : "text-green-500"
                        } text-xl sm:text-2xl md:text-4xl lg:text-5xl`}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default AutoSlider;