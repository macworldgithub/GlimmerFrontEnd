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
    <div className="flex flex-col gap-4 w-[99vw] p-4 lg:p-[4rem] md:p-10 lg:pb-20 h-max rounded-lg">
      <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full justify-center">
        {picture.map((item) => (
          <div
            key={item.id}
            className="w-[50%] max-lg:w-[100%]  h-[100%] max-w-full flex justify-center overflow-hidden rounded-lg"
          >
            <div className="w-full h-full rounded-lg ">
              <img
                src={item.image1}
                className=" w-[80%] h-full ml-20 lg:object-cover"
                alt={item.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferPictures;
