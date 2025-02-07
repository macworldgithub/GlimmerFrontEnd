"use client";

import { cn } from "@/lib/utils";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa";

import { FaBars, FaTimes } from "react-icons/fa";

// import Router, { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { development, BACKEND_URL } from "@/api/config";
import axios from "axios";

import type { MenuProps } from "antd";

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

const CategoryNavMenu = ({ className }: { className?: string }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  type MenuItem = Required<MenuProps>["items"][number];

  const get_all_categories = async (): Promise<void> => {
    try {
      const response = await axios.get<any[]>(
        `${BACKEND_URL}/product_item/get_all_product_item`
      );
      console.log(response.data, "lellllll");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      throw error;
    }
  };

  useEffect(() => {
    get_all_categories();
  }, []);

  const HandlePath = (e: any) => {
    let path = e;
    path = path.split("-");
    console.log(path, "hehe");
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
  };

  const items: MenuItem[] = [
    {
      label: "All Categories",
      key: "allcategories",
    },
    {
      label: "Brand",
      key: "brand",
    },
    {
      label: "Product",
      key: "product",
      children: categories.map((category) => ({
        key: category._id,
        label: category?.product_category?.name,
        children: category?.sub_categories?.map((sub: any) => ({
          key: `${category._id}-${sub._id}`,
          label: sub?.name,
          children: sub?.items?.length
            ? sub.items.map((item: any) => ({
                key: `${category._id}-${sub._id}-${item._id}`,
                label: item.name,
                onClick: () =>
                  HandlePath(`${category._id}-${sub._id}-${item._id}`),
              }))
            : undefined, // Avoid empty `children` property
        })),
      })),
    },
    {
      label: "New Arrival",
      key: "newarrival",
    },
    {
      label: "Best Seller",
      key: "bestseller",
    },
    {
      label: "Discount",
      key: "discount",
    },
    {
      label: "Blogs",
      key: "blog",
    },
    {
      label: "Contact",
      key: "contact",
    },
  ];
  return (
    <div
      className={`bg-primary relative h-[max] w-[99vw] flex justify-center py-2  ${className}`}
    >
      <div className="flex gap-5 ">
        {categories.map((item: any) => (
          <div onClick={() => setSelectedSubCategory(item?.sub_categories)}>
            {item?.product_category?.name}
          </div>
        ))}
      </div>

      <div className="w-[100%] justify-between px-8 py-1 flex h-max bg-white absolute top-[50px] z-50">
        {selectedSubCategory?.map((item: any) => (
          <div className="flex flex-col">
            <p className=" font-semibold text-[20px] font-sans">{item?.name}</p>
            <div className="flex flex-col gap-2">
              {item?.items?.map((product: any) => (
                <p className="w-[160px] ">{product?.name}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryNavMenu;
