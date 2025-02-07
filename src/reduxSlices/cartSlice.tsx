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

const CalculateTotal = (list: CompleteOrder[]) => {
  list = JSON.parse(JSON.stringify(list));
  let sum = 0;
  let discountSum = 0;
  for (let item of list) {
    discountSum +=
      item.product.discounted_price === 0
        ? item.product.base_price * item.quantity
        : item.product.discounted_price * item.quantity;
    sum += item.product.base_price * item.quantity;
  }

  console.log("lopo", discountSum, sum);

  return { sum: sum, discountSum: discountSum };
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const exists = state.ProductList.some(
        (item) => item.product.id === product.id
      );

      if (!exists) {
        const ready = { product, quantity: 1 };
        state.ProductList = [...state.ProductList, ready];
      }

      const { sum, discountSum } = CalculateTotal(state.ProductList);
      state.total = sum;
      state.discountedTotal = discountSum;
    },

    removeItem: (state, action) => {
      const { p_id } = action.payload;

      if (p_id === undefined || p_id === null) {
        console.error("Error: p_id is required to remove an item.");
        return;
      }

      state.ProductList = state.ProductList.filter(
        (item) => item.product.id !== p_id
      );

      const { sum, discountSum } = CalculateTotal(state.ProductList);
      state.total = sum;
      state.discountedTotal = discountSum;
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

    updateQty: (state, action) => {
      const { _id, qty } = action.payload;

      for (let item of state.ProductList) {
        const product = item.product;
        if (product.id === _id) {
          item.quantity = qty;
        }
      }

      const { sum, discountSum } = CalculateTotal(state.ProductList);
      state.total = sum;
      state.discountedTotal = discountSum;
    },
  },
});

export const { updateQty, totalCartAmount, removeItem, addItem } =
  CartSlice.actions;

export default CartSlice;
