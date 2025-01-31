"use client";

import { RootState } from "@/store/reduxStore";
import Link from "next/link";
import React from "react";
import { RiShoppingCart2Line } from "react-icons/ri";

import Image from "next/image";

import { useSelector } from "react-redux";

const CartNavbar = () => {
  const data = useSelector((state: RootState) => state.cart);
  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator flex   ">
            {/* <RiShoppingCart2Line className="mb-0.5 size-5" /> */}
            <Image src={"/basket.svg"} alt="cart" width={20} height={20} />

            <span className="badge badge-sm indicator-item">
              {data.ProductList.length}
            </span>
          </div>
        </div>
        <div
          tabIndex={0}
          className="card card-compact dropdown-content z-[2] mt-3 w-52 bg-base-100 shadow"
        >
          <div className="card-body">
            <span className="font-bold text-lg"> Items</span>
            <span className="text-info">
              Subtotal: {data.discountedTotal} PKR
            </span>
            <div className="card-actions">
              <Link href="/cart" className="btn btn-primary btn-block">
                View cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      <p className=" text-[10px] flex">
        <p className=" max-md:hidden mr-1">My Bag </p> $
        <p className=" font-bold font-sans">{data.discountedTotal}</p>
      </p>
    </>
  );
};

export default CartNavbar;
