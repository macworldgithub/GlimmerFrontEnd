"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { CartState, useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types";

import store from "./reduxStore";
import { Provider } from "react-redux";

const CartStoreContext = createContext<CartState | null>(null);

export const CartStoreProvider = ({ children }: { children: ReactNode }) => {
  // const store = useCartStore();
  // useEffect(() => {
  // 	if (typeof window !== "undefined") {
  // 		const savedCart = localStorage.getItem("cartItems");
  // 		const pasredCartItems = JSON.parse(savedCart || "[]") as CartItem[];
  // 		store.setCartItems(pasredCartItems);
  // 	}
  // }, []);
  return <Provider store={store}>{children}</Provider>;
};

// export const useCartStoreContext = () => {
//   const context = useContext(CartStoreContext);
//   if (!context) {
//     throw new Error(
//       "useCartStoreContext must be used within a CartStoreProvider"
//     );
//   }
//   return context;
// };
