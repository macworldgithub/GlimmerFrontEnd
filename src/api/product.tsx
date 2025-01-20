import { development } from "./config";
import axios from "axios";

export const getAllProducts = async (
  category: string,
  subcategory: string,
  item: string,
  page: number
) => {
  try {
    const res = await axios.get(
      `${development}/product/get_all_products?page_no=${page}&category=${category.toLocaleLowerCase()}&subcategory=${subcategory.toLocaleLowerCase()}&item=${item}` // Ensure `development` is defined properly
    );

    return res.data; // Return the response data
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Throw error to handle it in calling function
  }
};

export const getProductById = async (id: string) => {
  try {
    const res = await axios.get(
      `${development}/product/get_product_by_id?id=${id}`
    );

    return res.data;
  } catch (error) {
    console.error("Error Fetching Product by Id", error);
    throw error;
  }
};
