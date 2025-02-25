import React from "react";

const OfferPictures = () => {
  const picture = [
    {
      id: 1,
      name: "Hydrating Face Cream",
      image1: "/assets/saloonPicture/salon.png",
      discounted_price: 29.99,
    },
    {
      id: 2,
      name: "Glow Boost Serum",
      image1: "/assets/saloonPicture/spa.png",
      discounted_price: 39.99,
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-[99vw] p-4 md:p-10 lg:pb-20 h-max rounded">
      <div className="flex flex-wrap gap-4 w-full justify-center max-md:flex-col">
        {picture.map((item) => (
          <div
            key={item.id}
            className="w-[40%] max-md:w-full h-auto flex justify-center"
          >
            <img
              src={item.image1}
              className="w-full h-auto max-h-[576px] object-contain rounded-[10px]"
              alt={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferPictures;
