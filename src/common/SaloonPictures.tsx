import React from "react";

const SaloonPictures = () => {
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
    {
      id: 3,
      name: "Daily Moisturizer",
      image1: "/assets/saloonPicture/clinic.png",
      discounted_price: 24.99,
    },
    {
      id: 4,
      name: "Daily Moisturizer",
      image1: "/assets/saloonPicture/gym.png",
      discounted_price: 24.99,
    },
  ];

  return (
    <div className="flex flex-col gap-3 w-[99vw] px-5 py-6 lg:pb-[22rem] md:pb-[12rem] md:p-[4rem] h-max rounded">
      <div className="flex flex-wrap gap-3 w-full justify-center max-md:flex-col">
        {picture.slice(0, 2).map((item) => (
          <div
            key={item.id}
            className="w-[48%] max-md:w-[100%] h-auto flex justify-center"
          >
            <img
              src={item.image1}
              className="w-full h-auto max-h-[576px] object-cover rounded-[10px]"
              alt={item.name}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 w-full justify-center max-md:flex-col">
        {picture.slice(2).map((item) => (
          <div
            key={item.id}
            className="w-[48%] max-md:w-[100%] h-auto flex justify-center"
          >
            <img
              src={item.image1}
              className="w-full h-auto max-h-[576px] object-cover rounded-[10px]"
              alt={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaloonPictures;
