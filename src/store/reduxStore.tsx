// Configure Store
import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "@/reduxSlices/cartSlice";
import LoginSlice from "@/reduxSlices/loginSlice";

const store = configureStore({
    reducer: {
      cart: CartSlice.reducer,
      login :LoginSlice.reducer
    },
  });
  
  // Define RootState and AppDispatch Types
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;