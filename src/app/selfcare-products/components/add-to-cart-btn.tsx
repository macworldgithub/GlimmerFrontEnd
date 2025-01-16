"use client";
import { mapProductToCartItem } from "@/store/cartStore";

import { ProductType } from "@/types";
import { RiShoppingCart2Line } from "react-icons/ri";

const AddToCartBtn = ({ product }: { product: ProductType }) => {
  return (
    <button
      className="btn btn-secondary btn-block capitalize"
      onClick={() => {}}
    >
      <RiShoppingCart2Line className="mb-0.5 size-4" />
      add to cart
    </button>
  );
};

export default AddToCartBtn;
