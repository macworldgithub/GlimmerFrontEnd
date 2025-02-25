"use client";

import { RootState } from "@/store/reduxStore";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

const CartNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const data = useSelector((state: RootState) => state.cart);

  const handleToggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleViewCartClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle"
          onClick={handleToggleDropdown}
        >
          <div className="indicator flex">
            <Image src={"/basket.svg"} alt="cart" width={20} height={20} />
            <span className="badge badge-sm indicator-item">
              {data.ProductList.length}
            </span>
          </div>
        </div>

        {/* Conditional rendering based on isOpen */}
        {isOpen && (
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
                <Link
                  href="/cart"
                  className="btn btn-primary btn-block"
                  onClick={handleViewCartClick}
                >
                  View cart
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartNavbar;
