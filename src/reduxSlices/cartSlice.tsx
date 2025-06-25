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
  _id: string;
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
  size: Size[];
  type: Type[];
  rate_of_salon: number;
  ref_of_salon: string;
}

interface CompleteOrder {
  product: Product;
  quantity: number;
}

interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  deliveryMethod: string;
  agree: boolean;
}

interface Cart {
  ProductList: CompleteOrder[];
  total: number;
  discountedTotal: number;
  shippingInfo: ShippingInfo | null;
}

const initialState: Cart = {
  ProductList: [],
  total: 0,
  discountedTotal: 0,
  shippingInfo: null,
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

      const existingItemIndex = state.ProductList.findIndex(
        (item) => item.product._id === product._id
      );

      if (existingItemIndex !== -1) {
        state.ProductList[existingItemIndex].quantity += 1;
      } else {
        if (!product?.orderProductStatus) {
          product.orderProductStatus = "Pending";
        }
        state.ProductList.push({ product, quantity: 1 });
      }

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
    const product = item.product.id;
    if (product=== _id) {
      item.quantity = qty;
      break; 
    }
  }

  const { sum, discountSum } = CalculateTotal(state.ProductList);
  state.total = sum;
  state.discountedTotal = discountSum;
},


    updateProductSize: (
      state,
      action: PayloadAction<{ id: string; size: Size[] }>
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
      action: PayloadAction<{ id: string; type: Type[] }>
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

     removeItem: (state, action) => {
      const productId = action.payload;

      const existingItemIndex = state.ProductList.findIndex(
        (item) => item.product.id === productId
      );

      if (existingItemIndex !== -1) {
        state.ProductList.splice(existingItemIndex, 1);
      }

      const { sum, discountSum } = CalculateTotal(state.ProductList);
      state.total = sum;
      state.discountedTotal = discountSum;
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
