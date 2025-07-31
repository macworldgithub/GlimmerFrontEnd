// "use client";
// import { useEffect, useRef, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { BACKEND_URL } from "@/api/config";
// import axios from "axios";
// import { DownOutlined } from "@ant-design/icons";
// import Link from "next/link";

// type Item = {
//   _id: string;
//   name: string;
// };

// type SubCategory = {
//   _id: string;
//   name: string;
//   product_category: string;
//   items: Item[];
// };

// type Category = {
//   _id: string;
//   sub_categories: SubCategory[];
//   product_category: {
//     _id: string;
//     name: string;
//   };
// };

// // ---- FIXED CATEGORY ORDER ----
// const fixedOrder = ["Fragrance", "Hair Care", "Lenses", "Makeup", "Skin Care"];

// const sortCategories = (categories: Category[]) => {
//   return [...categories].sort((a, b) => {
//     const indexA = fixedOrder.indexOf(a.product_category.name);
//     const indexB = fixedOrder.indexOf(b.product_category.name);

//     if (indexA === -1) return 1;
//     if (indexB === -1) return -1;
//     return indexA - indexB;
//   });
// };

// const CategoryNavMenu = ({
//   className,
//   forceMobileStyle = false,
// }: {
//   className?: string;
//   forceMobileStyle?: boolean;
// }) => {
//   // ---- STEP 1: Fallback categories ----
//   const fallbackCategories: Category[] = [
//     {
//       _id: "4",
//       product_category: { _id: "4", name: "Fragrances" },
//       sub_categories: [
//         {
//           _id: "41",
//           name: "Perfumes",
//           product_category: "4",
//           items: [
//             { _id: "411", name: "Eau de Parfum" },
//             { _id: "412", name: "Eau de Toilette" },
//             { _id: "413", name: "Body Mists" },
//           ],
//         },
//         {
//           _id: "42",
//           name: "Gift Sets",
//           product_category: "4",
//           items: [
//             { _id: "421", name: "Perfume Sets" },
//             { _id: "422", name: "Miniature Sets" },
//           ],
//         },
//       ],
//     },
//     {
//       _id: "1",
//       product_category: { _id: "1", name: "Hair Care" },
//       sub_categories: [
//         {
//           _id: "11",
//           name: "Hair Treatments",
//           product_category: "1",
//           items: [
//             { _id: "111", name: "Beard Oil" },
//             { _id: "112", name: "Hair Cream" },
//             { _id: "113", name: "Hair Mask" },
//           ],
//         },
//         {
//           _id: "12",
//           name: "Styling",
//           product_category: "1",
//           items: [
//             { _id: "121", name: "Hair Spray" },
//             { _id: "122", name: "Hair Gel" },
//           ],
//         },
//         {
//           _id: "13",
//           name: "Shampoo & Conditioner",
//           product_category: "1",
//           items: [
//             { _id: "131", name: "Shampoo" },
//             { _id: "132", name: "Conditioner" },
//           ],
//         },
//       ],
//     },
//     {
//       _id: "2",
//       product_category: { _id: "2", name: "Lenses" },
//       sub_categories: [
//         {
//           _id: "21",
//           name: "Color Lenses",
//           product_category: "2",
//           items: [
//             { _id: "211", name: "Blue Lenses" },
//             { _id: "212", name: "Green Lenses" },
//             { _id: "213", name: "Brown Lenses" },
//           ],
//         },
//         {
//           _id: "22",
//           name: "Daily Lenses",
//           product_category: "2",
//           items: [
//             { _id: "221", name: "Single Day" },
//             { _id: "222", name: "Monthly Lenses" },
//           ],
//         },
//       ],
//     },
//     {
//       _id: "3",
//       product_category: { _id: "3", name: "Makeup" },
//       sub_categories: [
//         {
//           _id: "31",
//           name: "Face Makeup",
//           product_category: "3",
//           items: [
//             { _id: "311", name: "Foundation" },
//             { _id: "312", name: "Concealer" },
//             { _id: "313", name: "Compact Powder" },
//           ],
//         },
//         {
//           _id: "32",
//           name: "Eye Makeup",
//           product_category: "3",
//           items: [
//             { _id: "321", name: "Eyeliner" },
//             { _id: "322", name: "Mascara" },
//             { _id: "323", name: "Eyeshadow" },
//           ],
//         },
//         {
//           _id: "33",
//           name: "Lip Makeup",
//           product_category: "3",
//           items: [
//             { _id: "331", name: "Lipstick" },
//             { _id: "332", name: "Lip Gloss" },
//           ],
//         },
//       ],
//     },
//     {
//       _id: "5",
//       product_category: { _id: "5", name: "Skin Care" },
//       sub_categories: [
//         {
//           _id: "51",
//           name: "Moisturizers",
//           product_category: "5",
//           items: [
//             { _id: "511", name: "Day Cream" },
//             { _id: "512", name: "Night Cream" },
//           ],
//         },
//         {
//           _id: "52",
//           name: "Cleansers",
//           product_category: "5",
//           items: [
//             { _id: "521", name: "Face Wash" },
//             { _id: "522", name: "Cleansing Milk" },
//           ],
//         },
//         {
//           _id: "53",
//           name: "Sun Protection",
//           product_category: "5",
//           items: [
//             { _id: "531", name: "Sunscreen SPF 30" },
//             { _id: "532", name: "Sunscreen SPF 50" },
//           ],
//         },
//       ],
//     },
//   ];

