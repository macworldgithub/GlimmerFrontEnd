"use client";
import * as React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import GymBanner1 from "@/assets/images/gym-banner.jpg";
import RegisterGymModal from "@/common/RegisterGymModal";
import Image from "next/image";

const GymBanner = () => {
  const [visible, setVisible] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  const banners = [GymBanner1]; // Add more images if needed

  // Autoplay plugin
  const autoplay = (slider: any) => {
    let timeout: NodeJS.Timeout;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }
    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, 3000);
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [autoplay]
  );

  return (
    <div className="lg:px-[6rem] max-lg:px-[1rem] mb-6 md:mb-14 w-[99vw]">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className="keen-slider__slide cursor-pointer relative"
            onClick={() => setVisible(true)}
          >
            <Image
              src={banner}
              alt={`Banner ${index + 1}`}
              fill
              sizes="100vw"
              className="object-cover w-full h-full rounded-lg transition-transform duration-500 hover:scale-105 hover:brightness-110"
              priority={index === 0}
              placeholder="blur"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      {loaded && instanceRef.current && (
        <div className="flex justify-center mt-4 gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === idx ? "bg-green-500 scale-110" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <RegisterGymModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default GymBanner;
