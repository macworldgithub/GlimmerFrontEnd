"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Breadcrumbs = () => {
  const searchParams = useSearchParams();

  // Extract query parameters for CategoryNavMenu selection
  const category = searchParams.get("category");
  const subCategory = searchParams.get("sub_category");
  const item = searchParams.get("item");

  return (
    <div className="breadcrumbs mb-4 text-xl lg:text-xl px-10">
      {/* Home Link */}
      <Link href="/" className="text-gray-500 font-medium text-base lg:text-xl">
        Home 
      </Link>

    

      {/* Static Selfcare Products Link */}
      <span className="mx-2 text-gray-500 text-base lg:text-xl">/</span>
      <Link
        href="/products"
        className="text-purple-800 font-medium text-base lg:text-xl"
      >
        Selfcare Products
      </Link>



      {/* When Category, SubCategory, or Item is Selected, Show "Products" */}
      {(category || subCategory || item) && (
        <>
          <span className="mx-2 text-gray-500 text-base lg:text-xl">/</span>
          <Link
            href="/products"
            className="text-purple-800 font-medium text-base lg:text-xl"
          >
            Products
          </Link>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
