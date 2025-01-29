"use client";
import React from "react";
import { Input, Select } from "antd";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";

const PrductSearchBar = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([
      //@ts-ignore
      { id: 1, name: "Skin Care" },
      { id: 2, name: "Hair Care" },
      { id: 3, name: "Fragrance" },
      { id: 4, name: "Makeup" },
    ]);
  }, []);

  return (
    <div className=" w-max h-[50px]  border flex justify-between items-center rounded-md">
      <Input
        placeholder="Search here"
        className="w-[80%] border-none focus:border-none"
      />

      <div className="flex gap-2 ml-2">
        <span className="w-[1px] h-[95%] bg-red-300 border"></span>
        <Select defaultValue="all" style={{ width: 200, color: "GrayText" }}>
          <Option value="all">All Products</Option>
          {products.map((product) => (
            <Option key={product.id} value={product.name}>
              {product.name}
            </Option>
          ))}
        </Select>
      </div>

      <div className=" ml-2 w-max h-[100%] bg-[#583FA8] flex justify-center items-center p-2 rounded-r-md">
        {" "}
        <BsSearch color="white" />
      </div>
    </div>
  );
};

export default PrductSearchBar;
