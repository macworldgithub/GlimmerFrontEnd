"use client";
import React from "react";
import { useEffect, useState } from "react";
import { sampleProducts } from "@/data";
import { useParams } from "next/navigation";

import CategoryNavMenu from "@/common/category-nav-menu";
import { useDispatch } from "react-redux";
import { addItem, updateQty } from "@/reduxSlices/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reduxStore";
import { getProductById } from "@/api/product";

const forestAdventure = {
  name: "Forest Adventure",
  description: "Explore the lush greenery and serene landscapes of the forest.",
  image1:
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyMTc&ixlib=rb-1.2.1&q=80&w=400",
  image2:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyNTg&ixlib=rb-1.2.1&q=80&w=400",
  image3:
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGZvcmVzdHxlbnwwfHx8fDE2ODkxOTcyODU&ixlib=rb-1.2.1&q=80&w=400",
  base_price: 150,
  discounted_price: 120,
};

// Example Handlers

const ProductDisplay = ({}) => {
  const Cart = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();
  const [quantity, setQuantityState] = React.useState(1);
  const [product, setProduct] = useState<any>();
  const path = useParams();

  const fetchData = async (id: string) => {
    try {
      const res = await getProductById(id);

      // return res;
      setProduct(res);
    } catch (error) {
      console.error("Error Fetching Product by Id");
    }
  };
  useEffect(() => {
    let result = sampleProducts.find(
      (item) => item?.id.toString() === path?.id
    );

    //@ts-ignore
    fetchData(path?.id);

    // setProduct(result);
  }, []);

  //@ts-ignore
  const Product = Cart.ProductList.find(
    (item) => item?.product?.id === product?.id
  );

  //@ts-ignore

  useEffect(() => {
    //@ts-ignore
    setQuantityState(Product?.quantity);
  }, [Product]);

  const handleAddToCart = () => {
    dispatch(addItem({ product: product }));
  };

  const updateQuantity = (newQuantity: any) => {
    setQuantityState(newQuantity);

    dispatch(updateQty({ _id: product?.id, qty: newQuantity }));
  };

  return (
    <>
      <CategoryNavMenu />
      <div className="mb-8 flex flex-col justify-center gap-8 p-8 md:mb-5 md:flex-row md:gap-16 lg:mb-10">
        {/* Left Side: Product Image Gallery */}
        <div className="flex flex-col items-center">
          <img
            src={product?.image1}
            alt={product?.name}
            className="h-80 w-80 rounded-md object-cover shadow"
          />
          <div className="mt-6 flex gap-4">
            <img
              src={product?.image1}
              alt="Thumbnail 1"
              className="h-20 w-20 rounded-md object-cover shadow"
            />
            <img
              src={product?.image2}
              alt="Thumbnail 2"
              className="h-20 w-20 rounded-md object-cover shadow"
            />
            <img
              src={product?.image3}
              alt="Thumbnail 3"
              className="h-20 w-20 rounded-md object-cover shadow"
            />
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-2xl">{product?.name}</h1>

          {/* Price */}
          <div className="font-semibold text-2xl">
            {product?.discounted_price.toFixed(2)}{" "}
            <span className="text-lg">USD</span>
            <span className="text-gray-500 text-sm">
              {product?.base_price > product?.discounted_price
                ? ` -${Math.round(
                    ((product?.base_price - product.discounted_price) /
                      product?.base_price) *
                      100
                  )}%`
                : ""}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <span>Quantity</span>
            <button
              onClick={() => updateQuantity(Math.max(1, quantity - 1))}
              className="btn btn-xs btn-outline"
            >
              -
            </button>
            <span className=" text-black ">{Product?.quantity}</span>
            <button
              onClick={() => updateQuantity(quantity + 1)}
              className="btn btn-xs btn-outline"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            className="btn btn-secondary btn-wide"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* Product Details */}
          <div className="mt-4">
            <div
              tabIndex={0}
              className="collapse-arrow collapse rounded-box border border-base-300 bg-base-100"
            >
              <div className="collapse-title font-medium text-lg">
                Product Details
              </div>
              <div className="collapse-content">
                <p>{product?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
