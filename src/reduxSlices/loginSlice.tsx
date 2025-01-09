import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Customer {
  name: string;
  email: string;
}

interface Login {
  customer: Customer;
  token: string;
}

const initialState: Login = {
  customer: {
    name: "",
    email: "",
  },
  token: "",
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateCustomer: (state, action) => {
      const { name, email } = action.payload;
      state.customer.email = email;
      state.customer.name = name;
    },

    updateToken: (state, action) => {
      state.token = state.token;
    },
  },
});

export const { updateCustomer } = LoginSlice.actions;

export default LoginSlice;
