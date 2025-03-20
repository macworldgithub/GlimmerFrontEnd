import axios from "axios";
import { BACKEND_URL } from "./config";

export const getAllServices = async () => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/salon-services-categories/getCategoryName`
    );
    return res.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

export const getAllServicesById = async (category_id: string) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/salon-services-categories/getCategryById/${category_id}`
    );
    return res.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};