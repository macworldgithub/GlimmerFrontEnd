import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import CartSlice from "@/reduxSlices/cartSlice";
import LoginSlice from "@/reduxSlices/loginSlice";
import { combineReducers } from "redux";

// Combine reducers
const rootReducer = combineReducers({
  cart: CartSlice.reducer,
  login: LoginSlice.reducer,
});

// Persist configuration
const persistConfig = {
  key: "glimmerWEB",
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Redux Persist needs this to avoid warnings
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Define RootState and AppDispatch Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