//   const [categories, setCategories] = useState<Category[]>(
//     sortCategories(fallbackCategories)
//   );

//   const router = useRouter();
//   const pathname = usePathname();
//   const isProductsPage = pathname === "/products";
//   const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory[]>([]);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // ---- STEP 2: Fetch categories asynchronously ----
//   const get_all_categories = async () => {
//     try {
//       const response = await axios.get<Category[]>(
//         `${BACKEND_URL}/product_item/get_all_product_item`
//       );
//       if (response.data && response.data.length > 0) {
//         setCategories(sortCategories(response.data));
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setCategories(sortCategories(fallbackCategories));
//     }
//   };

//   useEffect(() => {
//     get_all_categories();
//   }, []);

//   // ---- STEP 3: Handle navigation ----
//   function HandlePath(e: string) {
//     let path = e.split("-");
//     let str = "/products?";
//     if (path[0]) str += `category=${path[0]}`;
//     if (path[1]) str += `&sub_category=${path[1]}`;
//     if (path[2]) str += `&item=${path[2]}`;
//     router.push(str);
//     setSelectedSubCategory([]);
//   }

//   const HandleSelectCategory = (subCategories: SubCategory[]) => {
//     if (subCategories.length > 0) {
//       setSelectedSubCategory(subCategories);
//     } else {
//       setSelectedSubCategory([]);
//     }
//   };

