import CardSlider from "@/common/CardSlider";
import React from "react";

const List1 = [
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
  {
    id: 5,
    name: "Daily Moisturizer",
    image1:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discounted_price: 24.99,
  },
  {
    id: 6,
    name: "Daily Moisturizer",
    image1:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discounted_price: 24.99,
  },
  {
    id: 7,
    name: "Daily Moisturizer",
    image1:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discounted_price: 24.99,
  },
  {
    id: 8,
    name: "Daily Moisturizer",
    image1:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discounted_price: 24.99,
  },
  {
    id: 9,
    name: "Daily Moisturizer",
    image1:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discounted_price: 24.99,
  },
  {
    id: 10,
    name: "Daily Moisturizer",
    image1:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discounted_price: 24.99,
  },
];

const MustItems = () => {
  return (
    <div className="w-[99vw] h-max p-5 md:px-[4rem] flex flex-col text-center">
      <h1 className="font-sans font-semibold text-[24px] md:text-[34px] py-5 ">
        YOU MUST HAVE THIS
      </h1>
      <CardSlider ProductList={List1} />
    </div>
  );
};

export default MustItems;
