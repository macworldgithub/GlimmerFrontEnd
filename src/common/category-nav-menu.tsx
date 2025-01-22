"use client";

import { cn } from "@/lib/utils";
import { Menu } from "antd";
import { useState } from "react";
import { FaSortDown } from "react-icons/fa";

// import Router, { useRouter } from "next/router";
import { useRouter } from "next/navigation";

interface Category {
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  name: string;
  items: string[];
}

export const categories: Category[] = [
  {
    name: "MAKE UP",
    subcategories: [
      {
        name: "Face",
        items: [
          "Concealers",
          "Blushes",
          "Primer",
          "Foundations",
          "Setting Spray",
          "Bronzer & Contouring",
          "Highlighters",
          "Setting Powder",
          "BB-Creams & CC-Creams",
          "Illuminators",
          "Face Palette",
        ],
      },
      {
        name: "Lips",
        items: [
          "Lipsticks",
          "Lip Plumper",
          "Lip Balm",
          "Lip Pencils",
          "Lip Stain",
          "Lip Gloss",
          "Lip Sets",
          "Lip Treatment",
        ],
      },
      {
        name: "Eyes",
        items: [
          "Eyelashes",
          "Eyeliner",
          "Mascara",
          "Eyeshadow",
          "Eyebrows",
          "Eye Pencil",
          "Eye Set",
        ],
      },
      {
        name: "Nails",
        items: [
          "Nail Polish Remover",
          "Fake Nails",
          "Nail Polish",
          "Nail Glue",
          "Nail Tools",
        ],
      },
      {
        name: "Accessories",
        items: [
          "Makeup Brushes",
          "Makeup & Traveler Case",
          "Beauty Tools",
          "Candle Accessories",
          "Face Brush",
          "Brush Sets",
          "Sponges",
        ],
      },
    ],
  },
  {
    name: "SKIN CARE",
    subcategories: [
      {
        name: "Cleansers",
        items: [
          "Face Wash",
          "Cleansing Balms and Oils",
          "Face Masks",
          "Makeup Remover",
          "Toners and Mists",
          "Exfoliators and Scrub",
        ],
      },
      {
        name: "Moisturisers",
        items: ["Creams & Lotions", "Gels", "Day & Night Creams"],
      },
      {
        name: "Sunscreens (SPF)",
        items: ["All"],
      },
      {
        name: "Eye Care",
        items: ["All"],
      },
      {
        name: "Lip Care",
        items: ["All"],
      },
      {
        name: "Bath & Body",
        items: [
          "Body Lotions & Creams",
          "Body Wash",
          "Body Scrubs",
          "Soap and Handwash",
          "Body Wax",
        ],
      },
      {
        name: "Men’s Care",
        items: ["After Shave", "Shaving Gel/Foam"],
      },
    ],
  },
  {
    name: "FRAGRANCE",
    subcategories: [
      { name: "Men", items: ["all"] },
      { name: "Women", items: ["all"] },
      { name: "Unisex", items: ["all"] },
      { name: "Deodorant", items: ["all"] },
      { name: "Body Spray & Mists", items: ["all"] },
    ],
  },
  {
    name: "HAIR CARE",
    subcategories: [
      {
        name: "Shampoo & Conditioner",
        items: ["Shampoo", "Conditioner"],
      },
      {
        name: "Hair Treatments",
        items: [
          "Hair Oil",
          "Hair Supplement",
          "Hair Serums",
          "Hair Fiber",
          "Beard Oil",
          "Hair Cream",
          "Hair-Serum",
          "Hair Mask",
        ],
      },
      {
        name: "Styling",
        items: [
          "Styling Cream",
          "Hair Spray",
          "Hair Color",
          "Hair Gel",
          "Dry Shampoo",
          "Hair Mist",
          "Hair Fiber",
        ],
      },
      {
        name: "Tools",
        items: [
          "Hair Brushes & Comb",
          "Hair Straightener",
          "Hair Dryer",
          "Hair Curling Irons",
          "Hair Trimmer",
          "Hair Bands",
          "Hair Waver",
          "Hair Epilator",
        ],
      },
      {
        name: "Professional Hair",
        items: [
          "Revlon Professional",
          "L'Oréal Professionnel",
          "Cosmo",
          "Behave",
          "Secret Fragrance",
        ],
      },
    ],
  },
  {
    name: "WATCHES",
    subcategories: [
      {
        name: "General",
        items: ["Item 21", "Item 22", "Item 23", "Item 24", "Item 25"],
      },
    ],
  },
  {
    name: "FASHION",
    subcategories: [
      {
        name: "General",
        items: ["Item 26", "Item 27", "Item 28", "Item 29", "Item 30"],
      },
    ],
  },
];

const CategoryNavMenu = ({ className }: { className?: string }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    setHoveredCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const HandlePath = (e: any) => {
    let path = e.key;
    path = path.split("-");
    console.log(path, "hehe");
    router.push(`/${path[0]}/${path[1]}/${path[2]}`);
  };

  return (
    <div className={cn("bg-primary relative h-[50px]", className)}>
      <div className="flex lg:justify-center overflow-x-auto whitespace-nowrap">
        {categories.map((category, i) => (
          <div key={category.name} className="relative">
            <button
              className={cn(
                "btn btn-primary min-w-[150px] w-[250px] flex-none rounded-none text-neutral text-nowrap flex flex-row items-center",
                i === 0 && "rounded-l-md",
                i === categories.length - 1 && "rounded-r-md"
              )}
              onClick={() => handleCategoryClick(category.name)} // Toggle menu on click
            >
              <span>{category.name}</span>
              <FaSortDown className="ml-2" />
            </button>
            {hoveredCategory === category.name && (
              <Menu
                style={{
                  width: "250px",
                  position: "sticky",
                  top: "100%",
                  left: 0,
                  zIndex: 999999,
                  marginTop: "2px",
                }}
                mode="vertical"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={(e) => HandlePath(e)}
                items={categories
                  .find((cat) => cat.name === category.name)
                  ?.subcategories.map((sub) => ({
                    key: sub.name,
                    label: sub.name,
                    children: sub.items.map((item) => ({
                      key: `${category.name}-${sub.name}-${item}`,
                      label: item,
                    })),
                  }))}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryNavMenu;
