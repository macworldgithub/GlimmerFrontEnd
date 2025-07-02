"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reduxStore";
import { removeItem, updateQty } from "@/reduxSlices/cartSlice";
import CategoryNavMenu from "./category-nav-menu";

const Cart = () => {
  const dispatch = useDispatch();
  const Cart = useSelector((state: RootState) => state.cart);
  console.log(Cart);

  const deliveryCharge = Cart?.shippingInfo?.city?.toLowerCase() === "karachi" ? 200 : 300;
  const subtotal = (Cart?.discountedTotal || 0) + deliveryCharge;

  const [bulkProducts, setBulkProducts] = useState<{ [key: string]: boolean }>(
    {}
  ); // Track bulk state globally

  const updateQuantity = (id: string, newQuantity: number) => {
    dispatch(updateQty({ _id: id, qty: newQuantity }));
  };

  const deleteProduct = (id: string) => {
    dispatch(removeItem(id));
  };

  // Handle the bulk checkbox
  const handleBulkCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const isChecked = e.target.checked;
    setBulkProducts((prev) => ({
      ...prev,
      [id]: isChecked,
    }));

    // Reset quantity to 5 when unchecked
    if (!isChecked) {
      updateQuantity(id, 5);
    }
  };

  if (!Cart.ProductList) return null;
  if (Cart.ProductList.length === 0)
    return (
      <>
        <CategoryNavMenu />
        <div className="hero min-h-screen w-[99vw] bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="font-bold text-5xl">Cart Empty</h1>
              <p className="py-6">
                Your cart is empty. Please add items to your cart.
              </p>
              <Link href={"/selfcare-products"}>
                <button className="btn btn-secondary">Continue Shopping</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <div className="flex min-h-screen w-[99vw] justify-center p-2 lg:p-8">
      <div className="flex w-full flex-col gap-10 rounded-lg bg-white p-2 shadow-lg lg:flex-row lg:p-8 xl:gap-32 xl:px-16">
        {/* Cart Items */}
        <div className="flex-1 max-lg:min-w-80">
          <div className="mb-4 flex items-center flex-none">
            <h2 className="mr-2 font-semibold text-2xl">Shopping Cart </h2>
            <p className="text-gray-500">({Cart.ProductList.length} Items)</p>
          </div>
          <div className="max-h-[21rem] overflow-y-auto overflow-x-auto flex-none">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Price after Discount</th>
                  <th className="pl-6">Quantity</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {Cart.ProductList.map((item) => {
                  const disableMinus = item.quantity === 1;
                  const disablePlus =
                    item.quantity === 5 && !bulkProducts[item.product.id];

                  return (
                    <tr key={item.product.id}>
                      <td className="flex items-center gap-4 flex-none max-lg:min-w-80">
                        <img
                          src={item.product.image1}
                          alt={item.product.name}
                          className="h-16 w-16 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-semibold flex-none">
                            {item.product.name}
                          </p>
                        </div>
                      </td>
                      <td className="text-nowrap">
                        {item.product.base_price * item.quantity} PKR
                      </td>
                      <td className="text-nowrap">
                        {item.product.discounted_price === 0
                          ? item.product.base_price * item.quantity
                          : item.product.discounted_price * item.quantity}{" "}
                        PKR
                      </td>
                      <td>
                        <div className="flex items-center">
                          <button
                            className="btn btn-sm"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            disabled={disableMinus}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="btn btn-sm"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            disabled={disablePlus}
                          >
                            +
                          </button>
                        </div>
                        {/* Show Bulk checkbox when quantity is 5 */}
                        {item.quantity === 5 && (
                          <div className="mt-2 flex items-center">
                            <input
                              type="checkbox"
                              checked={bulkProducts[item.product.id] || false}
                              onChange={(e) =>
                                handleBulkCheckbox(e, item.product.id)
                              }
                              id={`bulk-${item.product.id}`}
                              className="mr-2"
                            />
                            <label htmlFor={`bulk-${item.product.id}`}>
                              Bulk of Bag
                            </label>
                          </div>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => deleteProduct(item.product.id)}
                        >
                          <span role="img" aria-label="remove">
                            <RiDeleteBin5Line className="size-4" />
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="flex flex-col gap-4 flex-none mx-auto md:m-0">
          {/* Apply Coupon */}
          <div className="rounded-lg bg-gray-100 p-4">
            <h3 className="mb-2 font-semibold text-lg">Apply Coupon</h3>

            <input
              type="text"
              placeholder="Coupon code"
              className="input input-bordered mb-2 w-full"
            />
            <button className="btn btn-secondary w-full">Apply</button>
          </div>

          {/* Total Section */}
          <div className="rounded-lg bg-gray-100 p-4">
            <h3 className="mb-4 font-semibold text-lg">Total</h3>
            <div className="flex justify-between">
              <span>Price</span>
              <span>{Cart?.total} PKR</span>
            </div>
            <div className="flex justify-between">
              <span>Final Price after discount</span>
              <span>{Cart?.discountedTotal} PKR</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span>{deliveryCharge} PKR</span>
            </div>
            <div className="flex justify-between"></div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>{subtotal} PKR</span>
            </div>

            <Link href={"/checkout"}>
              <button className="btn btn-secondary mt-4 w-full">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
