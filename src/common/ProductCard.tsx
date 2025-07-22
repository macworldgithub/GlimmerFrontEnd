"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/reduxStore";
import { FaHeart } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { Rating } from "react-simple-star-rating";
import { getAllProducts, getAllProductsHighlights } from "@/api/product";
import { addItem } from "@/reduxSlices/cartSlice";
import { Puff } from "react-loader-spinner";

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

const ProductCard: React.FC<{ products: RealCardItem }> = ({ products }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const basePrice = Number(products.base_price) || 0;
  const discountedPrice = Number(products.discounted_price) || 0;
  const finalPrice =
    discountedPrice > 0 && discountedPrice < basePrice
      ? discountedPrice
      : basePrice;

  let queryParams = new URLSearchParams();
  if (products.rate_of_salon)
    queryParams.append("rate", products.rate_of_salon.toString());
  if (products.ref_of_salon) queryParams.append("ref", products.ref_of_salon);
  //@ts-ignore
  if (products.store) queryParams.append("storeId", products.store);
  const path = `/${products.category}/${products.sub_category}/${products.item}/${products._id}`;
  const finalPath = queryParams.toString()
    ? `${path}?${queryParams.toString()}`
    : path;

  return (
    <div
      className="w-[48%] sm:w-[48%] md:w-[31%] lg:w-[23%] xl:w-[18%] h-[310px] sm:h-[320px] md:h-[340px] rounded-xl transition duration-300 cursor-pointer snap-start shrink-0 relative overflow-hidden flex flex-col items-center text-center m-1"
      onClick={() => router.push(finalPath)}
    >
      {/* Add to Cart Button (Top Left) */}
      <div
        className="absolute top-2 left-2 z-10"
        onClick={(e) => {
          e.stopPropagation();
          const productWithQuantity = { ...products, quantity: 1 };
          dispatch(addItem({ product: productWithQuantity, quantity: 1 }));
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 2000);
        }}
      >
        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
          <RiShoppingBag4Line className="text-[#583FA8] text-[13px]" />
        </div>
      </div>

      {/* Heart Icon (Top Right) */}
      <div
        className="absolute top-2 right-2 z-10"
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorited((prev) => !prev);
        }}
      >
        <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center">
          <FaHeart
            className={`text-xs transition-colors duration-200 ${
              isFavorited ? "text-pink-600" : "text-gray-400"
            }`}
          />
        </div>
      </div>

      {/* Success Message */}
      {showMessage && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded shadow-md z-50">
          Added to cart
        </div>
      )}

      {/* Product Image */}
      <div className="h-1/2 w-full flex justify-center items-center">
        <img
          src={products.image1 || "/assets/images/default_image.jpg"}
          alt={products.name}
          className="h-full object-contain"
        />
      </div>

      {/* Discount Badge */}
      {products?.base_price > products?.discounted_price &&
        products?.discounted_price > 0 && (
          <div className="absolute top-0 -right-3 w-10 h-10 z-10">
            <img
              src="/assets/addtoBag/discount.png"
              alt="Discount"
              className="w-full h-full"
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center text-white text-xs font-bold">
              <span>
                {`${Math.round(
                  ((products.base_price - products.discounted_price) /
                    products.base_price) *
                    100
                )}%`}
              </span>
              <span className="text-[8px] font-normal">OFF</span>
            </span>
          </div>
        )}

      {/* Bottom Content */}
      <div className="p-3 h-1/2 w-full flex flex-col justify-center items-center text-center gap-1">
        {/* Name */}
        <h3 className="text-sm font-medium text-center leading-tight line-clamp-2">
          {products.name}
        </h3>

        {/* Price */}
        <div className="flex justify-center items-center gap-2">
          <span className="text-red-600 font-bold text-sm">
            {finalPrice} PKR
          </span>
          {discountedPrice > 0 && discountedPrice < basePrice && (
            <span className="text-gray-400 text-xs line-through">
              {basePrice} PKR
            </span>
          )}
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
          result = await dispatch(
            getAllProductsHighlights({ filter })
          ).unwrap();
          console.log(result);
          setProducts(result[filter] || []);
        } else {
          result = await getAllProducts();
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

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Puff height="50" width="50" color="purple" ariaLabel="Loading" />
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className={`w-full max-w-[82rem] px-4 md:px-1 mx-auto py-0 md:py-10 ${className}`}
    >
      <h1 className="flex justify-center text-[24px] md:text-[34px] max-md:text-center mb-8">
        {title}
      </h1>
      <div className="flex overflow-x-auto gap-6 pb-4 px-4 snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {products.map((product) => (
          <ProductCard key={product._id} products={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
