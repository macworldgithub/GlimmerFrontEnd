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
import { formatSlug, sanitizeSlug } from "@/lib/utils";
import { RealCardItem } from "@/data";
import Image from "next/image";

const ProductCard: React.FC<{ products: RealCardItem }> = ({ products }) => {
  console.log(products);
  const router = useRouter();
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  let queryParams = new URLSearchParams();
  queryParams.append("id", products._id.toString());
  if (products.rate_of_salon)
    queryParams.append("rate", products.rate_of_salon.toString());
  if (products.ref_of_salon) queryParams.append("ref", products.ref_of_salon);
  //@ts-ignore
  if (products.store) queryParams.append("storeId", products.store);

  const categorySlug = sanitizeSlug(
    products.category?.slug,
    products.category?._id
  );
  const subCategorySlug = sanitizeSlug(
    products.sub_category?.slug,
    products.sub_category?._id
  );
  const itemSlug = products.item
    ? sanitizeSlug(products.item?.slug, products.item?._id)
    : undefined;

  const productSlug = products.name ? formatSlug(products.name) : products._id;

  const path = itemSlug
    ? `/${categorySlug}/${subCategorySlug}/${itemSlug}/${productSlug}`
    : `/${categorySlug}/${subCategorySlug}/${productSlug}`;

  const finalPath = `${path}?${queryParams.toString()}`;
  console.log(finalPath);
  const basePrice = Number(products.base_price) || 0;
  const discountedPrice = Number(products.discounted_price) || 0;

  let finalPrice = "N/A";
  if (basePrice > 0) {
    finalPrice =
      discountedPrice > 0 && discountedPrice < basePrice
        ? discountedPrice.toFixed(0)
        : basePrice.toFixed(0);
  }

  return (
    <div
      className="w-[48%] sm:w-[48%] md:w-[31%] lg:w-[23%] xl:w-[18%] h-[310px] sm:h-[320px] md:h-[340px] rounded-xl transition duration-300 cursor-pointer snap-start shrink-0 relative overflow-hidden flex flex-col items-center text-center m-1"
      onClick={() => router.push(finalPath)}
    >
      {/* Add to Cart Button (Responsive top position) */}
      <div
        className="absolute top-5 sm:top-2 left-2 z-10"
        onClick={(e) => {
          e.stopPropagation();
          const productWithQuantity = { ...products, quantity: 1 };
          dispatch(addItem({ product: productWithQuantity, quantity: 1 }));
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 2000);
        }}
      >
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center 
        ${
          products.quantity === 0
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-purple-100"
        }`}
        >
          <RiShoppingBag4Line
            className={`text-[13px] ${
              products.quantity === 0 ? "text-gray-400" : "text-[#583FA8]"
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
        <Image
          src={products.image1 || "/assets/images/default_image.jpg"}
          alt={products.name || "Product image"}
          width={200}
          height={200}
          sizes="(max-width: 768px) 50vw, 200px"
          className="h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Discount Badge (Responsive top position) */}
      {products?.base_price > products?.discounted_price &&
        products?.discounted_price > 0 && (
          <div className="absolute top-5 sm:top-2 right-2 z-10">
            <span className="bg-[#583FA8] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              {`${Math.round(
                ((products.base_price - products.discounted_price) /
                  products.base_price) *
                  100
              )}% OFF`}
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
        <div className="flex flex-col items-center gap-1">
          <div className="flex justify-center items-center gap-2">
            <span className="text-red-600 font-bold text-sm">
              {Number.isInteger(finalPrice) ? finalPrice : finalPrice} PKR
            </span>
            {discountedPrice > 0 && discountedPrice < basePrice && (
              <span className="text-gray-400 text-xs line-through">
                {Number.isInteger(basePrice) ? basePrice : basePrice.toFixed(2)}{" "}
                PKR
              </span>
            )}
          </div>

          {/* Out of Stock Label (Now shown below price) */}
          {products.quantity === 0 && (
            <span
              className="bg-gradient-to-r from-red-600 to-red-500 
               text-white text-[11px] font-bold 
               px-3 py-1 rounded-full shadow-md mt-1 
               border border-red-700 animate-pulse"
            >
              🔴 Out of Stock
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
