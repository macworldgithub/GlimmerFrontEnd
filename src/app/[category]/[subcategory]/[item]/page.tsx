"use client";
import React from "react";
import { useRouter } from "next/router";
import { useSearchParams, usePathname } from "next/navigation";
import CategoryNavMenu from "@/common/category-nav-menu";

import { sampleProducts } from "@/data";

import Card from "@/common/Card";

const Temp = () => {
  const searchParams = useSearchParams();

  const path = usePathname();

  const category = searchParams.get("subcategory");
  const subcategory = searchParams.get("item");

  return (
    <div>
      <CategoryNavMenu />
      {/* <h2>{category}</h2>
      <h2>{subcategory}</h2>
      <h2>{path}</h2> */}
      <div className="w-[100%] h-max flex flex-wrap justify-between gap-2 p-2 ">
        {sampleProducts.map((item) => (
          <Card item={item} />
        ))}
      </div>
    </div>
  );
};

export default Temp;
