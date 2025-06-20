"use client";

import Image from "next/image";

const categories = ["HAIR LUX", "INKLINE", "ARTISTRY", "LUMINA", "CHROMA", "HYDRALUX"];

export default function DynamicBanner({ imageUrl, title }: { imageUrl: string; title: string }) {
  return (
    <div className="max-md:mt-4 w-[99vw] lg:p-[4rem] flex flex-col items-center mb-12">
      <div className="relative flex w-full max-w-[65rem] ml-8 lg:h-96 max-lg:h-80 max-md:h-72 max-sm:h-60 rounded-lg overflow-hidden">
        {/* Left Purple Section */}
        <div className="relative w-[65%] flex items-center p-6 text-white font-bold text-lg">
          {/* Purple SVG Background */}
          <Image
            src="/assets/Home/purple.svg"
            alt="Purple Background"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
          

          {/* Left Sparkle SVG */}
          <Image
            src="/assets/Home/sparkle.svg"
            alt="Left Sparkle"
            width={20}
            height={20}
            className="absolute top-12 left-10"
          />

          {/* Right Sparkle SVG */}
          <Image
            src="/assets/Home/sparkle.svg"
            alt="Right Sparkle"
            width={20}
            height={20}
            className="absolute bottom-36 right-56 max-lg:right-48 max-sm:right-12 max-md:right-20 max-md:bottom-28 max-sm:bottom-20"
          />
          <span className="relative z-10 font-bold text-4xl max-md:text-xl max-sm:text-sm w-[50%] left-8 ">
            {title || "Shop Now and Unleash Your Inner Glow!"}
          </span>
        </div>
        {/* Yellow SVG */}
        <div className="absolute lg:right-[20%] md:right-[14%] sm:right-[5%] top-0 sm:w-80 h-full z-10 max-sm:hidden ">
          <Image src="/assets/Home/yellow.png" alt="Yellow Overlay" layout="fill" objectFit="cover" />
        </div>
        {/* Right Gray Section */}
        <div className="relative w-[40%] h-full bg-gray-300 rounded-xl -left-7 z-10">
          {imageUrl && (
            <Image src={imageUrl} alt="Banner Image" layout="fill" objectFit="cover" />
          )}
        </div>
      </div>

      
      
      {/* Category Links */}
<div className="mt-10 mb-6 flex gap-4 text-[#d7d1ea] text-md max-sm:grid max-sm:grid-cols-2 max-sm:gap-X-10">
  {categories.map((category, index) => (
    <span key={index} className="cursor-pointer hover:text-[#583FA8] text-center">
      {category}
    </span>
  ))}
</div>

    </div>
  );
}
