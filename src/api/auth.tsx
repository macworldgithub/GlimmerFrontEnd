import axios from "axios";
import { development ,production ,BACKEND_URL} from "./config";

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
