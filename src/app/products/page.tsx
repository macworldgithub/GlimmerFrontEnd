"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
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
  const [total, setTotal] = useState(0); 
  const pageSize = 10; 

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const category = searchParams.get("category") ?? "";
  const subCategory = searchParams.get("sub_category") ?? "";
  const item = searchParams.get("item") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  const fetchData = async () => {
    const res = await getAllProducts(category, subCategory, item, page);
    setData(res.products);
    setTotal(res.total);
  };

  useEffect(() => {
    fetchData();
  }, [page, category, subCategory, item]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <CategoryNavMenu />
      <div className="w-[99vw] h-max flex flex-wrap gap-7 p-[2rem]">
        {data.length ? (
          data.map((item: any) => <Card key={item.id} item={item} />)
        ) : (
          <div className="justify-center flex min-h-[70vh] w-full items-center">
            <div className="text-center font-bold text-3xl">
              Ops! No items to display in this category
            </div>
          </div>
        )}
      </div>

      {total > 0 && (
        <div className="pb-[20rem] w-[99vw] flex justify-center items-center space-x-2 py-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg text-gray-600">
            Page {page} of {Math.ceil(total / pageSize)}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === Math.ceil(total / pageSize)}
            className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
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
