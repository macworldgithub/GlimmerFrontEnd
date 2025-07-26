// "use client";

// import { useEffect, useRef, useState } from "react";

// // import Router, { useRouter } from "next/router";
// import { usePathname, useRouter } from "next/navigation";
// import { development, BACKEND_URL } from "@/api/config";
// import axios from "axios";

// import { Menu, Drawer, Button } from "antd";
// import { MenuOutlined } from "@ant-design/icons";
// import Link from "next/link";
// import { DownOutlined } from "@ant-design/icons";
// import { FaArrowRight } from "react-icons/fa";

// type Item = {
//   _id: string;
//   name: string;
//   created_at: string;
//   description: string;
//   product_sub_category: string;
//   __v: number;
// };

// type SubCategory = {
//   _id: string;
//   name: string;
//   created_at: string;
//   description: string;
//   product_category: string;
//   items: Item[]; // Optional items array
//   __v: number;
// };

// type Category = {
//   _id: string;
//   sub_categories: SubCategory[];
//   product_category: {
//     _id: string;
//     name: string;
//     created_at: string;
//     description: string;
//     __v: number;
//   };
// };

// type MenuItem = {
//   key: string;
//   label: JSX.Element;
//   children?: MenuItem[];
// };

// const CategoryNavMenu = ({
//   className,
//   forceMobileStyle = false,
// }: {
//   className?: string;
//   forceMobileStyle?: boolean;
// }) => {
//   const [categories, setCategories] = useState<any[]>([]);
//   const router = useRouter();
//   const pathname = usePathname();
//   const isProductsPage = pathname === "/products";
//   const [selectedSubCategory, setSelectedSubCategory] = useState([]);
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

