import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  quantity: 0;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  base_price: 0;
  discounted_price: 0;
  status: "Active";
  store: string;
}

interface CompleteOrder {
  product: Product;
  quantity: number;
}

interface Cart {
  ProductList: CompleteOrder[];
  total: number;
  discountedTotal: number;
}

const initialState: Cart = {
  ProductList: [],
  total: 0,
  discountedTotal: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const ready = { product, quantity: 1 };

      state.ProductList = [...state.ProductList, ready];
    },

    totalCartAmount: (state) => {
      let sum = 0;
      let discountSum = 0;
      for (let item of state.ProductList) {
        discountSum += item.product.discounted_price * item.quantity;
        sum += item.product.base_price * item.quantity;
      }
      state.total = sum;
      state.discountedTotal = discountSum;
    },

    increaseQty: (state, action) => {
      const { _id } = action.payload;

      for (let item of state.ProductList) {
        const product = item.product;
        if (product.id === _id) {
          if (item.quantity < 5) {
            item.quantity += 1;
          }
        }
      }
    },
    decreaseQty: (state, action) => {
      const { _id } = action.payload;

      for (let item of state.ProductList) {
        const product = item.product;
        if (product.id === _id) {
          if (item.quantity > 0) {
            item.quantity -= 1;
          }
        }
      }
    },
  },
});
