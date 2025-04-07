"use client";
import { screenBreakpoints } from "@/hooks";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const keyframes = `
  @keyframes moveLeftAndBack {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-50px); }
  }
`;

type Props = {
  cards: JSX.Element[];
  shouldAnimate?: boolean;
  className?: string;
};

const CardListWrapper = ({
  cards,
  shouldAnimate = false,
  className,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prevButtonRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.8 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasAnimated, shouldAnimate]);

  return (
    <>
      <style>{keyframes}</style>

      {/* Swiper Slider for small screens */}
      <div className="relative md:hidden mx-auto w-full">
        <div className="relative flex items-center justify-center w-full">
          <Swiper
            modules={[Navigation, Scrollbar]}
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            navigation={{
              nextEl: nextButtonRef.current,
              prevEl: prevButtonRef.current,
            }}
            onBeforeInit={(swiper) => {
              // Attach refs to swiper navigation
              if (swiper.params.navigation) {
                const navigation = swiper.params.navigation as {
                  nextEl: HTMLElement | null;
                  prevEl: HTMLElement | null;
                };
                navigation.nextEl = nextButtonRef.current;
                navigation.prevEl = prevButtonRef.current;
              }
            }}
            scrollbar={{ draggable: true }}
            className="w-full"
          >
            {cards.map((c, i) => (
              <SwiperSlide key={i} className="mx-auto max-sm:w-[80%] sm:w-full">
                {c}
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Navigation Arrows */}
          <div
            ref={prevButtonRef}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full text-black cursor-pointer z-10"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div
            ref={nextButtonRef}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full text-black cursor-pointer z-10"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </div>

      {/* Original Content for larger screens */}
      <div className="relative hidden md:block">
        <Swiper
          modules={[Scrollbar]}
          spaceBetween={30}
          breakpoints={{
            [screenBreakpoints.sm]: { slidesPerView: 1 },
            [screenBreakpoints.md]: { slidesPerView: 2 },
            [screenBreakpoints.lg]: { slidesPerView: 3 },
            [screenBreakpoints.xl]: { slidesPerView: 4 },
            [screenBreakpoints["2xl"]]: { slidesPerView: 5 },
          }}
          className="my-2 w-full md:my-8 flex justify-center"
        >
          {cards.map((c, i) => (
            <SwiperSlide key={i} className="flex justify-center">
              {c}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CardListWrapper;
