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
import Image from "next/image";
import Card from "@/common/Card";
import BoxContainer from "@/common/box-container";

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
  const [copied, setCopied] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");
  const path = useParams();

  const fetchData = async (id: string) => {
    try {
      const res = await getProductById(id);
      console.log("hello");
      console.log(res);
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

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(""), 2000);
    });
  };

  const tabs = [
    {
      title: "Description",
      content: product?.description || "No description available.",
    },
  ];

  return (
    <>
      <CategoryNavMenu />
      <div className="mb-8 flex flex-col justify-center gap-8 p-8 md:mb-5 md:flex-row md:gap-16 lg:mb-10">
        {/* Left Side: Product Image Gallery */}
        <div className="flex flex-col items-center">
          <img
            src={product?.image1}
            alt={product?.name}
            width={650}
            height={650}
            className="rounded-md object-cover shadow"
          />
          <div className="mt-6 flex gap-4">
            <img
              src={product?.image1}
              alt="Thumbnail 1"
              width={120}
              height={120}
              className="rounded-md object-cover shadow"
            />
            {product?.image2 && (
              <img
                src={product?.image2}
                alt="Thumbnail 2"
                width={120}
                height={120}
                className="rounded-md object-cover shadow"
              />
            )}
            {product?.image3 && (
              <img
                src={product?.image3}
                alt="Thumbnail 3"
                width={120}
                height={120}
                className="rounded-md object-cover shadow"
              />
            )}
          </div>

          <div className="mt-8 w-full hidden lg:block">
            {" "}
            {/* Hide for mobile devices */}
            {/* Reviews Heading */}
            <h2 className="text-4xl font-semibold text-gray-800">Ratings</h2>
            {/* Rating Display */}
            <p className="text-gray-700 mt-1 text-xl">
              {product?.ratings ? `${product.ratings}/5` : "No ratings yet"}
            </p>
            {/* Star Rating */}
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ms-1 ${
                    product?.ratings && index < Math.round(product.ratings)
                      ? "text-purple-800"
                      : "text-gray-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="mt-[1rem] w-full hidden lg:block">
            {" "}
            {/* Hide for mobile devices */}
            <div>
              {[5, 4, 3, 2, 1].map((star, index) => {
                const percentage = star * 20;
                return (
                  <div
                    key={star}
                    className={`flex items-center gap-3 ${
                      index < 4 ? "mb-4" : ""
                    }`}
                  >
                    {/* Star rating */}
                    <span className="text-purple-800">{star} ★</span>
                    {/* Percentage bar */}
                    <div className="w-full bg-gray-200 rounded-md h-3 flex-1">
                      <div
                        className="h-3 bg-purple-800 rounded-md"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    {/* Percentage text */}
                    <span className="text-gray-600">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-2xl">{product?.name}</h1>

          {/* Price */}
          <div className="font-semibold text-2xl">
            {product?.discounted_price === 0
              ? product?.base_price
              : product?.discounted_price}{" "}
            <span className="text-lg">PKR</span>
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

          <div className="flex items-center mt-2">
            {[...Array(4)].map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-purple-800 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            {/* Last Star (Gray) */}
            <svg
              className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <h3 className="h-4 ms-1 text-gray-300 dark:text-gray-500">
              (4/5) <span className="mx-2">|</span> 201 reviews
            </h3>
          </div>
          <hr className="my-2.5 border-t border-gray-400 dark:text-gray-500 w-full" />

          <p className="text-gray-700 dark:text-gray-500 mt-1">
            {product?.description
              ? product.description
              : "This product has no description."}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {/* Size */}
            <div className="flex items-center font-semibold text-gray-700 dark:text-gray-700">
              <span>Size:</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {product?.size || "10gm"}
            </div>

            {/* Stock */}
            <div className="flex items-center font-semibold text-gray-700 dark:text-gray-700">
              <span>Stock:</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {product?.stock || 215}
            </div>

            {/* Type */}
            <div className="flex items-center font-semibold text-gray-700 dark:text-gray-700">
              <span>Type:</span>
            </div>
            <div className="space-x-2">
              {/* Buttons for Type */}
              {["Dramatic", "Volume", "Natural", "Long"].map((type, index) => (
                <button
                  key={index}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-500 hover:border-purple-700"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 bg-white border border-gray-200 shadow-sm dark:text-white p-4 rounded-lg">
            {/* Voucher Promo */}
            <div className="mb-4">
              <h4 className="font-semibold text-xl text-gray-800">
                Voucher Promo
              </h4>
              <p className="text-gray-700 dark:text-gray-700">
                {product?.promoCode
                  ? `There are ${product.promoCode} promo codes for you`
                  : "There are 3 promo codes for you"}
              </p>
            </div>

            <div>
              {[
                {
                  title: "GLOW15",
                  value: product?.percentOff
                    ? `${product.percentOff}% off for your entire purchase`
                    : "No discount",
                },
                {
                  title: "Skincare",
                  value: product?.skinCare
                    ? `${product.skinCare}% off skincare essentials`
                    : "No skincare",
                },
              ].map((item, index) => (
                <div key={index} className="mb-4 flex items-center">
                  <div>
                    <h4 className="font-semibold text-xl text-gray-800 dark:text-purple-700">
                      {item.title}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-700">
                      {item.value}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <button onClick={() => handleCopy(item.value, item.title)}>
                      <Image
                        src={"/assets/assurity/copy.png"}
                        alt="copy"
                        width={20}
                        height={20}
                      />
                    </button>
                    {copied === item.title && (
                      <span className="text-green-500 ml-2">Copied!</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Buttons Section */}
          <div className="flex items-center gap-4 mt-4">
            {/* Add to Bag & Buy Now Buttons */}
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-purple-800 text-purple-800 font-semibold rounded-md hover:border-purple-800 hover:text-purple-800"
              onClick={handleAddToCart}
            >
              <Image
                alt="cart-icon"
                width={15}
                height={15}
                src={"/assets/addtoBag/cart-icon.png"}
              />
              ADD TO BAG
            </button>

            <button className="flex-1 py-2 px-4 bg-purple-800 text-white font-semibold rounded-md hover:bg-purple-900">
              BULK BUYING
            </button>
            {/* Wishlist Toggle Button */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-2"
            >
              <Image
                src={
                  isWishlisted
                    ? "/assets/addtoBag/heart-filled.png"
                    : "/assets/addtoBag/heart.png"
                }
                alt="wishlist"
                width={20}
                height={20}
              />
            </button>
          </div>

          <div className="mt-6">
            <div className="flex border-b border-gray-300">
              {tabs.map((tab) => (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(tab.title)}
                  className={`flex-1 py-2 px-4 font-semibold ${
                    activeTab === tab.title
                      ? "text-purple-800 border-b-2 border-purple-800"
                      : "text-gray-600"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Description Content */}
            <div className="p-4 text-gray-700 dark:text-gray-500">
              {tabs.find((tab) => tab.title === activeTab)?.content}
            </div>
          </div>
          <div className="mt-12 w-full lg:hidden">
            {" "}
            {/* Hide for mobile devices */}
            {/* Reviews Heading */}
            <h2 className="text-4xl font-semibold text-gray-800">Ratings</h2>
            {/* Rating Display */}
            <p className="text-gray-700 mt-1 text-xl">
              {product?.ratings ? `${product.ratings}/5` : "No ratings yet"}
            </p>
            {/* Star Rating */}
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ms-1 ${
                    product?.ratings && index < Math.round(product.ratings)
                      ? "text-purple-800"
                      : "text-gray-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="mt-[1rem] w-full lg:hidden">
            {" "}
            {/* Hide for mobile devices */}
            <div>
              {[5, 4, 3, 2, 1].map((star, index) => {
                const percentage = star * 20;
                return (
                  <div
                    key={star}
                    className={`flex items-center gap-3 ${
                      index < 4 ? "mb-4" : ""
                    }`}
                  >
                    {/* Star rating */}
                    <span className="text-purple-800">{star} ★</span>
                    {/* Percentage bar */}
                    <div className="w-full bg-gray-200 rounded-md h-3 flex-1">
                      <div
                        className="h-3 bg-purple-800 rounded-md"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    {/* Percentage text */}
                    <span className="text-gray-600">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 gap-8 ml-20 md:mb-5 md:flex-row md:gap-16 lg:mb-10">
        <h2 className="text-4xl font-semibold">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
          {sampleProducts.map((item: any) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div>
        <BoxContainer />
      </div>
    </>
  );
};

export default ProductDisplay;
