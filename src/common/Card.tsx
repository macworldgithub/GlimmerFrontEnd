// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { RealCardItem } from "@/data";
// import { Rating } from "react-simple-star-rating";
// import { FaHeart } from "react-icons/fa";
// import { RiShoppingBag4Line } from "react-icons/ri";
// import { useDispatch } from "react-redux";
// import { addItem } from "@/reduxSlices/cartSlice";

// const Card: React.FC<{ item: RealCardItem }> = ({ item }) => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [showMessage, setShowMessage] = useState(false); // ✅

//   let queryParams = new URLSearchParams();
//   if (item.rate_of_salon) queryParams.append("rate", item.rate_of_salon.toString());
//   if (item.ref_of_salon) queryParams.append("ref", item.ref_of_salon);
//   //@ts-ignore
//   if (item.store) queryParams.append("storeId", item.store);

//   //@ts-ignore
//   const path = `/${item.category}/${item.sub_category}/${item.item}/${item._id}`;
//   const finalPath = queryParams.toString() ? `${path}?${queryParams.toString()}` : path;

//   return (
//     <div
//       className="relative w-[280px] h-[320px] sm:w-[300px] sm:h-[350px] md:max-w-[320px] md:h-[370px] mx-auto bg-white rounded-2xl bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg transition duration-300 cursor-pointer flex flex-col overflow-visible"
//       onClick={() => router.push(finalPath)}
//     >
//       {/* ✅ SUCCESS MESSAGE */}
//       {showMessage && (
//         <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-md shadow z-50">
//           Item has been added to cart
//         </div>
//       )}

//       {/* Top half image */}
//       <div className="relative w-full h-1/2 flex items-center justify-center bg-white">
//         <img
//           src={item.image1 || "/assets/images/default_image.jpg"}
//           alt={item.name}
//           className="max-h-full max-w-full object-contain rounded-t-2xl"
//         />

//         {/* Discount and actions */}
//         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 w-full justify-center px-2 max-md:justify-between">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               const productWithQuantity = { ...item, quantity: 1 };
//               dispatch(addItem({ product: productWithQuantity, quantity: 1 }));
//               setShowMessage(true); // ✅ Show message
//               setTimeout(() => setShowMessage(false), 2000); // ✅ Auto hide after 2s
//             }}
//             className="w-full py-2 max-xl:py-1 xl:gap-2 max-xl:gap-[2px] max-xl:px-1 gap-1 bg-[#583FA8] flex justify-center items-center max-md:py-1 rounded-md max-lg:px-2 max-lg:gap-1 max-md:w-fit"
//           >
//             <RiShoppingBag4Line
//               size={20}
//               className="text-white max-lg:h-5 max-lg:w-5 max-md:w-7 max-md:h-7"
//             />
//             <p className="text-white text-[12px] mt-1 max-xl:text-[8px] max-lg:text-6px max-sm:text-[9px] max-md:hidden">
//               ADD TO BAG
//             </p>
//           </button>

//           <div className="md:h-8 mt-1 px-2 border-[#583FA8] border border-solid bg-white flex justify-center items-center max-md:h-[32px] max-sm:h-[30px] rounded-md">
//             <FaHeart className="text-purple-300 hover:text-purple-800 text-base max-md:w-6 max-md:h-6 max-sm:text-xs" />
//           </div>
//         </div>

//         {item?.base_price > item?.discounted_price && item?.discounted_price > 0 && (
//           <div className="absolute -top-3 -right-3 w-10 h-10 z-10">
//             <img
//               src="/assets/addtoBag/discount.png"
//               alt="Discount"
//               className="w-full h-full"
//             />
//             <span className="absolute inset-0 flex flex-col items-center justify-center text-white text-xs leading-tight font-bold">
//               <span>{`${Math.round(
//                 ((item.base_price - item.discounted_price) / item.base_price) * 100
//               )}%`}</span>
//               <span className="text-[8px] font-normal">OFF</span>
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Bottom half content */}
//       <div className="p-4 h-1/2 flex flex-col justify-between">
//         <div>
//           <h2 className="text-lg font-semibold truncate mb-1">{item.name}</h2>
//           <p className="text-sm text-gray-600 truncate mb-1">{item.description}</p>
//         </div>

