"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { CartState, useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types";

import store, { persistor } from "./reduxStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const CartStoreContext = createContext<CartState | null>(null);

export const CartStoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
