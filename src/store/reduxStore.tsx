// Configure Store
import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "@/reduxSlices/cartSlice";

const store = configureStore({
    reducer: {
      cart: CartSlice.reducer,
    },
  });
  
  // Define RootState and AppDispatch Types
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;