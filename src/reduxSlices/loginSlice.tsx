import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginApi } from "@/api/auth";
import Cookies from "js-cookie";

interface Login {
  email: string;
  name: string;
  token: string;
  role: string;
  password: string;

  loading: boolean;
  success: boolean;
  failed: boolean;
}

const initialState: Login = {
  email: "",
  name: "",
  token: "",
  role: "",
  password: "",

  loading: false,
  success: false,
  failed: false,
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },

    resetStatus: (state) => {
      state.failed = false;
      state.success = false;
      state.loading = false;
    },

    logout: (state) => {
      Cookies.remove("token");
      // Clears user data
      return { ...initialState };
    },

    // ✅ Step 1: Added reducer to handle signup login data
    setLoginData: (
      state,
      action: PayloadAction<{ customer: any; token: string; role: string }>
    ) => {
      const { customer, token, role } = action.payload;
      state.email = customer.email;
      state.name = customer.name;
      state.role = role;
      state.token = token;
      Cookies.set("token", token, { expires: 7 });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginApi.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.failed = false;
    }),
      builder.addCase(LoginApi.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.failed = false;

        const { customer, token, role } = action.payload;
        state.email = customer.email;
        state.name = customer.name;
        state.role = role;
        state.token = token;

        Cookies.set("token", action.payload.token, { expires: 7 }); // Expires in 7 days
      }),
      builder.addCase(LoginApi.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.failed = true;
      });
  },
});

// ✅ Step 2: Export the new reducer as well
export const {
  updateEmail,
  updatePassword,
  resetStatus,
  logout,
  setLoginData,
} = LoginSlice.actions;

export default LoginSlice;
