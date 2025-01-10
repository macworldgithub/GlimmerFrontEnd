"use client";
import React from "react";
import { useRouter } from "next/router";
import { useSearchParams, usePathname } from "next/navigation";
import CategoryNavMenu from "@/common/category-nav-menu";

const Temp = () => {
  const searchParams = useSearchParams();

  const path = usePathname();

  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  return (
    <div>
      <CategoryNavMenu />
      <h2>{category}</h2>
      <h2>{subcategory}</h2>
      <h2>{path}</h2>
    </div>
  );
};

export default Temp;
