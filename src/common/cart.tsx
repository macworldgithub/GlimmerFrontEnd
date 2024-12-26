// src/app/cart/components/cart.tsx
"use client";
import React from "react";
import { useCartStoreContext } from "@/store/cartStoreContext";
import { RiDeleteBin5Line } from "react-icons/ri";
import Link from "next/link";
const Cart = () => {
	const { cartItems, updateQuantity, removeItem, totalPrice } =
		useCartStoreContext(); 
		
	const deliveryFee = 200;
	// Ensure cartItems are available after hydration
	if (!cartItems) return null;
	if (cartItems.length === 0)
		return (
			<div className="hero min-h-[70vh] bg-base-200">
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
		);
	return (
		<div className="flex min-h-[70vh] justify-center bg-gray-50 p-2 lg:p-8">
			<div className="flex w-full flex-col gap-10 rounded-lg bg-white p-2 shadow-lg lg:flex-row lg:p-8 xl:gap-32 xl:px-16">
				{/* Cart Items */}
				<div className="flex-1 max-lg:min-w-80">
					<div className="mb-4 flex items-center flex-none">
						<h2 className="mr-2 font-semibold text-2xl">Shopping Cart </h2>
						<p className="text-gray-500">({cartItems.length} Items)</p>
					</div>
					<div className="overflow-x-auto flex-none">
						<table className="table w-full">
							<thead>
								<tr>
									<th>Product</th>
									<th>Price</th>
									<th className="pl-6">Quantity</th>
									<th>Remove</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.map((item) => (
									<tr key={item.id} className=" ">
										<td className="flex items-center gap-4 flex-none max-lg:min-w-80">
											<img
												src={item.image}
												alt={item.title}
												className="h-16 w-16 rounded-md object-cover"
											/>
											<div>
												<p className="font-semibold flex-none">{item.title}</p>
												{item.selectedVariations?.map((v, i) => (
													<p key={i} className="text-gray-500 text-sm">
														{v?.title}
														{v?.title && <span> : </span>}
														{v?.variationListItem}
													</p>
												))}
											</div>
										</td>
										<td className="text-nowrap">
											{item.netPrice.toFixed(2)} PKR
										</td>
										<td>
											<div className="flex items-center">
												<button
													className="btn btn-sm"
													onClick={() => updateQuantity(item.id, -1)}
												>
													-
												</button>
												<span className="mx-2">{item.quantity}</span>
												<button
													className="btn btn-sm"
													onClick={() => updateQuantity(item.id, 1)}
												>
													+
												</button>
											</div>
										</td>
										<td>
											<button
												className="btn btn-sm btn-error"
												onClick={() => removeItem(item.id)}
											>
												<span role="img" aria-label="remove">
													<RiDeleteBin5Line className="size-4" />
												</span>
											</button>
										</td>
									</tr>
								))}
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
							<span>Total</span>
							<span>{totalPrice().toFixed(2)} PKR</span>
						</div>
						<div className="flex justify-between">
							<span>Delivery</span>
							<span>{deliveryFee.toFixed(2)} PKR</span>
						</div>
						{/* <div className="flex justify-between">
							<span>Discount</span>
							<span>-0.00 PKR</span>
						</div> */}
						<hr className="my-2" />
						<div className="flex justify-between font-semibold">
							<span>Subtotal</span>
							<span>{(totalPrice() + deliveryFee).toFixed(2)} PKR</span>
						</div>
						<button className="btn btn-secondary mt-4 w-full">Checkout</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
