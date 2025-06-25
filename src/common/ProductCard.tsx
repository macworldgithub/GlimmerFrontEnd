"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/reduxStore";
import { FaHeart } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { Rating } from "react-simple-star-rating";
import { getAllProducts, getAllProductsHighlights } from "@/api/product";

interface RealCardItem {
  _id: number;
  name: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  base_price: number;
  discounted_price: number;
  category: string;
  sub_category: string;
  item: string;
  rate_of_salon: number;
  ref_of_salon: string;
}

const ProductCard: React.FC<{ products: RealCardItem; }> = ({ products }) => {
  console.log(products);
  const router = useRouter();
  let queryParams = new URLSearchParams();

  if (products.rate_of_salon) queryParams.append("rate", products.rate_of_salon.toString());
  if (products.ref_of_salon) queryParams.append("ref", products.ref_of_salon);

  //@ts-ignore
  if (products.store) queryParams.append("storeId", products.store);

  //@ts-ignore
  const path = `/${products.category}/${products.sub_category}/${products.item}/${products._id}`;
  const finalPath = queryParams.toString() ? `${path}?${queryParams.toString()}` : path;
  return (
    <div className="w-[280px] h-[320px] sm:w-[300px] sm:h-[350px] md:max-w-[320px] md:h-[370px] bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transition duration-300 cursor-pointer snap-start shrink-0 relative overflow-visible"
      onClick={() => router.push(finalPath)}>
      {/* Top 50% Image */}
      <div className="relative w-full h-1/2">
        <img
          src={products.image1 || "/assets/images/default_image.jpg"}
          alt={products.name}
          className="w-full h-full object-cover rounded-t-2xl"
        />

        {/* Discount badge */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 w-full 
                 justify-center px-2 max-md:justify-between">
          <button
            className=" w-full py-2 max-xl:py-1 xl:gap-2 max-xl:gap-[2px] max-xl:px-1  gap-1 bg-[#583FA8]  flex justify-center items-center 
                   max-md:py-1  rounded-md max-lg:px-2 max-lg:gap-1 max-md:w-fit">
            <RiShoppingBag4Line size={20} className="text-white max-lg:h-5 max-lg:w-5 max-md:w-7 max-md:h-7" />
            <p className="text-white text-[12px] mt-1 max-xl:text-[8px] max-lg:text-6px max-sm:text-[9px] max-md:hidden">
              ADD TO BAG
            </p>
          </button>

          <div className="md:h-8 mt-1 px-2  border-[#583FA8] border border-solid bg-white flex justify-center items-center 
                      max-md:h-[32px] max-sm:h-[30px] rounded-md ">
            <FaHeart className="text-purple-300 hover:text-purple-800 text-base max-md:w-6  max-md:h-6 max-sm:text-xs" />
          </div>
        </div>
        {products?.base_price > products?.discounted_price && products?.discounted_price > 0 && (
          <div className="absolute -top-0 -right-3 w-10 h-10 z-10">
            <img
              src="/assets/addtoBag/discount.png"
              alt="Discount"
              className="w-full h-full"
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center text-white text-xs leading-tight font-bold">
              <span>{`${Math.round(((products.base_price - products.discounted_price) / products.base_price) * 100)}%`}</span>
              <span className="text-[8px] font-normal">OFF</span>
            </span>
          </div>
        )}
      </div>

      {/* Bottom 50% Content */}
      <div className="p-4 h-1/2 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold truncate mb-1">{products.name}</h3>
          <p className="text-sm text-gray-600 truncate mb-1">{products.description}</p>
        </div>

        <div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-md font-bold text-gray-800">
              {products.discounted_price > 0 ? products.discounted_price : products.base_price} PKR
            </span>
            {products.discounted_price > 0 && products.base_price > products.discounted_price && (
              <span className="text-gray-400 text-md line-through">
                {products.base_price.toFixed(2)} PKR
              </span>
            )}
          </div>
          <div className="flex mt-2">
            <Rating
              size={20}
              initialValue={3}
              SVGstyle={{ display: "inline-flex" }}
              allowHover={false}
              fillColor="#583FA8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProductCardsProps {
  title?: string;
  className?: string;
  productProp?: RealCardItem[];
  filter?: string;
}

const ProductCards: React.FC<ProductCardsProps> = ({
  title = "Featured Products",
  className = "",
  productProp,
  filter,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<RealCardItem[]>(productProp || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [productProp, filter]);

  const fetchData = async () => {
    setLoading(true);

    try {
      if (productProp && productProp.length > 0) {
        setProducts(productProp);
      } else {
        let result;
        if (filter) {
          result = await dispatch(getAllProductsHighlights({ filter })).unwrap();
          console.log(result)
          setProducts(result[filter] || []);
        } else {
          result = await (getAllProducts());
          if (result && Array.isArray(result.products)) {
            setProducts(result.products);
          } else {
            setError("Failed to load products, unexpected response format.");
          }
        }
      }
    } catch (error) {
      console.error(error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };


  if (loading) return <p className="text-center text-gray-500">Loading salons...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className={`w-full max-w-[82rem] px-4 md:px-1 mx-auto py-10 ${className}`}>
      <h1 className="flex justify-center text-[24px] md:text-[34px] max-md:text-center mb-8">{title}</h1>
      <div className="flex overflow-x-auto gap-6 pb-4 px-4 snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {products.map((product) => (
          <ProductCard key={product._id} products={product} />
        ))}
      </div>
    </div>
  );
};


export default ProductCards;






