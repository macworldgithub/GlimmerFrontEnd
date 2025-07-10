import React from "react";

const OfferPictures = () => {
 return (
    <div className="w-[99vw] flex justify-center py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#D9D9D9] rounded-xl shadow-lg flex w-full overflow-hidden aspect-[2/1] md:aspect-auto md:h-[320px] transform transition duration-300 hover:scale-[1.02]">
            <div className="w-1/2">
              <img
                src="/assets/saloonPicture/productBanner1.png"
                alt="Buy 2 Get 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/2 p-4 sm:p-6 flex flex-col justify-center items-start bg-[#d2d0d6] transition-opacity duration-500">
              <p className="text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider drop-shadow-md">
                LIMITED TIME OFFER
              </p>
              <h2 className="text-white text-lg sm:text-2xl md:text-3xl font-extrabold leading-tight mt-1 sm:mt-2 drop-shadow-md transition-transform duration-300 hover:translate-y-1">
                Buy 2<br />
                Get 1
              </h2>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#D9D9D9] rounded-xl shadow-lg flex w-full overflow-hidden aspect-[2/1] md:aspect-auto md:h-[320px] transform transition duration-300 hover:scale-[1.02]">
            <div className="w-1/2 p-4 sm:p-6 flex flex-col justify-center items-start bg-[#d2d0d6] transition-opacity duration-500">
              <p className="text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider drop-shadow-md">
                SUMMER SALE
              </p>
              <h2 className="text-white text-lg sm:text-2xl md:text-3xl font-extrabold leading-tight mt-1 sm:mt-2 drop-shadow-md transition-transform duration-300 hover:translate-y-1">
                Save 20%
              </h2>
              <button className="mt-3 sm:mt-4 bg-[#4B2994] text-white text-[10px] sm:text-sm px-4 sm:px-5 py-2 sm:py-3 rounded transition duration-300 hover:bg-[#5c38b2] shadow-md">
                on Skincare Products
              </button>
            </div>
            <div className="w-1/2">
              <img
                src="/assets/saloonPicture/productBanner2.png"
                alt="Save 20%"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default OfferPictures;
