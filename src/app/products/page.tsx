"use client";
import React, { useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import CategoryNavMenu from "@/common/category-nav-menu";
import { useState } from "react";
import Card from "@/common/Card";
import { getAllProducts } from "@/api/product";


const Temp = () => {
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);

    const searchParams = useSearchParams();

    const category = searchParams.get("category") ?? "";
    const subCategory = searchParams.get("sub_category") ?? "";
    const item = searchParams.get("item") ?? "";
    console.log(category, subCategory, item, " me agya ")

    const fetchData = async () => {
        const res = await getAllProducts(
            category,
            subCategory,
            item,
            page
        );

        console.log("rrrr", res);
        setData(res.products);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [page, category, subCategory, item]);

    return (
        <div>
            <CategoryNavMenu />
            {/* <h2>{category}</h2>
      <h2>{subcategory}</h2>
      <h2>{path}</h2> */}
            <div className="w-[100%] h-max flex flex-wrap justify-between gap-2 p-2 ">
                {data.length ? (
                    data?.map((item: any) => <Card item={item} />)
                ) : (
                    <div className="justify-center flex min-h-[70vh] w-full items-center">
                        <div className="text-center font-bold text-3xl">Ops! No items to display in this category</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Temp;
