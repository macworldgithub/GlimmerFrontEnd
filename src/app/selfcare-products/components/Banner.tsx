"use client";

import Image from 'next/image';

const categories = ["HAIR LUX", "INKLINE", "ARTISTRY", "LUMINA", "CHROMA", "HYDRALUX"];

export default function DynamicBanner({ imageUrl, title }: { imageUrl: string; title: string }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative flex w-full max-w-4xl h-48 bg-purple-700 rounded-lg overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-6 text-white font-bold text-lg">
          {title || "Shop Now and Unleash Your Inner Glow!"}
        </div>
        <div className="relative w-1/2 h-full bg-gray-300">
          {imageUrl && (
            <Image src={imageUrl} alt="Banner Image" layout="fill" objectFit="cover" />
          )}
        </div>
      </div>
      <div className="mt-4 flex gap-4 text-gray-400 text-sm">
        {categories.map((category, index) => (
          <span key={index} className="cursor-pointer hover:text-gray-600">
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
