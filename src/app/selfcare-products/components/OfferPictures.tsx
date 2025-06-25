import React from "react";

const OfferPictures = () => {
  return (
    <div className="w-full py-10 ml-1">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#D9D9D9] rounded-lg shadow-md flex h-[320px] w-full overflow-hidden">
            <div className="w-1/2">
              <img
                src="/assets/saloonPicture/salon.png"
                alt="Buy 2 Get 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/2 p-4 flex flex-col justify-center items-start bg-[#d2d0d6]">
              <p className="text-white text-xs font-medium uppercase tracking-wide">
                LIMITED TIME OFFER
              </p>
              <h2 className="text-white text-2xl font-bold leading-tight mt-2">
                Buy 2<br />
                Get 1
              </h2>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#D9D9D9] rounded-lg shadow-md flex h-[320px] w-full overflow-hidden">
            <div className="w-1/2 p-4 flex flex-col justify-center items-start bg-[#d2d0d6]">
              <p className="text-white text-xs font-medium uppercase tracking-wide">
                SUMMER SALE
              </p>
              <h2 className="text-white text-2xl font-bold leading-tight mt-2">
                Save 20%
              </h2>
             
            
              <button className="mt-2 bg-[#4B2994] text-white text-sm px-5 py-3 rounded">
                on Skincare Products
              </button>
            </div>
            <div className="w-1/2">
              <img
                src="/assets/saloonPicture/spa.png"
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