//   const [open, setOpen] = useState(false);

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const sortItems = (arr: any[]) => {
//     return arr.sort((a, b) => a.name.localeCompare(b.name));
//   };

//   const sortCategories = (arr: any[]) => {
//     return arr.sort((a, b) =>
//       a.product_category.name.localeCompare(b.product_category.name)
//     );
//   };

//   const transformToMenuItems = (
//     data: Category[],
//     handleClick: any
//   ): MenuItem[] => {
//     const sortedCategories = sortCategories(data);
//     return sortedCategories.map((category: any) => ({
//       key: category._id,
//       label: (
//         <span
//           onClick={(e) => {
//             e.stopPropagation();
//             handleClick(`${category._id}`);
//           }}
//         >
//           {category.product_category.name}
//         </span>
//       ),
//       children: sortItems(category.sub_categories).map((subCategory: any) => ({
//         key: `${category._id}-${subCategory._id}`,
//         label: (
//           <span
//             onClick={(e) => {
//               e.stopPropagation(); // Prevents submenu from opening
//               handleClick(`${category._id}-${subCategory._id}`);
//             }}
//           >
//             {subCategory.name}
//           </span>
//         ),
//         children: sortItems(subCategory.items).map((item: any) => ({
//           key: `${category._id}-${subCategory._id}-${item._id}`,
//           label: (
//             <span
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevents submenu from opening
//                 handleClick(`${category._id}-${subCategory._id}-${item._id}`);
//               }}
//             >
//               {item.name}
//             </span>
//           ),
//         })),
//       })),
//     }));
//   };

//   const get_all_categories = async (): Promise<void> => {
//     try {
//       const response = await axios.get<any[]>(
//         `${BACKEND_URL}/product_item/get_all_product_item`
//       );
//       setMenuItems(transformToMenuItems(response.data, HandlePath));
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     get_all_categories();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setSelectedSubCategory([]);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   function HandlePath(e: any) {
//     let path = e.split("-");
//     let str = "/products?";
//     if (path[0]) {
//       str = str + `category=${path[0]}`;
//     }
//     if (path[1]) {
//       str = str + `&sub_category=${path[1]}`;
//     }
//     if (path[2]) {
//       str = str + `&item=${path[2]}`;
//     }
//     router.push(str);

//     setSelectedSubCategory([]);

//     setOpen(false);
//   }

//   const HandleSelectCategory = (SubCategory: any) => {
//     if (selectedSubCategory?.length === 0) {
//       setSelectedSubCategory(SubCategory);
//     } else {
//       if (SubCategory?.length > 0) {
//         //@ts-ignore
//         if (
//           SubCategory[0]?.product_category ===
//           //@ts-ignore
//           selectedSubCategory[0]?.product_category
//         ) {
//           setSelectedSubCategory([]);
//         } else {
//           setSelectedSubCategory(SubCategory);
//         }
//       }
//     }
//   };

//   const onMenuClick = ({ key }: any) => {
//     // HandlePath(key);

//     console.log("opopop", key);
//   };
//   return (
//     <>
//       {!forceMobileStyle && (
//         <div
//           className={`max-md:hidden relative h-[60px] w-[99vw] flex justify-center py-2 ${
//             isProductsPage
//               ? "bg-white border-[1px] border-black"
//               : "bg-[#FBE8A5]"
//           } ${className}`}
//         >
//           <div className="flex gap-12 items-center">
//             {categories.map((item: any, index: number) => (
//               <div
//                 key={index}
//                 className="cursor-pointer hover:text-purple-900 hover:font-medium transition-all duration-500 flex items-center gap-1 select-none"
//                 onClick={() => HandleSelectCategory(item?.sub_categories)}
//               >
//                 <span>{item?.product_category?.name}</span>
//                 {item?.sub_categories && item.sub_categories.length > 0 && (
//                   <DownOutlined className="text-[12px] text-black" />
//                 )}
//               </div>
//             ))}

//             {/* ✅ Added Salons and Spa inside the same flex row */}
//             <Link
//               href="/salons"
//               onClick={() => setOpen(false)}
//               className="cursor-pointer hover:text-purple-900 hover:font-medium transition-all duration-500 flex items-center gap-1 select-none"
//             >
//               Salons and Spa
//             </Link>
//           </div>

//           <div
//             ref={dropdownRef}
//             className={`w-full justify-between px-6 py-3 flex flex-wrap gap-6 bg-white absolute top-[70px] z-50 transition-all duration-500 shadow-xl rounded-lg ${
//               selectedSubCategory.length > 0
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 -translate-y-5 pointer-events-none"
//             } overflow-y-auto max-h-[300px]`}
//           >
//             {selectedSubCategory?.map((item: any, index: number) => (
//               <div className="flex flex-col" key={index}>
//                 <p
//                   onClick={() =>
//                     HandlePath(`${item?.product_category}-${item?._id}`)
//                   }
//                   className="font-semibold text-[16px] cursor-pointer"
//                 >
//                   {item?.name}
//                 </p>
//                 <div className="flex flex-col gap-2">
//                   {item?.items?.map((product: any, i: number) => (
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

//           <Link href="/salons" className="flex">
//             <div className="flex text-white bg-[#583FA8] ml-12 px-6 py-2 rounded-md shadow-md hover:bg-[#452d88] transition-all duration-300">
//               <button>Book Salon Now </button>
//             </div>
//           </Link>
//         </div>
//       )}

//       {forceMobileStyle && (
//         <div className="px-4 pt-2">
//           <Menu
//             mode="inline"
//             items={menuItems}
//             onClick={onMenuClick}
//             className="bg-purple-100 md:bg-transparent rounded-lg p-2 transition-all duration-300 text-base font-normal"
//           />
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

    // If not found in fixed order, put them at the end
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

  const router = useRouter();
  const pathname = usePathname();
  const isProductsPage = pathname === "/products";
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory[]>([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ---- STEP 2: Fetch categories asynchronously ----
  const get_all_categories = async () => {
    try {
      const response = await axios.get<Category[]>(
        `${BACKEND_URL}/product_item/get_all_product_item`
      );
      if (response.data && response.data.length > 0) {
        setCategories(sortCategories(response.data)); // sorted API data
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories(sortCategories(fallbackCategories));
    }
  };

  useEffect(() => {
    get_all_categories(); // Run in background
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSelectedSubCategory([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    setOpen(false);
  }

  const HandleSelectCategory = (SubCategory: any) => {
    if (selectedSubCategory.length === 0) {
      setSelectedSubCategory(SubCategory);
    } else if (SubCategory.length > 0) {
      // @ts-ignore
      if (SubCategory[0]?.product_category === selectedSubCategory[0]?.product_category) {
        setSelectedSubCategory([]);
      } else {
        setSelectedSubCategory(SubCategory);
      }
    }
  };

  return (
    <>
      {!forceMobileStyle && (
        <div
          className={`max-md:hidden relative h-[60px] w-[99vw] flex justify-center py-2 ${isProductsPage ? "bg-white border-[1px] border-black" : "bg-[#FBE8A5]"
            } ${className}`}
          style={{ position: 'relative' }}
        >
          {/* ---- Top Navbar ---- */}
          <div className="flex gap-12 items-center">
            {categories.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer hover:text-purple-900 hover:font-medium transition-all duration-500 flex items-center gap-1 select-none"
                onClick={() => HandleSelectCategory(item?.sub_categories)}
              >
                <span>{item?.product_category?.name}</span>
                {item?.sub_categories && item.sub_categories.length > 0 && (
                  <DownOutlined className="text-[12px] text-black" />
                )}
              </div>
            ))}

            {/* Always visible link */}
            <Link
              href="/salons"
              onClick={() => setOpen(false)}
              className="cursor-pointer hover:text-purple-900 hover:font-medium transition-all duration-500 flex items-center gap-1 select-none"
            >
              Salons and Spa
            </Link>
          </div>

          {/* ---- Dropdown ---- */}
          <div
            ref={dropdownRef}
            className={`w-full justify-between px-6 py-3 flex flex-wrap gap-6 bg-white absolute top-[58px] z-50 transition-all duration-500 shadow-xl rounded-lg ${selectedSubCategory.length > 0
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5 pointer-events-none"
              } overflow-y-auto max-h-[300px]`}
          >
            {selectedSubCategory?.map((item, index) => (
              <div className="flex flex-col" key={index}>
                <p
                  onClick={() => HandlePath(`${item?.product_category}-${item?._id}`)}
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
              <button>Book Salon Now</button>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default CategoryNavMenu;
