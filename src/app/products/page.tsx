// "use client";

// import React, { Suspense, useEffect, useState } from "react";
// import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import CategoryNavMenu from "@/common/category-nav-menu";
// import Card from "@/common/Card";
// import { getAllProductItem, getAllProducts } from "@/api/product";
// import Sidebar from "@/common/Sidebar";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { BiChevronDown } from "react-icons/bi";

// interface CategorySelection {
//   category_id: string;
//   category_name: string;
//   sub_categories: {
//     sub_category_id: string;
//     name: string;
//     items: {
//       item_id: string;
//       name: string;
//     }[];
//   }[];
// }

// const priceOptions = ["Low to High", "High to Low"];

// // A loading component for suspense fallback
// const Loading = () => (
//   <div className="justify-center flex min-h-[70vh] w-full items-center">
//     <div className="text-center font-bold text-3xl">Loading...</div>
//   </div>
// );

// const ProductsList = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [total, setTotal] = useState(0);
//   const [selections, setSelections] = useState<CategorySelection[]>([]);
//   const [activeSort, setActiveSort] = useState("Date");
//   const [showPriceDropdown, setShowPriceDropdown] = useState(false);
//   const [showRatingDropdown, setShowRatingDropdown] = useState(false);
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
//   const [ratingFilter, setRatingFilter] = useState<number | null>(null);
//   const pageSize = 8;

//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();

//   const categoryFilter = searchParams.get("category") ?? "";
//   const subCategoryFilter = searchParams.get("sub_category") ?? "";
//   const itemFilter = searchParams.get("item") ?? "";
//   const nameFilter = searchParams.get("name") ?? "";
//   const minPriceFilter = Number(searchParams.get("minPrice")) ?? 0;
//   const maxPriceFilter = Number(searchParams.get("maxPrice")) ?? 0;
//   const createdAtFilter = searchParams.get("created_at");
//   const page = Number(searchParams.get("page")) || 1;

//   useEffect(() => {
//     const fetchSelections = async () => {
//       try {
//         const productItemsRes = await getAllProductItem();
//         const transformedSelections = transformData(productItemsRes);
//         setSelections(transformedSelections);
//       } catch (error) {
//         console.error("Error fetching selections:", error);
//       }
//     };
//     fetchSelections();
//   }, []);

//   function transformData(data: any[]): CategorySelection[] {
//     return data.map((category) => ({
//       category_id: category.product_category._id,
//       category_name: category.product_category.name,
//       sub_categories: category.sub_categories.map((subCategory: any) => ({
//         sub_category_id: subCategory._id,
//         name: subCategory.name,
//         items: subCategory.items.map((item: any) => ({
//           item_id: item._id,
//           name: item.name,
//         })),
//       })),
//       created_at: category.product_category.created_at,
//     }));
//   }

//   const fetchData = async () => {
//     try {
//       const sort_by = activeSort === "Price" ? "price" : undefined;
//       const res = await getAllProducts(
//         categoryFilter,
//         subCategoryFilter,
//         itemFilter,
//         nameFilter,
//         minPriceFilter,
//         maxPriceFilter,
//         page,
//         sort_by,
//         sortOrder
//       );

//       let filteredProducts = res.products.filter((product: any) => {
//         const productName = product.name?.toLowerCase() || "";
//         const productPrice = Number(product.discounted_price ?? product.base_price) || 0;
//         const productCreatedAt = new Date(product.created_at);
//         const min = minPriceFilter ? Number(minPriceFilter) : undefined;
//         const max = maxPriceFilter ? Number(maxPriceFilter) : undefined;
//         const matchesPrice = (min !== undefined ? productPrice >= min : true) &&
//           (max !== undefined ? productPrice <= max : true);
//         const matchesName = nameFilter
//           ? productName.includes(nameFilter.toLowerCase())
//           : true;
//         const matchesCreatedAt = createdAtFilter
//           ? productCreatedAt >= new Date(createdAtFilter)
//           : true;
//         return matchesPrice && matchesName && matchesCreatedAt;
//       });

