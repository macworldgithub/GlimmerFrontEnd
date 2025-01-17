import React from "react";
import "tailwindcss/tailwind.css";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import { useCartStoreContext } from "@/store/cartStoreContext";
import { MappingCardItem } from "../app/[temp]/[id]/MappingCardItem";

interface CardItem {
  name: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  base_price: number;
  discounted_price: number;
}

const Card: React.FC<{ item: CardItem }> = ({ item }) => {
  const { cartItems, addItem } = useCartStoreContext();

  const handleAddToCart = () => {
    MappingCardItem(item, cartItems, addItem);
  };

  const discountPercentage = Math.round(
    ((item.base_price - item.discounted_price) / item.base_price) * 100
  );

  return (
    <div className="  w-[280px] shadow-lg max-sm:w-[100%]">
      <img
        src={item.image1}
        alt="Image 1"
        className="w-full h-40 object-cover "
      />
      <div className="p-1 mt-2">
        <div className="flex justify-between">
          <h2 className="text-[15px] mb-1">{item.name}</h2>
          <h2 className="text-[15px] mb-1">
            <FaStar />
          </h2>
        </div>

        <div className=" flex justify-between">
          <p className="text-gray-800 text-xl font-bold ">
            <span className=" line-through text-[12px] font-light text-gray-500">
              {item.base_price} PKR
            </span>
            <span className=" ">{item.discounted_price} PKR</span>
          </p>

          <p className="text-green-500 font-semibold">
            {discountPercentage}% off
          </p>
        </div>
        <button
          className="btn btn-secondary btn-block capitalize"
          onClick={handleAddToCart}
        >
          <RiShoppingCart2Line className="mb-0.5 size-4" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;

