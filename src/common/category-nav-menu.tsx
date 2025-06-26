"use client";

import { useEffect, useRef, useState } from "react";

// import Router, { useRouter } from "next/router";
import { usePathname, useRouter } from "next/navigation";
import { development, BACKEND_URL } from "@/api/config";
import axios from "axios";

import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { DownOutlined } from "@ant-design/icons";


type Item = {
  _id: string;
  name: string;
  created_at: string;
  description: string;
  product_sub_category: string;
  __v: number;
};

type SubCategory = {
  _id: string;
  name: string;
  created_at: string;
  description: string;
  product_category: string;
  items: Item[]; // Optional items array
  __v: number;
};

type Category = {
  _id: string;
  sub_categories: SubCategory[];
  product_category: {
    _id: string;
    name: string;
    created_at: string;
    description: string;
    __v: number;
  };
};

type MenuItem = {
  key: string;
  label: JSX.Element;
  children?: MenuItem[];
};

const CategoryNavMenu = ({ className }: { className?: string }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const isProductsPage = pathname === "/products";
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortItems = (arr: any[]) => {
    return arr.sort((a, b) => a.name.localeCompare(b.name));
  };

  const sortCategories = (arr: any[]) => {
    return arr.sort((a, b) =>
      a.product_category.name.localeCompare(b.product_category.name)
    );
  };

  const transformToMenuItems = (
    data: Category[],
    handleClick: any
  ): MenuItem[] => {
    const sortedCategories = sortCategories(data);
    return sortedCategories.map((category: any) => ({
      key: category._id,
      label: (
        <span
          onClick={(e) => {
            e.stopPropagation();
            handleClick(`${category._id}`);
          }}
        >
          {category.product_category.name}
        </span>
      ),
      children: sortItems(category.sub_categories).map((subCategory: any) => ({
        key: `${category._id}-${subCategory._id}`,
        label: (
          <span
            onClick={(e) => {
              e.stopPropagation(); // Prevents submenu from opening
              handleClick(`${category._id}-${subCategory._id}`);
            }}
          >
            {subCategory.name}
          </span>
        ),
        children: sortItems(subCategory.items).map((item: any) => ({
          key: `${category._id}-${subCategory._id}-${item._id}`,
          label: (
            <span
              onClick={(e) => {
                e.stopPropagation(); // Prevents submenu from opening
                handleClick(`${category._id}-${subCategory._id}-${item._id}`);
              }}
            >
              {item.name}
            </span>
          ),
        })),
      })),
    }));
  };

  const get_all_categories = async (): Promise<void> => {
    try {
      const response = await axios.get<any[]>(
        `${BACKEND_URL}/product_item/get_all_product_item`
      );
      setMenuItems(transformToMenuItems(response.data, HandlePath));
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      throw error;
    }
  };

  useEffect(() => {
    get_all_categories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSelectedSubCategory([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function HandlePath(e: any) {
    let path = e.split("-");
    let str = "/products?";
    if (path[0]) {
      str = str + `category=${path[0]}`;
    }
    if (path[1]) {
      str = str + `&sub_category=${path[1]}`;
    }
    if (path[2]) {
      str = str + `&item=${path[2]}`;
    }
    router.push(str);

    setSelectedSubCategory([]);

    setOpen(false);
  }

  const HandleSelectCategory = (SubCategory: any) => {
    if (selectedSubCategory?.length === 0) {
      setSelectedSubCategory(SubCategory);
    } else {
      if (SubCategory?.length > 0) {
        //@ts-ignore
        if (
          SubCategory[0]?.product_category ===
          //@ts-ignore
          selectedSubCategory[0]?.product_category
        ) {
          setSelectedSubCategory([]);
        } else {
          setSelectedSubCategory(SubCategory);
        }
      }
    }
  };

  const onMenuClick = ({ key }: any) => {
    // HandlePath(key);

    console.log("opopop", key);
  };
  return (
    <>
      <div
        className={`max-md:hidden relative h-[60px] w-[99vw] flex justify-center py-2 ${
          isProductsPage ? "bg-white border-[1px] border-black" : "bg-[#FBE8A5]"
        } ${className}`}
      >
  <div className="flex gap-12 items-center">
  {categories.map((item: any, index: number) => (
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
</div>


        {/* Menu is below which need to appear smoothly */}
        <div
          ref={dropdownRef}
          className={`w-full justify-between px-8 py-1 flex h-max bg-white absolute top-[70px] z-50 transition-all duration-500 ${
            selectedSubCategory.length > 0
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
        >
          {selectedSubCategory?.map((item: any, index: number) => (
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
                {item?.items?.map((product: any, i: number) => (
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
        <Link href="/salons" className="flex">
          <div className="flex text-white bg-[#583FA8] ml-12 px-6 py-2 rounded-md shadow-md hover:bg-[#452d88] transition-all duration-300">
            <button>Book Salon Now</button>
          </div>
        </Link>
      </div>

      <div className="md:hidden">
        <MenuOutlined
          onClick={() => setOpen(true)}
          className="pl-2 w-[50px] "
        />

        {/* Ant Design Drawer */}
        <Drawer
          title="Product Categories"
          placement="left"
          onClose={() => setOpen(false)}
          open={open}
          width={"60%"}
        >
          {/* Ant Design Menu inside Drawer */}
          <Menu mode="inline" items={menuItems} onClick={onMenuClick} />
        </Drawer>
      </div>
    </>
  );
};

export default CategoryNavMenu;
