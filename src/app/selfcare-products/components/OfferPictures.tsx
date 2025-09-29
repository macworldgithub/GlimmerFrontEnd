"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const OfferPictures = () => {
  const router = useRouter();
  return (
    <div className="w-[99vw] flex justify-center py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#D9D9D9] rounded-xl shadow-lg flex w-full overflow-hidden aspect-[2/1] md:aspect-auto md:h-[320px] transform transition duration-300 hover:scale-[1.02]">
            <div className="w-1/2">
              <Image
                src="/assets/saloonPicture/productBanner1.png"
                alt="Buy 2 Get 1 promotional banner"
                width={1920}
                height={600}
                sizes="100vw"
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="w-1/2 p-4 sm:p-6 flex flex-col justify-center items-center text-center bg-purple-800 transition-opacity duration-500">
              <p className="text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider drop-shadow-md">
                LIMITED TIME OFFER
              </p>
              <h2 className="text-white text-md sm:text-2xl md:text-3xl font-extrabold leading-tight mt-1 sm:mt-2 drop-shadow-md transition-transform duration-300 hover:translate-y-1">
                Flat 30% on haircare
                <br />
              </h2>
              <button
                className="mt-3 sm:mt-4 bg-yellow-100 text-black text-[10px] sm:text-sm px-4 sm:px-5 py-2 sm:py-3 rounded transition duration-300 shadow-md"
                onClick={() => router.push("/products")}
              >
                Shop now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl shadow-lg flex w-full overflow-hidden aspect-[2/1] md:aspect-auto md:h-[320px] transform transition duration-300 hover:scale-[1.02]">
            <div className="w-1/2 p-4 sm:p-6 flex flex-col justify-center items-center bg-purple-800 transition-opacity duration-500">
              <p className="text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider drop-shadow-md">
                LAUNCH SALE
              </p>
              <h2 className="text-white text-md sm:text-2xl md:text-3xl font-extrabold leading-tight mt-1 sm:mt-2 drop-shadow-md transition-transform duration-300 hover:translate-y-1">
                Upto 50% OFF
              </h2>
              <button
                className="mt-3 sm:mt-4 bg-yellow-100 text-black text-[10px] sm:text-sm px-4 sm:px-5 py-2 sm:py-3 rounded transition duration-300 shadow-md"
                onClick={() => router.push("/products")}
              >
                Shop now
              </button>
            </div>
            <div className="w-1/2">
              <Image
                src="/assets/saloonPicture/productBanner2.png"
                alt="Save 20% promotional banner"
                width={1920}
                height={600} 
                sizes="100vw"
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPictures;
