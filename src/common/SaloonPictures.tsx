import React from "react";

const SaloonPictures = () => {
  const picture = [
    {
      id: 1,
      name: "Hydrating Face Cream",
      image1:
        "https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?q=80&w=1708&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      discounted_price: 29.99,
    },
    {
      id: 2,
      name: "Glow Boost Serum",
      image1:
        "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      discounted_price: 39.99,
    },
    {
      id: 3,
      name: "Daily Moisturizer",
      image1:
        "https://images.unsplash.com/photo-1620464003286-a5b0d79f32c2?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      discounted_price: 24.99,
    },
    {
      id: 4,
      name: "Daily Moisturizer",
      image1:
        "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      discounted_price: 24.99,
    },
  ];
  return (
    <div className="flex flex-col gap-3 w-[99vw] p-5 h-[800px] max-md:h-max rounded">
      <div className="flex h-[50%] w-[100%] gap-3 max-md:flex-col">
        {picture.slice(0, 2).map((item) => (
          <div
            key={item.id}
            className="w-[50%] max-md:w-[100%] h-[100%] rounded-[10px]"
          >
            <img
              src={item.image1}
              className="w-[100%] h-[100%] object-cover rounded-[10px]"
              alt={item.name}
            />
          </div>
        ))}
      </div>
      <div className="flex h-[50%] w-[100%] gap-3 max-md:flex-col">
        {picture.slice(2).map((item) => (
          <div
            key={item.id}
            className="w-[50%] max-md:w-[100%] h-[100%] rounded-[10px]"
          >
            <img
              src={item.image1}
              className="w-[100%] h-[100%] object-cover rounded-[10px]"
              alt={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaloonPictures;
