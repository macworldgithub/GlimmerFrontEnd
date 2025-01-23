"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSearchParams, usePathname } from "next/navigation";
import CategoryNavMenu from "@/common/category-nav-menu";
import { useState } from "react";

import { sampleProducts } from "@/data";
import { RealCardItem } from "@/data";

import Card from "@/common/Card";
import { getAllProducts } from "@/api/product";

const Temp = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const path = usePathname();

  const fetchData = async () => {
    if (path) {
      const pathArray = path.split("/"); // Split the path into parts
      const res = await getAllProducts(
        pathArray[1],
        pathArray[2],
        pathArray[3],
        page
      );

      console.log("rrrr", res);
      setData(res.products);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <CategoryNavMenu />
      {/* <h2>{category}</h2>
      <h2>{subcategory}</h2>
      <h2>{path}</h2> */}
      <div className="w-[100%] h-max flex flex-wrap justify-between gap-2 p-2 ">
        {data ? (
          data?.map((item: any) => <Card item={item} />)
        ) : (
          <div>NO ITEMS</div>
        )}
      </div>
    </div>
  );
};

export default Temp;
