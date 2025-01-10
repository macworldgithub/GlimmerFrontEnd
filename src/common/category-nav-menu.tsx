"use client";
import { cn } from "@/lib/utils";
// Navbar.tsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FaSortDown } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
// import { categories } from './categoriesData';
// categoriesData.ts
export const categories = [
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
        items: [],
      },
      {
        name: "Eye Care",
        items: [],
      },
      {
        name: "Lip Care",
        items: [],
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
      { name: "Men", items: [] },
      { name: "Women", items: [] },
      { name: "Unisex", items: [] },
      { name: "Deodorant", items: [] },
      { name: "Body Spray & Mists", items: [] },
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
  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleMouseEnter = (categoryName: string) => {
    setHoveredCategory(categoryName);
  };

  const clickAgain = (categoryName: string) => {
    if (categoryName === hoveredCategory) {
      setHoveredCategory(null);
    } else {
      handleMouseEnter(categoryName);
    }
  };

  const renderCard = () => {
    if (!hoveredCategory) return null;

    const category = categories.find((cat) => cat.name === hoveredCategory);

    if (!category) return null;

    return ReactDOM.createPortal(
      <div
        className={cn(
          "fixed container top-[105px] left-1/2 transform -translate-x-1/2 bg-base-300 shadow-lg rounded-lg w-full md:w-11/12 max-h-60 md:max-h-full overflow-y-auto p-4 mt-2 z-50 absolute"
        )}
        // onMouseEnter={() => setHoveredCategory(hoveredCategory)}
        // onTouchStart={() => setHoveredCategory(hoveredCategory)} // Mobile touch event
        // onTouchEnd={handleMouseLeave} // Mobile touch event
        // onMouseLeave={handleMouseLeave}

        onClick={() => setHoveredCategory(hoveredCategory)}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="container mx-auto flex flex-wrap">
          {categories.map((category, subIndex) => (
            <div key={subIndex} className="w-full md:w-1/4 lg:w-1/6 p-2">
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              {category.subcategories.map((subcat, index) => (
                <div
                  key={index}
                  onClick={() =>
                    //@ts-ignore
                    // router.push({
                    //   pathname: "/",
                    //   query: {
                    //     category: category.name,
                    //     subcategory: subcat.name,
                    //     page_no: 1,
                    //   },
                    // })

                    router.push(
                      `/category=${category.name}?subcategory=${subcat.name}?page_no=1`
                    )
                  }
                  className="bg-gray-100 p-4 rounded-lg mb-2 bg-red-600 cursor-pointer"
                >
                  <p className="text-black font-medium">{subcat.name}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className={cn("bg-primary", className)}>
      <div className="flex lg:justify-center overflow-x-auto whitespace-nowrap ">
        {categories.map((category, i) => (
          <div
            key={category.name}
            className="relative "
            // onMouseEnter={() => handleMouseEnter(category.name)}
            // onMouseLeave={handleMouseLeave}
            onClick={() => clickAgain(category.name)}
          >
            <button
              className={cn(
                "btn btn-primary min-w-[150px] flex-none rounded-none text-neutral text-nowrap flex flex-row",
                i === 0 && "rounded-l-md",
                i === categories.length - 1 && "rounded-r-md"
              )}
            >
              <span>{category.name}</span>
              <FaSortDown className="size-3 mb-1 -ml-1" />
            </button>
          </div>
        ))}
      </div>
      {renderCard()}
    </div>
  );
};

export default CategoryNavMenu;
