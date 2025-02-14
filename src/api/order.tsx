import { development, production, BACKEND_URL } from "./config";

const server = null;
import axios from "axios";

export const createOrder = async (data: any, token: string) => {
  try {
    data = { ...data, status: "Confirmed" };
    const res = await axios.post(`${BACKEND_URL}/order/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