//       if (activeSort === "Date") {
//         filteredProducts.sort((a: any, b: any) => {
//           return sortOrder === "desc"
//             ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//             : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
//         });
//       }

//       setData(filteredProducts);
//       setTotal(res.total || filteredProducts.length);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [
//     page,
//     categoryFilter,
//     subCategoryFilter,
//     itemFilter,
//     nameFilter,
//     minPriceFilter,
//     maxPriceFilter,
//     activeSort,
//     sortOrder,
//   ]);

//   const handlePageChange = (newPage: number) => {
//     const params = new URLSearchParams(searchParams);
//     params.set("page", newPage.toString());
//     router.push(`${pathname}?${params.toString()}`, { scroll: false });

//   };

//   const handleFilterChange = (newFilters: {
//     category?: string;
//     sub_category?: string;
//     item?: string;
//     name?: string;
//     minPrice?: string;
//     maxPrice?: string;
//   }) => {
//     const params = new URLSearchParams(searchParams);

//     params.set("page", "1");

//     if (newFilters.category) {
//       params.set("category", newFilters.category);
//       if (newFilters.category !== searchParams.get("category")) {
//         params.delete("sub_category");
//         params.delete("item");
//       }
//     }

//     // Handle subcategory changes
//     if (newFilters.sub_category !== undefined) {
//       if (newFilters.sub_category) {
//         params.set("sub_category", newFilters.sub_category);
//       } else {
//         params.delete("sub_category");
//       }
//       // When subcategory changes, remove item
//       params.delete("item");
//     }

//     // Handle item changes
//     if (newFilters.item !== undefined) {
//       if (newFilters.item) {
//         params.set("item", newFilters.item);
//       } else {
//         params.delete("item");
//       }
//     }

//     // Handle other filters
//     if (newFilters.name !== undefined) {
//       if (newFilters.name) {
//         params.set("name", newFilters.name);
//       } else {
//         params.delete("name");
//       }
//     }
//     if (newFilters.minPrice !== undefined) {
//       if (newFilters.minPrice) {
//         params.set("minPrice", newFilters.minPrice);
//       } else {
//         params.delete("minPrice");
//       }
//     }
//     if (newFilters.maxPrice !== undefined) {
//       if (newFilters.maxPrice) {
//         params.set("maxPrice", newFilters.maxPrice);
//       } else {
//         params.delete("maxPrice");
//       }
//     }

//     router.push(`${pathname}?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <div className="flex flex-col w-[99vw] pb-[8rem]">
//       {/* Category Navigation Menu */}
//       <div className="w-full mb-4">
//         <CategoryNavMenu />
//       </div>
//       {/* Banner Image */}
// <div className="hidden md:block pt-[3rem] px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[6rem] xl:px-[12rem]">
//   <div className="w-full h-[50vh] sm:h-[50vh] md:h-[50vh] lg:h-[50vh] xl:h-[50vh] rounded-lg overflow-hidden relative group">
//     <img
//       src="/assets/images/banner.png"
//       alt="Banner"
//       className="w-full h-full transition-transform duration-500"
//     />
//     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-500 px-4 lg:p-[8rem]">
//       <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center">
//         Explore Our Best Collection

//       </h1>

//       {/* Breadcrumbs inside banner under heading */}
//       <div className="breadcrumbs mt-4 text-white text-base sm:text-lg lg:text-xl text-center">
//         <Link
//           href="/"
//           className="text-white font-medium"
//         >
//           Home
//         </Link>
//         <span className="mx-2 text-white font-medium">/</span>
//         <Link
//           href="/selfcare-products"
//           className="text-white font-medium"
//         >
//           Selfcare Products
//         </Link>

//         {(categoryFilter || subCategoryFilter || itemFilter || nameFilter) && (
//           <>
//             <span className="mx-2 text-purple-200">/</span>
//             <span className="text-purple-200 font-medium">
//               Products
//             </span>
//           </>
//         )}
//       </div>
//     </div>
//   </div>
// </div>

