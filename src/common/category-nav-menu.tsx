"use client";

import { cn } from "@/lib/utils";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa";

// import Router, { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { development } from "@/api/config";
import axios from "axios";

type Item = {
    _id: string
    name: string
    created_at: string
    description: string
    product_sub_category: string
    __v: number
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

    const get_all_categories = async (): Promise<void> => {
        try {
            const response = await axios.get<any[]>(`${development}/product_item/get_all_product_item`);
            console.log(response.data, "lellllll")
            setCategories(response.data)
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            throw error;
        }
    };

    useEffect(() => {
        get_all_categories()
    }, [])

    const handleCategoryClick = (categoryName: string) => {
        setHoveredCategory((prev) => (prev === categoryName ? null : categoryName));
    };

    const onOpenChange = (keys: string[]) => {
        console.log(keys, "lal")
        setOpenKeys(keys);
    };

    const HandlePath = (e: any) => {
        console.log(e.key, e, "holaaaaaa")
        let path = e.key;
        path = path.split("-");
        console.log(path, "hehe");
        let str = "/products?"
        if (path[0]) {
            str = str + `category=${path[0]}`
        }
        if (path[1]) {
            str = str + `&sub_category=${path[1]}`
        }
        if (path[2]) {
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
                                items={category?.sub_categories.map((sub: any) => {
                                        console.log("SUBBBB1", sub)
                                        return {
                                            key: `${category._id}-${sub._id}`,
                                            label: sub?.name,
                                            children: sub?.items?.length ? sub?.items?.map((item: any) => ({
                                                key: `${category._id}-${sub._id}-${item?._id}`,
                                                label: item?.name,
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
