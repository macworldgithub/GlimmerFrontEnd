"use client";

import { cn } from "@/lib/utils";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa";

// import Router, { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { development } from "@/api/config";
import axios from "axios";

type SubCategory = {
    _id: string;
    name: string;
    created_at: string;
    description: string;
    product_category: string;
    items?: string[]; // Optional items array
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

type ItemsMapping = Record<string, string[]>;

const itemsMapping: ItemsMapping = {
    Face: [
        "Concealers",
        "Blushes",
        "Primer",
        "Foundations",
        "Setting Spray",
        "Bronzer & Contouring",
        "Highlighters",
        "Setting Powder",
        "BB-Creams & CC-Creams",
        "Sets",
        "Illuminators",
        "Face Palette",
    ],
    Lips: [
        "Lipsticks",
        "Lip Plumper",
        "Lip Balm",
        "Lip Pencils",
        "Lip Stain",
        "Lip Gloss",
        "Lip Sets",
        "Lip Treatment",
    ],
    Eyes: [
        "Eyelashes",
        "Eyeliner",
        "Mascara",
        "Eyeshadow",
        "Eyebrows",
        "Eye Pencil",
        "Eye Set",
    ],
    Nails: ["Nail Polish Remover", "Fake Nails", "Nail Polish", "Nail Glue", "Nail Tools"],
    Accessories: [
        "Makeup Brushes",
        "Makeup & Traveller Case",
        "Beauty Tools",
        "Candle Accessories",
        "Face Brush",
        "Brush Sets",
        "Sponges",
    ],
    Cleansers: [
        "Face Wash",
        "Cleansing Balms and oils",
        "Face Masks",
        "Makeup Remover",
        "Toners and Mists",
        "Exfoliators and Scrub",
    ],
    Moisturisers: ["Creams & Lotions", "Gels", "Day & Night Creams"],
    "Sunscreens (SPF)": [],
    "Eye Care": [],
    "Lip Care": [],
    "Bath & Body": [
        "Body Lotions & Creams",
        "Body Wash",
        "Body Scrubs",
        "Soap and Handwash",
        "Body Wax",
    ],
    "Men’s Care": ["After Shave", "Shaving Gel/Foam"],
    "Shampoo & Conditioner": ["Shampoo", "Conditioner"],
    "Hair Treatments": [
        "Hair Oil",
        "Hair Supplement",
        "Hair Serums",
        "Hair Fiber",
        "Beard Oil",
        "Hair Cream",
        "Hair-Serum",
        "Hair Mask",
    ],
    Styling: [
        "Styling Cream",
        "Hair Spray",
        "Hair Color",
        "Hair Gel",
        "Dry Shampoo",
        "Hair Mist",
        "Hair Fiber",
    ],
    Tools: [
        "Hair Brushes & Comb",
        "Hair Straightener",
        "Hair Dryer",
        "Hair Curling Irons",
        "Hair Trimmer",
        "Hair Bands",
        "Hair Waver",
        "Hair Epilator",
    ],
    "Professional Hair": [
        "Revlon Professional",
        "L'Oréal Professionnel",
        "Cosmo",
        "Behave",
        "Secret Fragrance",
    ],
    Men: [],
    Women: [],
    Unisex: [],
    Deodorant: [],
    "Body Spray & Mist": [],
};

const CategoryNavMenu = ({ className }: { className?: string }) => {
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const router = useRouter();

    const attachItemsToSubcategories = (
        categories: Category[],
        itemsMapping: ItemsMapping
    ): Category[] => {
        return categories.map((category) => {
            category.sub_categories = category.sub_categories.map((subCategory) => {
                const subCategoryName = subCategory.name;
                if (itemsMapping[subCategoryName]) {
                    subCategory.items = itemsMapping[subCategoryName];
                }
                return subCategory;
            });
            return category;
        });
    };
    const getAllSubCategories = async (): Promise<void> => {
        try {
            const response = await axios.get<any[]>(`${development}/product-sub-category/get_all_sub_categories`);
            const updatedCategories = attachItemsToSubcategories(response.data, itemsMapping);
            console.log(updatedCategories, "SUB Category")
            setCategories(updatedCategories)
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            throw error;
        }
    };

    useEffect(() => {
        getAllSubCategories()
    }, [])

    const handleCategoryClick = (categoryName: string) => {
        setHoveredCategory((prev) => (prev === categoryName ? null : categoryName));
    };

    const onOpenChange = (keys: string[]) => {
        console.log(keys, "lal")
        setOpenKeys(keys);
    };

    const HandlePath = (e: any) => {
        console.log(e.key,e, "holaaaaaa")
        let path = e.key;
        path = path.split("-");
        console.log(path, "hehe");
        let str = "/products?"
        if (path[0]){
            str = str + `category=${path[0]}`
        }
        if (path[1]){
            str = str + `&sub_category=${path[1]}`
        }
        if (path[2]){
            str = str + `&item=${path[2]}`
        }
        router.push(str);
    };

    console.log(hoveredCategory, "lol")
    return (
        <div className={cn("bg-primary relative h-[50px]", className)}>
            <div className="flex lg:justify-center  whitespace-nowrap">
                {categories.map((category, i) => (
                    <div key={category._id} className="relative">
                        <button
                            className={cn(
                                "btn btn-primary min-w-[150px] w-[250px] flex-none rounded-none text-neutral text-nowrap flex flex-row items-center",
                                i === 0 && "rounded-l-md",
                                i === categories.length - 1 && "rounded-r-md"
                            )}
                            onClick={() => handleCategoryClick(category._id)} // Toggle menu on click
                        >
                            <span>{category?.product_category?.name}</span>
                            <FaSortDown className="ml-2" />
                        </button>
                        {hoveredCategory === category._id && (
                            <Menu
                                style={{
                                    width: "250px",
                                    position: "sticky",
                                    top: "100%",
                                    left: 0,
                                    zIndex: 999999,
                                    marginTop: "2px",
                                }}
                                mode="inline"
                                openKeys={openKeys}
                                onOpenChange={onOpenChange}
                                onClick={(e) => HandlePath(e)}
                                items={categories
                                    .find((cat) => cat.product_category.name === category.product_category.name)
                                    ?.sub_categories.map((sub: any) => {
                                        console.log("SUBBBB1", sub)
                                        return {
                                            key:`${category._id}-${sub._id}`, 
                                            label: sub?.name,
                                            children: sub?.items?.length ? sub?.items?.map((item: any) => ({
                                                key: `${category._id}-${sub._id}-${item}`,
                                                label: item,
                                            })) : null,
                                        }
                                    }
                                    )}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryNavMenu;