//   return (
//     <>
//       {!forceMobileStyle && (
//         <div
//           className={`max-md:hidden relative h-[60px] w-[99vw] flex justify-center py-2 ${isProductsPage
//             ? "bg-white border-[1px] border-black"
//             : "bg-[#FBE8A5]"
//             } ${className}`}
//         >
//           {/* ---- Top Navbar ---- */}
//           <div className="flex gap-12 items-center">
//             {categories.map((item, index) => (
//               <div
//                 key={index}
//                 className="cursor-pointer hover:text-purple-900 hover:font-medium transition-all duration-500 flex items-center gap-1 select-none"
//                 onClick={() => HandleSelectCategory(item?.sub_categories)}
//                 onMouseEnter={() => HandleSelectCategory(item?.sub_categories)}
//                 onMouseLeave={() => setSelectedSubCategory([])}
//               >
//                 <span>{item?.product_category?.name}</span>
//                 {item?.sub_categories && item.sub_categories.length > 0 && (
//                   <DownOutlined className="text-[12px] text-black" />
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* ---- Dropdown ---- */}
//           <div
//             ref={dropdownRef}
//             onMouseEnter={() => {}}
//             onMouseLeave={() => setSelectedSubCategory([])}
//             className={`w-full justify-between px-6 py-3 flex flex-wrap gap-6 bg-white absolute top-[58px] z-50 transition-all duration-500 shadow-xl rounded-lg ${selectedSubCategory.length > 0
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 -translate-y-5 pointer-events-none"
//               } overflow-y-auto max-h-[300px]`}
//           >
//             {selectedSubCategory?.map((item, index) => (
//               <div className="flex flex-col" key={index}>
//                 <p
//                   onClick={() => HandlePath(`${item?.product_category}-${item?._id}`)}
//                   className="font-semibold text-[16px] cursor-pointer"
//                 >
//                   {item?.name}
//                 </p>
//                 <div className="flex flex-col gap-2">
//                   {item?.items?.map((product, i) => (
//                     <p
//                       onClick={() =>
//                         HandlePath(
//                           `${item?.product_category}-${item?._id}-${product?._id}`
//                         )
//                       }
//                       className="text-[12px] sm:text-[11px] text-black hover:text-gray-900 transition-all duration-200 cursor-pointer w-[120px] sm:w-[160px] break-words whitespace-normal"
//                       key={i}
//                     >
//                       {product?.name}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ---- Book Button ---- */}
//           <Link href="/salons" className="flex">
//             <div className="flex text-white bg-[#583FA8] ml-12 px-6 py-2 rounded-md shadow-md hover:bg-[#452d88] transition-all duration-300">
//               <button>Book Salon & Spa Now</button>
//             </div>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

// export default CategoryNavMenu;

"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BACKEND_URL } from "@/api/config";
import axios from "axios";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";

type Item = {
  _id: string;
  name: string;
};

type SubCategory = {
  _id: string;
  name: string;
  product_category: string;
  items: Item[];
};

type Category = {
  _id: string;
  sub_categories: SubCategory[];
  product_category: {
    _id: string;
    name: string;
  };
};

// ---- FIXED CATEGORY ORDER ----
const fixedOrder = ["Fragrance", "Hair Care", "Lenses", "Makeup", "Skin Care"];

