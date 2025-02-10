"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CategoryNavMenu from "@/common/category-nav-menu";
import Card from "@/common/Card";
import { getAllProducts } from "@/api/product";

// A loading component for suspense fallback
const Loading = () => (
  <div className="justify-center flex min-h-[70vh] w-full items-center">
    <div className="text-center font-bold text-3xl">Loading...</div>
  </div>
);

const ProductsList = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const subCategory = searchParams.get("sub_category") ?? "";
  const item = searchParams.get("item") ?? "";

  const fetchData = async () => {
    const res = await getAllProducts(category, subCategory, item, page);
    setData(res.products);
  };

  useEffect(() => {
    fetchData();
  }, [page, category, subCategory, item]);

  return (
    <div>
      <CategoryNavMenu />
      <div className="pb-[20rem] w-[100%] h-max flex flex-wrap gap-2 p-2">
        {data.length ? (
          data?.map((item: any) => <Card key={item.id} item={item} />)
        ) : (
          <div className="justify-center flex min-h-[70vh] w-full items-center">
            <div className="text-center font-bold text-3xl">
              Ops! No items to display in this category
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Temp = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsList />
    </Suspense>
  );
};

export default Temp;