//       {/* Content Area: Sidebar & Items Grid */}
//       <div className="flex flex-col md:flex-row px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[5rem] xl:px-[10rem] lg:py-[2rem]">
//         {/* Sidebar */}
//         <motion.aside
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="w-full md:w-[30%] lg:w-[30%] p-6"
//         >
//           <Sidebar
//             selections={selections}
//             onFilterChange={handleFilterChange}
//           />
//         </motion.aside>

//         {/* Main Content */}
//         <motion.main
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="w-full"
//         >
//           {/* SORT BY*/}
//           <div className="flex flex-wrap md:flex-row sm:flex-col items-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8">
//             <span className="text-gray-700 text-[20px]">Sort by</span>

//             <button
//               onClick={() => {
//                 setActiveSort("Date");
//                 setSortOrder(sortOrder === "desc" ? "asc" : "desc");
//               }}
//               className={`border px-6 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out ${activeSort === "Date" ? "border-purple-800 text-purple-800 bg-purple-100" : "border-gray-400 text-gray-700 hover:bg-[#FDF3D2]"
//                 }`}
//             >
//               Date {activeSort === "Date" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
//             </button>

//             <div className="relative">
//               <button
//                 onClick={() => setShowPriceDropdown(!showPriceDropdown)}
//                 className={`flex items-center gap-2 border px-6 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out ${activeSort === "Price" ? "border-purple-800 text-purple-800 bg-purple-100" : "border-gray-400 text-gray-700 hover:bg-[#FDF3D2]"
//                   }`}
//               >
//                 Price {activeSort === "Price" ? (sortOrder === "desc" ? "↓" : "↑") : ""} <BiChevronDown size={20} />
//               </button>

//               {showPriceDropdown && (
//                 <div className="absolute z-50 left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg">
//                   <button
//                     onClick={() => {
//                       setActiveSort("Price");
//                       setSortOrder("asc");
//                       setShowPriceDropdown(false);
//                     }}
//                     className="block w-full text-left px-5 py-3 text-lg font-medium hover:bg-gray-200"
//                   >
//                     Low to High
//                   </button>
//                   <button
//                     onClick={() => {
//                       setActiveSort("Price");
//                       setSortOrder("desc");
//                       setShowPriceDropdown(false);
//                     }}
//                     className="block w-full text-left px-5 py-3 text-lg font-medium hover:bg-gray-200"
//                   >
//                     High to Low
//                   </button>
//                 </div>
//               )}
//             </div>

//           </div>

//           <div className=" w-full h-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-10 p-6">
//             {data.length ? (
//               data.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   whileHover={{ scale: 1.03 }}
//                   className="flex"
//                 >
//                   <Card item={item} />
//                 </motion.div>
//               ))
//             ) : (
//               <div className="col-span-full flex justify-center items-center min-h-[70vh]">
//                 <div className="text-center font-bold text-3xl">
//                   Oops! No items to display in this category
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Pagination */}
//           {total > 0 && (
//             <div className="w-full flex justify-center items-center space-x-2 py-4">
//               <button
//                 onClick={() => handlePageChange(page - 1)}
//                 disabled={page === 1}
//                 className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="text-lg text-gray-600">
//                 Page {page} of {Math.ceil(total / pageSize)}
//               </span>
//               <button
//                 onClick={() => handlePageChange(page + 1)}
//                 disabled={page === Math.ceil(total / pageSize)}
//                 className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </motion.main>
//       </div>
//     </div>
//   );
// };

// const Temp = () => {
//   return (
//     <Suspense fallback={<Loading />}>
//       <ProductsList />
//     </Suspense>
//   );
// };

// export default Temp;
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import CategoryNavMenu from "@/common/category-nav-menu";
import Card from "@/common/Card";
import { getAllProductItem, getAllProducts } from "@/api/product";
import Sidebar from "@/common/Sidebar";
import { motion } from "framer-motion";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";

interface CategorySelection {
  category_id: string;
  category_name: string;
  sub_categories: {
    sub_category_id: string;
    name: string;
    items: {
      item_id: string;
      name: string;
    }[];
  }[];
}

const priceOptions = ["Low to High", "High to Low"];

const Loading = () => (
  <div className="justify-center flex min-h-[70vh] w-full items-center">
    <div className="text-center font-bold text-3xl">Loading...</div>
  </div>
);

