"use client";
import * as React from "react";
import HeroImg1 from "@/assets/images/home-hero-img-1.webp";
import HeroImg2 from "@/assets/images/home-hero-img-2.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-fade";
import { Poppins } from "next/font/google";

type Props = {
  srcs?: string[];
  type?:
    | "slide"
    | "fade"
    | "cube"
    | "coverflow"
    | "flip"
    | "creative"
    | "cards";
  delay?: number | null;
  onBannerClick?: () => void;
};

const AutoSlider = ({
  srcs = [],
  type = "slide",
  delay = 3000,
  onBannerClick,
}: Props) => {
  const _srcs = srcs.length > 0 ? srcs : [HeroImg1.src, HeroImg2.src];
  const modules = [];
  if (delay) modules.push(Autoplay);
  if (type === "fade") modules.push(EffectFade);

  const overlays: Record<
    string,
    { heading: string[]; buttonText: string; link: string }
  > = {
    [HeroImg1.src]: {
      heading: ["Book Salon Appointments"],
      buttonText: "Book Now",
      link: "/salons",
    },
    [HeroImg2.src]: {
      heading: ["We have handpicked", "products for you"],
      buttonText: "Shop Now",
      link: "/products",
    },
  };

  return (
    <div className="relative w-full max-w-screen-2xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <Swiper
        modules={modules}
        spaceBetween={50}
        slidesPerView={1}
        effect={type}
        autoplay={delay ? { delay: delay as number } : undefined}
        loop={true}
        simulateTouch={false}
        cssMode={false}
        className="w-full"
      >
        {_srcs.map((s, index) => {
          const overlay = overlays[s];

          const isFirstImage = s === HeroImg1.src;
          const isSecondImage = s === HeroImg2.src;

          return (
            <SwiperSlide key={s} className="relative">
              {onBannerClick ? (
                <>
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={s}
                      loading="eager"
                      onClick={onBannerClick}
                      className="w-full h-full cursor-pointer max-xl:object-cover rounded-lg transition-transform duration-500 hover:scale-105 hover:brightness-110"
                      alt="Swiper Carousel component"
                    />
                  </div>
                  {overlay && (
                    <div className="absolute inset-0 px-4 md:px-16 flex justify-start items-start pt-28">
                      <div className="flex flex-col items-start text-left space-y-4 max-w-[80%]">
                        {overlay.heading.map((line, i) => {
                          if (isSecondImage && i === 0) {
                            return (
                              <div
                                key={i}
                                className="font-bold break-words text-3xl md:text-5xl text-green-500"
                              >
                                We have{" "}
                                <span className="text-white">handpicked</span>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={i}
                              className={`text-3xl md:text-5xl font-bold ${
                                isFirstImage ? "text-black" : "text-green-500"
                              }`}
                            >
                              {line}
                            </div>
                          );
                        })}
                        <button
                          className={`px-6 py-2 rounded hover:brightness-90 transition ${
                            isFirstImage
                              ? "bg-purple-600 text-white"
                              : "bg-green-600 text-white"
                          }`}
                        >
                          {overlay.buttonText}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href={
                      overlay?.link || (index === 0 ? "/salons" : "/products")
                    }
                  >
                    <img
                      src={s}
                      className="w-full h-full object-fill rounded-lg transition-transform duration-500 hover:scale-105 hover:brightness-110"
                      alt="Swiper Carousel component"
                    />
                  </Link>
                  {overlay && (
                    <div className="absolute inset-0 px-2 sm:px-4 md:px-16 flex justify-start items-start pt-16 sm:pt-20 md:pt-28 lg:pt-40 pointer-events-none">
                      <div className="flex flex-col items-start text-left space-y-2 sm:space-y-3 md:space-y-4 max-w-[90%] sm:max-w-[85%] md:max-w-[80%] pointer-events-auto">
                        {overlay.heading.map((line, i) => {
                          if (isSecondImage && i === 0) {
                            return (
                              <div
                                key={i}
                                className="font-bold break-words text-xl sm:text-2xl md:text-4xl lg:text-5xl text-green-500"
                              >
                                We have{" "}
                                <span className="text-white">handpicked</span>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={i}
                              className={`font-bold break-words ${
                                isFirstImage ? "text-black" : "text-green-500"
                              } text-xl sm:text-2xl md:text-4xl lg:text-5xl`}
                            >
                              {line}
                            </div>
                          );
                        })}
                        <button
                          className={`px-5 py-2 rounded hover:brightness-90 transition cursor-pointer ${
                            isFirstImage
                              ? "bg-purple-600 text-white"
                              : "bg-green-600 text-white"
                          }`}
                        >
                          {overlay.buttonText}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default AutoSlider;
