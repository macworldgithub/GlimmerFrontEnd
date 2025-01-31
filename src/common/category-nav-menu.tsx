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
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();
  const [current, setCurrent] = useState("mail");

  const [isOpen, setIsOpen] = useState(false);

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

  const handleCategoryClick = (categoryName: string) => {
    setHoveredCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const onOpenChange = (keys: string[]) => {
    console.log(keys, "lal");
    setOpenKeys(keys);
  };

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

  console.log(hoveredCategory, "lol");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
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
    <div className={`bg-primary relative h-[50px] w-[99vw] ${className}`}>
      {/* Desktop Menu */}
      <div className="hidden lg:flex justify-center items-center font-sans font-semibold">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{ backgroundColor: "transparent" }}
        />
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex justify-between items-center px-4 h-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden z-50`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-2xl"
        >
          <FaTimes color="black" />
        </button>

        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          items={items}
          style={{
            backgroundColor: "white",
            height: "100vh",
            padding: "20px",
   
          }}
        />
      </div>
    </div>
  );
};

export default CategoryNavMenu;