const ProductsList = () => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [selections, setSelections] = useState<CategorySelection[]>([]);
  const [activeSort, setActiveSort] = useState("Date");
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const pageSize = 8;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const categoryFilter = searchParams.get("category") ?? "";
  const subCategoryFilter = searchParams.get("sub_category") ?? "";
  const itemFilter = searchParams.get("item") ?? "";
  const nameFilter = searchParams.get("name") ?? "";
  const minPriceFilter = Number(searchParams.get("minPrice")) ?? 0;
  const maxPriceFilter = Number(searchParams.get("maxPrice")) ?? 0;
  const createdAtFilter = searchParams.get("created_at");
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchSelections = async () => {
      try {
        const productItemsRes = await getAllProductItem();
        const transformedSelections = transformData(productItemsRes);
        setSelections(transformedSelections);
      } catch (error) {
        console.error("Error fetching selections:", error);
      }
    };
    fetchSelections();
  }, []);

  function transformData(data: any[]): CategorySelection[] {
    return data.map((category) => ({
      category_id: category.product_category._id,
      category_name: category.product_category.name,
      sub_categories: category.sub_categories.map((subCategory: any) => ({
        sub_category_id: subCategory._id,
        name: subCategory.name,
        items: subCategory.items.map((item: any) => ({
          item_id: item._id,
          name: item.name,
        })),
      })),
      created_at: category.product_category.created_at,
    }));
  }

  const fetchData = async () => {
    try {
      const sort_by = activeSort === "Price" ? "price" : undefined;
      const res = await getAllProducts(
        categoryFilter,
        subCategoryFilter,
        itemFilter,
        nameFilter,
        minPriceFilter,
        maxPriceFilter,
        page,
        sort_by,
        sortOrder
      );

      // Calculate final price for each product
      const filteredProducts = res.products
        .map((product: any) => ({
          ...product,
          finalPrice:
            product.discounted_price > 0
              ? (
                  product.base_price -
                  (product.base_price * product.discounted_price) / 100
                ).toFixed(2)
              : product.base_price.toFixed(2),
        }))
        .filter((product: any) => {
          const productName = product.name?.toLowerCase() || "";
          const productPrice = Number(product.finalPrice) || 0;
          const productCreatedAt = new Date(product.created_at);
          const min = minPriceFilter ? Number(minPriceFilter) : undefined;
          const max = maxPriceFilter ? Number(maxPriceFilter) : undefined;
          const matchesPrice =
            (min !== undefined ? productPrice >= min : true) &&
            (max !== undefined ? productPrice <= max : true);
          const matchesName = nameFilter
            ? productName.includes(nameFilter.toLowerCase())
            : true;
          const matchesCreatedAt = createdAtFilter
            ? productCreatedAt >= new Date(createdAtFilter)
            : true;
          return matchesPrice && matchesName && matchesCreatedAt;
        });

      if (activeSort === "Date") {
        filteredProducts.sort((a: any, b: any) => {
          return sortOrder === "desc"
            ? new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            : new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime();
        });
      } 
      setData(filteredProducts);
      setTotal(res.total || filteredProducts.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    page,
    categoryFilter,
    subCategoryFilter,
    itemFilter,
    nameFilter,
    minPriceFilter,
    maxPriceFilter,
    activeSort,
    sortOrder,
  ]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (newFilters: {
    category?: string;
    sub_category?: string;
    item?: string;
    name?: string;
    minPrice?: string;
    maxPrice?: string;
  }) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (newFilters.category) {
      params.set("category", newFilters.category);
      if (newFilters.category !== searchParams.get("category")) {
        params.delete("sub_category");
        params.delete("item");
      }
    }

    if (newFilters.sub_category !== undefined) {
      if (newFilters.sub_category) {
        params.set("sub_category", newFilters.sub_category);
      } else {
        params.delete("sub_category");
      }
      params.delete("item");
    }

    if (newFilters.item !== undefined) {
      if (newFilters.item) {
        params.set("item", newFilters.item);
      } else {
        params.delete("item");
      }
    }

    if (newFilters.name !== undefined) {
      if (newFilters.name) {
        params.set("name", newFilters.name);
      } else {
        params.delete("name");
      }
    }
    if (newFilters.minPrice !== undefined) {
      if (newFilters.minPrice) {
        params.set("minPrice", newFilters.minPrice);
      } else {
        params.delete("minPrice");
      }
    }
    if (newFilters.maxPrice !== undefined) {
      if (newFilters.maxPrice) {
        params.set("maxPrice", newFilters.maxPrice);
      } else {
        params.delete("maxPrice");
      }
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col w-[99vw] pb-[8rem]">
      <div className="w-full mb-4">
        <CategoryNavMenu />
      </div>
      <div className="hidden md:block pt-[3rem] px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[6rem] xl:px-[12rem]">
        <div className="w-full h-[50vh] sm:h-[50vh] md:h-[50vh] lg:h-[50vh] xl:h-[50vh] rounded-lg overflow-hidden relative group">
          <img
            src="/assets/images/banner.png"
            alt="Banner"
            className="w-full h-full transition-transform duration-500"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-500 px-4 lg:p-[8rem]">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center">
              Explore Our Best Collection
            </h1>
            <div className="breadcrumbs mt-4 text-white text-base sm:text-lg lg:text-xl text-center">
              <Link href="/" className="text-white font-medium">
                Home
              </Link>
              <span className="mx-2 text-white font-medium">/</span>
              <Link
                href="/selfcare-products"
                className="text-white font-medium"
              >
                Selfcare Products
              </Link>

              {(categoryFilter ||
                subCategoryFilter ||
                itemFilter ||
                nameFilter) && (
                <>
                  <span className="mx-2 text-purple-200">/</span>
                  <span className="text-purple-200 font-medium">Products</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[5rem] xl:px-[10rem] lg:py-[2rem]">
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-[30%] lg:w-[30%] p-6"
        >
          <Sidebar
            selections={selections}
            onFilterChange={handleFilterChange}
          />
        </motion.aside>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="flex flex-wrap md:flex-row sm:flex-col items-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8">
            <span className="text-gray-700 text-[20px]">Sort by</span>
            <button
              onClick={() => {
                setActiveSort("Date");
                setSortOrder(sortOrder === "desc" ? "asc" : "desc");
              }}
              className={`border px-6 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out ${
                activeSort === "Date"
                  ? "border-purple-800 text-purple-800 bg-purple-100"
                  : "border-gray-400 text-gray-700 hover:bg-[#FDF3D2]"
              }`}
            >
              Date{" "}
              {activeSort === "Date" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className={`flex items-center gap-2 border px-6 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out ${
                  activeSort === "Price"
                    ? "border-purple-800 text-purple-800 bg-purple-100"
                    : "border-gray-400 text-gray-700 hover:bg-[#FDF3D2]"
                }`}
              >
                Price{" "}
                {activeSort === "Price"
                  ? sortOrder === "desc"
                    ? "↓"
                    : "↑"
                  : ""}{" "}
                <BiChevronDown size={20} />
              </button>
              {showPriceDropdown && (
                <div className="absolute z-50 left-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      setActiveSort("Price");
                      setSortOrder("asc");
                      setShowPriceDropdown(false);
                    }}
                    className="block w-full text-left px-5 py-3 text-lg font-medium hover:bg-gray-200"
                  >
                    Low to High 
                  </button>
                  <button
                    onClick={() => {
                      setActiveSort("Price");
                      setSortOrder("desc");
                      setShowPriceDropdown(false);
                    }}
                    className="block w-full text-left px-5 py-3 text-lg font-medium hover:bg-gray-200"
                  >
                    High to Low
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-10 p-6">
            {data.length ? (
              data.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.03 }}
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
          {total > 0 && (
            <div className="w-full flex justify-center items-center space-x-2 py-4">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-lg text-gray-600">
                Page {page} of {Math.ceil(total / pageSize)}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === Math.ceil(total / pageSize)}
                className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </motion.main>
      </div>
    </div>
  );
};

const Temp = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsList />
    </Suspense>
  );
};

export default Temp;
