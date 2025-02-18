"use client";
import React from "react";
import { Input, Select } from "antd";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";

const PrductSearchBar = () => {
  const [products, setProducts] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    setProducts([
      //@ts-ignore
      { id: 1, name: "Skin Care" },
      //@ts-ignore

      { id: 2, name: "Hair Care" },
      //@ts-ignore
      { id: 3, name: "Fragrance" },
      //@ts-ignore

      { id: 4, name: "Makeup" },
    ]);
  }, []);

  return (
    <div className="flex items-center w-full max-w-[350px] h-[50px] border border-gray-300 rounded-md shadow-sm bg-white overflow-hidden transition-all duration-300 focus-within:ring-1 max-md:hidden">
      <Input
        placeholder="Search for products and brand"
        className="w-full px-4 py-2 border-none outline-none text-gray-700 focus:ring-0"
      />
      <div className="w-[1px] h-[70%] bg-gray-300"></div>
        {/* <Select defaultValue="all" className="w-[150px] text-gray-600 border-none focus:ring-0 focus:outline-none pr-2">
          <Option value="all">All Products</Option>
          {products.map((product: any) => (
            //@ts-ignore
            <Option key={product.id} value={product.name}>
              {product?.name}
            </Option>
          ))}
        </Select> */}

      <button className="flex items-center justify-center text-gray-400 px-4 h-full transition-all duration-300">
        <BsSearch className="size-5" />
      </button>
    </div>
  );
};

export default PrductSearchBar;
