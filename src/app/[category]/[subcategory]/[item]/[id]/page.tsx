"use client";
import { getAllProducts, getProductById } from "@/api/product";
import Card from "@/common/Card";
import CategoryNavMenu from "@/common/category-nav-menu";
import { sampleProducts } from "@/data";
import {
  addItem,
  updateProductSize,
  updateProductType,
  updateQty,
} from "@/reduxSlices/cartSlice";
import { RootState } from "@/store/reduxStore";
import Image from "next/image";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";
import Link from "next/link";
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { message } from "antd";

const ProductDisplay = () => {
  const Cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [quantity, setQuantityState] = React.useState(1);
  const [product, setProduct] = useState<any>();
  const [copied, setCopied] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkForm, setBulkForm] = useState({ name: "", phone: "", email: "" });

  const ref = searchParams.get("ref") ?? "";
  const rate = searchParams.get("rate") ?? "";
  const storeId = searchParams.get("storeId") ?? "";
  const [data, setData] = useState<any[]>([]);

  const size = useSelector(
    (state: RootState) =>
      state.cart.ProductList.find((item) => item.product?.id === product?.id)
        ?.product?.size
  );

  const type = useSelector(
    (state: RootState) =>
      state.cart.ProductList.find((item) => item.product?.id === product?.id)
        ?.product?.type
  );

  const [selectedSize, setSelectedSize] = useState();
  const [selectedType, setSelectedType] = useState();

  const path = useParams();
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);
  const [category, subCategory, item] = pathSegments;

  const productsUrl = `/products${category ? `?category=${category}` : ""}${subCategory ? `&sub_category=${subCategory}` : ""}${item ? `&item=${item}` : ""}`;

  const fetchData = async (id: string) => {
    try {
      const res = await getProductById(id);
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
  }, []);

  useEffect(() => {
    //@ts-ignore
    setSelectedSize(size);
    //@ts-ignore
    setSelectedType(type);
  }, [product]);

  //@ts-ignore
  const Product = Cart.ProductList.find(
    (item) => item?.product?.id === product?.id
  );

  useEffect(() => {
    //@ts-ignore
    setQuantityState(Product?.quantity);
  }, [Product]);

  const handleAddToCart = () => {
    setIsButtonDisabled(true);
    setIsModalOpen(true);
    setTimeout(() => setIsModalOpen(false), 2000);
    const productWithSalonInfo = {
      ...product,
      ref_of_salon: ref,
      rate_of_salon: parseFloat(rate),
    };
    dispatch(addItem({ product: productWithSalonInfo, quantity: 1 }));
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

  const handleSize = (productId: string, size: any) => {
    setSelectedSize(size);
    dispatch(updateProductSize({ id: productId, size: size }));
  };
  const handleType = (productId: string, type: any) => {
    setSelectedType(type);
    dispatch(updateProductType({ id: productId, type: type }));
  };

  const handleBulkBuy = () => {
    setIsBulkModalOpen(true);
  };

  const handleBulkSubmit = () => {
    console.log("Bulk Buying Form Data:", bulkForm);
    setIsBulkModalOpen(false);
    alert("Your bulk buying request has been submitted!");
  };

  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let images = [product?.image1, product?.image2, product?.image3].filter(Boolean);

  // Ensure at least 3 images (fallback for missing ones)
  while (images.length < 3) {
    images.push("/assets/images/default_image.jpg");
  }

  // Handle Next Image
  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  // Handle Previous Image
  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        const filteredProducts = response.products.filter(
          (product: any) => product.store === storeId
        );
        setData(filteredProducts);
      } catch (err) {
        message.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-full mb-4">
        <CategoryNavMenu />
      </div>
      {/* Breadcrumbs */}
      <div className="breadcrumbs mb-4 text-xl lg:text-xl px-10">
        <Link href="/" className="text-gray-500 font-medium text-base lg:text-xl">Home</Link>
        <span className="mx-2 text-gray-500 font-medium text-base lg:text-xl">/</span>
        <Link href="/selfcare-products" className="text-gray-500 font-medium text-base lg:text-xl">Selfcare Products</Link>
        <span className="mx-2 text-gray-500 font-medium text-base lg:text-xl">/</span>
        <Link href={productsUrl} className="text-gray-500 font-medium text-base lg:text-xl">Products</Link>

        {product && (
          <>
            <span className="mx-2 text-purple-800 text-base lg:text-xl">/</span>
            <span className="text-purple-800 font-medium text-base lg:text-xl">Detail</span>
          </>
        )}
      </div>
      <div className="mb-8 flex flex-col justify-center lg:w-[91vw] mx-auto gap-8 p-8 md:mb-5 lg:flex-row lg:gap-12 lg:mb-10">
        {/* Left Side: Product Image Gallery */}

        <div className="flex flex-col items-center lg:w-[65%] w-full">
          {/* Main Image Container */}
          <div className="w-full max-w-[650px] max-sm:w-[300px] max-sm:h-[300px] sm:w-[400px] md:w-[500px] sm:h-[400px] flex items-center justify-center overflow-hidden rounded-md shadow bg-gray-100">
            <img
              src={images[index]}
              alt={product?.name}
              className="w-full h-full"
            />
          </div>

          {/* Thumbnails Section */}
          <div className="mt-10 flex items-center justify-center w-full max-w-[500px]">
            {/* Left Arrow Button */}
            <button onClick={handlePrev} className="p-2 text-gray-500">
              <MdOutlineKeyboardArrowLeft size={50} />
            </button>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-hidden">
              {isMobile
                ? [images[index]].map((image, i) => (
                  <div
                    key={i}
                    className="mx-4 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] flex items-center justify-center overflow-hidden rounded-md shadow bg-gray-100 border cursor-pointer border-purple-900"
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = "/assets/images/default_image.jpg")}
                    />
                  </div>
                ))
                : images.map((image, i) => (
                  <div
                    key={i}
                    className={`mx-4 md:w-[90px] md:h-[90px] flex items-center justify-center overflow-hidden rounded-md shadow bg-gray-100 border border-gray-300 cursor-pointer ${i === index ? "border-purple-900" : ""}`}
                    onClick={() => setIndex(i)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = "/assets/images/default_image.jpg")}
                    />
                  </div>
                ))}
            </div>

            {/* Right Arrow Button */}
            <button onClick={handleNext} className="p-2 text-gray-500">
              <MdKeyboardArrowRight size={50} />
            </button>
          </div>
          
          {/* Ratings Section */}
          <div className="mt-20 w-full hidden lg:block">
            <h2 className="text-4xl font-semibold text-gray-800">Ratings</h2>
            <p className="text-gray-700 mt-1 text-xl">
              {product?.ratings ? `${product.ratings}/5` : "No ratings yet"}
            </p>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ms-1 ${product?.ratings && index < Math.round(product.ratings)
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

          {/* Percentage Bar Section */}
          <div className="mt-[1rem] w-full hidden lg:block">
            {[5, 4, 3, 2, 1].map((star, index) => {
              const percentage = star * 20;
              return (
                <div
                  key={star}
                  className={`flex items-center gap-3 ${index < 4 ? "mb-4" : ""
                    }`}
                >
                  <span className="text-purple-800">{star} ★</span>
                  <div className="w-full bg-gray-200 rounded-md h-3 flex-1">
                    <div
                      className="h-3 bg-purple-800 rounded-md"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
  
          {/* Right Side: Product Details */}
        <div className="flex flex-col gap-4 relative lg:w-[35%] w-full">
          <h1 className="font-semibold text-2xl">{product?.name}</h1>
          {/* Price */}
          <div className="font-semibold text-4xl">
            {product?.discounted_price > 0 ? (
              <>
                <span className="text-[#583FA8]">
                  {(product?.base_price - (product?.base_price * product?.discounted_price) / 100).toFixed(2)} PKR
                </span>

                {product?.base_price > product?.discounted_price && (
                  <span className="text-gray-500 line-through ml-2 mr-2 text-xs">
                    {product?.base_price} PKR
                  </span>
                )}
                <div className="w-12 h-12 text-sm absolute right-0 flex justify-center items-center">
                  <img
                    src="/assets/addtoBag/discount.png"
                    alt="Discount"
                  />
                  <span className="absolute text-center text-sm text-white  font-bold">
                    {`${product?.discounted_price}% OFF`}
                  </span>
                </div>
              </>
            ) : (
              <span className="text-[[#583FA8]]">{product?.base_price} PKR</span>
            )}
          </div>


          {/* Star Rating */}
          <div className="flex items-center mt-2">
            {[...Array(4)].map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-[#583FA8] ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
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

          {/* Size, Stock, Type */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="flex items-center font-semibold text-gray-700 dark:text-gray-700">
              <span>Size:</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 flex gap-2 flex-wrap ">
              {product?.size?.length > 0
                ? product.size.map((s: any) => (
                  <span
                    key={s.id}
                    onClick={() => handleSize(product?.id, s)}
                    className={`${
                      //@ts-ignore
                      selectedSize?.id === s?.id
                        ? "bg-[#6B21A8] text-white"
                        : "bg-white"
                      } px-2 py-1 border hover:bg-[#6B21A8] hover:text-white cursor-pointer border-gray-300 dark:border-gray-600 rounded-md text-sm `}
                  >
                    {s.value} {s.unit}
                  </span>
                ))
                : "No size"}
            </div>

            <div className="flex items-center font-semibold text-gray-700 dark:text-gray-700">
              <span>Stock:</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {product?.quantity ? product.quantity : "No stock"}
            </div>

            <div className="flex items-center font-semibold text-gray-700 dark:text-gray-700">
              <span>Type:</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 space-x-2 flex gap-2 flex-wrap">
              {product?.type?.length > 0
                ? product.type.map((t: any) => (
                  <button
                    key={t.id}
                    onClick={() => handleType(product?.id, t)}
                    className={`${
                      //@ts-ignore
                      selectedType?.id === t?.id
                        ? "bg-[#6B21A8] text-white"
                        : "bg-white"
                      } px-3 py-1 border hover:bg-[#6B21A8] hover:text-white cursor-pointer border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-500 hover:border-purple-700`}
                  >
                    {t.value}
                  </button>
                ))
                : "No type"}
            </div>
          </div>

          {/* Voucher Promo
          <div className="mt-4 bg-white shadow-lg dark:text-white px-6 py-2 pl-8 rounded-lg">
            <div className="mb-4">
              <h4 className="font-semibold text-lg text-gray-800">
                Voucher Promo
              </h4>
              <p className="text-gray-700 dark:text-gray-700">
                {product?.promoCode
                  ? `there are ${product.promoCode} promo codes for you`
                  : "there are 3 promo codes for you"}
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
                    <h4 className="font-semibold text-md text-[#583FA8] ">
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
          </div> */}

          {/* Buttons Section */}
          <div className="flex items-center gap-4 mt-4">
            <button
              className={`flex-1 w-full flex items-center text-xs justify-center gap-2 py-3 xl:px-6 px-4 border text-purple-800 font-semibold rounded-md 
    ${isButtonDisabled ? 'border-gray-300 text-gray-500 cursor-not-allowed' : 'border-purple-800 hover:border-purple-800 hover:text-purple-800'}`}
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
            >
              <Image
                alt="cart-icon"
                width={15}
                height={15}
                src={"/assets/addtoBag/cart-icon.png"}
              />
              ADD TO BAG
            </button>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-white rounded-lg shadow-xl p-6 w-80 text-center"
                >
                  <p className="text-lg font-semibold text-gray-800">
                    Product is added to the cart!
                  </p>
                </motion.div>
              </div>
            )}

            <button onClick={handleBulkBuy} className="flex-1 w-full h-12 xl:px-6 text-xs bg-[#583FA8] text-white font-semibold rounded-md hover:bg-purple-900">
              BULK BUY
            </button>
            {isBulkModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-white rounded-lg shadow-xl p-6 w-96"
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    Looking for bulk options as a salon owner or reseller?
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Share your details below, and our team will get in touch!
                  </p>

                  {/* Bulk Form */}
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={bulkForm.name}
                      onChange={(e) => setBulkForm({ ...bulkForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={bulkForm.phone}
                      onChange={(e) => setBulkForm({ ...bulkForm, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={bulkForm.email}
                      onChange={(e) => setBulkForm({ ...bulkForm, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleBulkSubmit}
                    className="mt-4 w-full py-2 px-6 bg-purple-800 text-white font-semibold rounded-md hover:bg-purple-900 transition duration-200"
                  >
                    Submit
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={() => setIsBulkModalOpen(false)}
                    className="mt-4 w-full py-2 px-6 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-400 transition duration-200"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            )}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="px-3 border border-[#583FA8] text-[#583FA8 ] h-11 rounded-md"
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


          {/* Tabs Section */}
          <div className="mt-12">
            <div className="flex border-b border-gray-300">
              {tabs.map((tab) => (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(tab.title)}
                  className={`flex-1 py-2 px-4 font-semibold ${activeTab === tab.title
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

          {/* Ratings Section for Mobile */}
          <div className="mt-12 w-full lg:hidden">
            <h2 className="text-4xl font-semibold text-gray-800">Ratings</h2>
            <p className="text-gray-700 mt-1 text-xl">
              {product?.ratings ? `${product.ratings}/5` : "No ratings yet"}
            </p>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ms-1 ${product?.ratings && index < Math.round(product.ratings)
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

          {/* Percentage Bar Section for Mobile */}
          <div className="mt-[1rem] w-full lg:hidden">
            {[5, 4, 3, 2, 1].map((star, index) => {
              const percentage = star * 20;
              return (
                <div
                  key={star}
                  className={`flex items-center gap-3 ${index < 4 ? "mb-4" : ""
                    }`}
                >
                  <span className="text-purple-800">{star} ★</span>
                  <div className="w-full bg-gray-200 rounded-md h-3 flex-1">
                    <div
                      className="h-3 bg-purple-800 rounded-md"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-[99vw] p-10 justify-center md:mb-5 md:flex-row md:gap-1">
        <h2 className="text-4xl font-semibold">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-10">
          {data.length ? (
            data.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.02 }}
                className="flex"
              >
                <Card item={item} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center min-h-[70vh]">
              <div className="text-center font-bold text-3xl">
                Oops! No items to display in this category
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
