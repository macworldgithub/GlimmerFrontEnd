import axios from "axios";
import { development } from "./config";

interface PropsLogin {
  email: string;
  password: string;
}

export const logInApi = async ({ email, password }: PropsLogin) => {
  try {
    const res = await axios.post(`${development}/auth/signin/customer`, {
      email: email,
      password: password,
    });

    return res.data;
  } catch (error) {
    console.error("error", error);
  }
};
