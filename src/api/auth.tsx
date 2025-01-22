import axios from "axios";
import { development ,production} from "./config";

interface PropsLogin {
  email: string;
  password: string;
}

const server = null;

export const logInApi = async ({ email, password }: PropsLogin) => {
  try {
    const res = await axios.post(`${  server ? production : development}/auth/signin/customer`, {
      email: email,
      password: password,
    });

    return res.data;
  } catch (error) {
    console.error("error", error);
  }
};