//         <div>
//           <div className="flex justify-between items-center mt-4">
//             <span className="text-md font-bold text-gray-800">
//               {item.discounted_price > 0 ? item.discounted_price : item.base_price} PKR
//             </span>
//             {item.discounted_price > 0 && item.base_price > item.discounted_price && (
//               <span className="text-gray-400 text-md line-through">
//                 {item.base_price.toFixed(2)} PKR
//               </span>
//             )}
//           </div>
//           <div className="flex mt-2">
//             <Rating
//               size={20}
//               initialValue={3}
//               SVGstyle={{ display: "inline-flex" }}
//               allowHover={false}
//               fillColor="#583FA8"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { RealCardItem } from "@/data";
import { FaHeart } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { addItem } from "@/reduxSlices/cartSlice";

const Card: React.FC<{ item: RealCardItem }> = ({ item }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  let queryParams = new URLSearchParams();
  if (item.rate_of_salon)
    queryParams.append("rate", item.rate_of_salon.toString());
  if (item.ref_of_salon) queryParams.append("ref", item.ref_of_salon);
  //@ts-ignore
  if (item.store) queryParams.append("storeId", item.store);
  //@ts-ignore
  const path = `/${item.category}/${item.sub_category}/${item.item}/${item._id}`;
  const finalPath = queryParams.toString()
    ? `${path}?${queryParams.toString()}`
    : path;

  const basePrice = Number(item.base_price) || 0;
  const discountedPrice = Number(item.discounted_price) || 0;

  let finalPrice = "N/A";
  if (basePrice > 0) {
    finalPrice =
      discountedPrice > 0 && discountedPrice < basePrice
        ? discountedPrice.toFixed(2)
        : basePrice.toFixed(2);
  }

  return (
    <div
      className="w-full max-w-[300px] h-[370px] bg-transparent rounded-xl transition duration-300 cursor-pointer relative flex flex-col items-center text-center"
      onClick={() => router.push(finalPath)}
    >
      <div
        className="absolute top-2 left-2 z-10"
        onClick={(e) => {
          e.stopPropagation();
          const productWithQuantity = { ...item, quantity: 1 };
          dispatch(addItem({ product: productWithQuantity, quantity: 1 }));
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 2000);
        }}
      >
        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
          <RiShoppingBag4Line className="text-[#583FA8] text-[14px]" />
        </div>
      </div>

      {/* ❤️ Heart Icon - Top Right */}
      <div
        className="absolute top-2 right-2 z-10"
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorited((prev) => !prev);
        }}
      >
        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
          <FaHeart
            className={`text-sm transition-colors duration-200 ${
              isFavorited ? "text-pink-600" : "text-gray-400"
            }`}
          />
        </div>
      </div>

      {/* ✅ Success Message */}
      {showMessage && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded shadow-md z-50">
          Item has been added to cart
        </div>
      )}

      {/* Product Image */}
      <div className="h-40 w-full flex justify-center items-center mb-2">
        <img
          src={item.image1 || "/assets/images/default_image.jpg"}
          alt={item.name}
          className="h-full object-contain"
        />
      </div>

      {/* Product Name */}
      <h2 className="text-sm font-medium leading-tight mb-1 px-2">
        {item.name}
      </h2>

      {/* Price */}
      <div className="flex justify-center items-center gap-2 mb-1">
        <span className="text-red-600 font-bold text-base">
          {finalPrice} {finalPrice !== "N/A" && "PKR"}
        </span>
        {discountedPrice > 0 && discountedPrice < basePrice && (
          <span className="text-gray-400 text-sm line-through">
            {basePrice.toFixed(2)} PKR
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
