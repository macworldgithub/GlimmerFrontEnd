import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Type {
  id: string;
  value: string;
}
interface Size {
  id: string;
  value: string;
  unit: string;
}

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
  size: Size;
  type: Type;
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
      const { id } = action.payload;

      if (id === undefined || id === null) {
        console.error("Error: id is required to remove an item.");
        return;
      }

      state.ProductList = state.ProductList.filter(
        (item) => item.product.id !== id
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

    updateProductSize: (
      state,
      action: PayloadAction<{ id: string; size: Size }>
    ) => {
      const { id, size } = action.payload;
      state.ProductList = state.ProductList.map((item) =>
        item.product.id === id
          ? { ...item, product: { ...item.product, size } }
          : item
      );
    },

    updateProductType: (
      state,
      action: PayloadAction<{ id: string; type: Type }>
    ) => {
      const { id, type } = action.payload;
      state.ProductList = state.ProductList.map((item) =>
        item.product.id === id
          ? { ...item, product: { ...item.product, type } }
          : item
      );
    },

    clearCart: (state) => {
      state.ProductList = [];
      state.total = 0;
      state.discountedTotal = 0;
    },
  },
});

export const {
  updateQty,
  totalCartAmount,
  removeItem,
  addItem,
  updateProductSize,
  updateProductType,
  clearCart,
} = CartSlice.actions;

export default CartSlice;
