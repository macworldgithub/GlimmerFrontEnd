import axios from "axios";
import {BACKEND_URL} from "./config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/reduxStore";
interface PropsLogin {
  email: string;
  password: string;
}

const server = null;

export const logInApi = async ({ email, password }: PropsLogin) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/auth/signin/customer`, {
      email: email,
      password: password,
    });

    return res.data;
  } catch (error) {
    console.error("error", error);
  }
};

export const LoginApi = createAsyncThunk(
  "async/thunk ",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { email, password } = (getState() as RootState).login;
      const res = await axios.post(`${BACKEND_URL}/auth/signin/customer`, {
        email,
        password,
      });
      return res.data;
    } catch (error) {
      console.error("Login error", error);
      //@ts-ignore
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const SignUpCustomer = async (data: any) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/auth/signup/customer`, {
      name: data?.name,
      email: data?.email,
      password: data?.password,
    });

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};