const sortCategories = (categories: Category[]) => {
  return [...categories].sort((a, b) => {
    const indexA = fixedOrder.indexOf(a.product_category.name);
    const indexB = fixedOrder.indexOf(b.product_category.name);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
};

const CategoryNavMenu = ({
  className,
  forceMobileStyle = false,
}: {
  className?: string;
  forceMobileStyle?: boolean;
}) => {
  // ---- STEP 1: Fallback categories ----
  const fallbackCategories: Category[] = [
    {
      _id: "4",
      product_category: { _id: "4", name: "Fragrance" },
      sub_categories: [
        {
          _id: "41",
          name: "Perfumes",
          product_category: "4",
          items: [
            { _id: "411", name: "Eau de Parfum" },
            { _id: "412", name: "Eau de Toilette" },
            { _id: "413", name: "Body Mists" },
          ],
        },
        {
          _id: "42",
          name: "Gift Sets",
          product_category: "4",
          items: [
            { _id: "421", name: "Perfume Sets" },
            { _id: "422", name: "Miniature Sets" },
          ],
        },
      ],
    },
    {
      _id: "1",
      product_category: { _id: "1", name: "Hair Care" },
      sub_categories: [
        {
          _id: "11",
          name: "Hair Treatments",
          product_category: "1",
          items: [
            { _id: "111", name: "Beard Oil" },
            { _id: "112", name: "Hair Cream" },
            { _id: "113", name: "Hair Mask" },
          ],
        },
        {
          _id: "12",
          name: "Styling",
          product_category: "1",
          items: [
            { _id: "121", name: "Hair Spray" },
            { _id: "122", name: "Hair Gel" },
          ],
        },
        {
          _id: "13",
          name: "Shampoo & Conditioner",
          product_category: "1",
          items: [
            { _id: "131", name: "Shampoo" },
            { _id: "132", name: "Conditioner" },
          ],
        },
      ],
    },
    {
      _id: "2",
      product_category: { _id: "2", name: "Lenses" },
      sub_categories: [
        {
          _id: "21",
          name: "Color Lenses",
          product_category: "2",
          items: [
            { _id: "211", name: "Blue Lenses" },
            { _id: "212", name: "Green Lenses" },
            { _id: "213", name: "Brown Lenses" },
          ],
        },
        {
          _id: "22",
          name: "Daily Lenses",
          product_category: "2",
          items: [
            { _id: "221", name: "Single Day" },
            { _id: "222", name: "Monthly Lenses" },
          ],
        },
      ],
    },
    {
      _id: "3",
      product_category: { _id: "3", name: "Makeup" },
      sub_categories: [
        {
          _id: "31",
          name: "Face Makeup",
          product_category: "3",
          items: [
            { _id: "311", name: "Foundation" },
            { _id: "312", name: "Concealer" },
            { _id: "313", name: "Compact Powder" },
          ],
        },
        {
          _id: "32",
          name: "Eye Makeup",
          product_category: "3",
          items: [
            { _id: "321", name: "Eyeliner" },
            { _id: "322", name: "Mascara" },
            { _id: "323", name: "Eyeshadow" },
          ],
        },
        {
          _id: "33",
          name: "Lip Makeup",
          product_category: "3",
          items: [
            { _id: "331", name: "Lipstick" },
            { _id: "332", name: "Lip Gloss" },
          ],
        },
      ],
    },
    {
      _id: "5",
      product_category: { _id: "5", name: "Skin Care" },
      sub_categories: [
        {
          _id: "51",
          name: "Moisturizers",
          product_category: "5",
          items: [
            { _id: "511", name: "Day Cream" },
            { _id: "512", name: "Night Cream" },
          ],
        },
        {
          _id: "52",
          name: "Cleansers",
          product_category: "5",
          items: [
            { _id: "521", name: "Face Wash" },
            { _id: "522", name: "Cleansing Milk" },
          ],
        },
        {
          _id: "53",
          name: "Sun Protection",
          product_category: "5",
          items: [
            { _id: "531", name: "Sunscreen SPF 30" },
            { _id: "532", name: "Sunscreen SPF 50" },
          ],
        },
      ],
    },
  ];

  const [categories, setCategories] = useState<Category[]>(
    sortCategories(fallbackCategories)
  );
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedSubCategories, setExpandedSubCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const router = useRouter();
  const pathname = usePathname();
  const isProductsPage = pathname === "/products";
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory[]>(
    []
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ---- STEP 2: Fetch categories asynchronously ----
  const get_all_categories = async () => {
    try {
      const response = await axios.get<Category[]>(
        `${BACKEND_URL}/product_item/get_all_product_item`
      );
      if (response.data && response.data.length > 0) {
        setCategories(sortCategories(response.data));
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories(sortCategories(fallbackCategories));
    }
  };

  useEffect(() => {
    get_all_categories();
  }, []);

  // ---- STEP 3: Handle navigation ----
  function HandlePath(e: string) {
    let path = e.split("-");
    let str = "/products?";
    if (path[0]) str += `category=${path[0]}`;
    if (path[1]) str += `&sub_category=${path[1]}`;
    if (path[2]) str += `&item=${path[2]}`;
    router.push(str);
    setSelectedSubCategory([]);
    setDropdownOpen(false);
  }

  const HandleSelectCategory = (subCategories: SubCategory[]) => {
    if (subCategories.length > 0) {
      setSelectedSubCategory(subCategories);
      setDropdownOpen(true);
    } else {
      setSelectedSubCategory([]);
      setDropdownOpen(false);
    }
  };

  const handleCategoryClick = (
    subCategories: SubCategory[],
    categoryId: string
  ) => {
    HandlePath(categoryId); // Go to /products?category=<id>

    if (dropdownOpen && selectedSubCategory === subCategories) {
      setDropdownOpen(false);
      setSelectedSubCategory([]);
    } else {
      HandleSelectCategory(subCategories);
    }
  };

  return (
    <>
      {/* ----- Desktop View ----- */}
      {!forceMobileStyle && (
        <div
          className={`max-md:hidden relative h-[60px] w-screen flex justify-center py-2 ${
            isProductsPage
              ? "bg-white border-[1px] border-black"
              : "bg-[#f0efed]"
          } ${className}`}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          {/* ---- Top Navbar ---- */}
          <div className="flex gap-12 items-center">
            {categories.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer hover:text-purple-900 hover:font-medium transition-all duration-500 flex items-center gap-1 select-none"
                onClick={() =>
                  handleCategoryClick(item?.sub_categories, item?._id)
                }
                onMouseEnter={() => HandleSelectCategory(item?.sub_categories)}
              >
                <span>{item?.product_category?.name}</span>
                {item?.sub_categories && item.sub_categories.length > 0 && (
                  <DownOutlined className="text-[12px] text-black" />
                )}
              </div>
            ))}
          </div>

          {/* ---- Dropdown ---- */}
          <div
            ref={dropdownRef}
            className={`absolute top-[58px] left-1/2 -translate-x-1/2 z-50 bg-white shadow-xl rounded-lg px-6 py-4 transition-all duration-500 flex flex-wrap gap-6 justify-between max-w-[1200px] w-full ${
              dropdownOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5 pointer-events-none"
            }`}
          >
            {selectedSubCategory?.map((item, index) => (
              <div className="flex flex-col" key={index}>
                <p
                  onClick={() =>
                    HandlePath(`${item?.product_category}-${item?._id}`)
                  }
                  className="font-semibold text-[16px] cursor-pointer"
                >
                  {item?.name}
                </p>
                <div className="flex flex-col gap-2">
                  {item?.items?.map((product, i) => (
                    <p
                      onClick={() =>
                        HandlePath(
                          `${item?.product_category}-${item?._id}-${product?._id}`
                        )
                      }
                      className="text-[12px] sm:text-[11px] text-black hover:text-gray-900 transition-all duration-200 cursor-pointer w-[120px] sm:w-[160px] break-words whitespace-normal"
                      key={i}
                    >
                      {product?.name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ---- Book Button ---- */}
          <Link href="/salons" className="flex">
            <div className="flex text-white bg-[#583FA8] ml-12 px-6 py-2 rounded-md shadow-md hover:bg-[#452d88] transition-all duration-300">
              <button>Book Salon & Spa Now</button>
            </div>
          </Link>
        </div>
      )}

      {/* ----- Mobile View ----- */}
      {forceMobileStyle && (
        <div className="space-y-4 px-4">
          {categories.map((category) => (
            <div key={category._id}>
              {/* Category row with arrow */}
              <div
                className="flex justify-between items-center font-bold text-lg cursor-pointer select-none"
                onClick={() => {
                  setExpandedCategories((prev) => ({
                    ...prev,
                    [category._id]: !prev[category._id],
                  }));
                }}
              >
                <span>{category.product_category.name}</span>
                <span className="text-xl">
                  {expandedCategories[category._id] ? "▾" : "▸"}
                </span>
              </div>

              {/* Subcategories list */}
              {expandedCategories[category._id] &&
                category.sub_categories.map((sub) => (
                  <div key={sub._id} className="ml-5 mt-2">
                    {/* Subcategory row with arrow if items exist */}
                    <div
                      className="flex justify-between items-center font-semibold text-sm cursor-pointer select-none"
                      onClick={() => {
                        setExpandedSubCategories((prev) => ({
                          ...prev,
                          [sub._id]: !prev[sub._id],
                        }));
                      }}
                    >
                      <span>{sub.name}</span>
                      {sub.items.length > 0 && (
                        <span className="text-lg">
                          {expandedSubCategories[sub._id] ? "▾" : "▸"}
                        </span>
                      )}
                    </div>

                    {/* Items list */}
                    {expandedSubCategories[sub._id] && sub.items.length > 0 && (
                      <ul className="ml-5 list-disc text-sm text-gray-700 mt-1">
                        {sub.items.map((item) => (
                          <li
                            key={item._id}
                            className="cursor-pointer hover:underline"
                            onClick={() =>
                              HandlePath(
                                `${sub.product_category}-${sub._id}-${item._id}`
                              )
                            }
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryNavMenu;
