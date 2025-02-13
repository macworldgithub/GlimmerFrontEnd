import { development, production, BACKEND_URL } from "./config";

const server = null;
import axios from "axios";

export const createOrder = async (data: any, token: string) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/order/create`,
      {
        order_items: data.map((item: any) => ({
          product: item?.product?._id,
          quantity: item?.quantity,
        })),
        payment_method: "Credit/Debit Card",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
