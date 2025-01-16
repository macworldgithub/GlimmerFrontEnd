import { development } from "./config";
import axios from "axios";

export const getProducts = async (
  token: string,
  category: string,
  subcategory: string,
  item: string,
  page: number
) => {
  try {
    const res = await axios.post(
      `${development}/${category}/${subcategory}/${item}`, // Ensure `development` is defined properly
      { page_no: page }, // Body content
      {
        headers: {
          Authorization: `Bearer ${token}`, // Correct the header key for bearer tokens
        },
      }
    );

    return res.data; // Return the response data
  } catch (error) {
    console.error(
      "Error fetching products:",
      error?.response?.data || error.message
    );
    throw error; // Throw error to handle it in calling function
  }
};

export const getProductById = async (token: string, id: string) => {
  try {
    const res = await axios.get(
      `${development}/product/get_store_product_by_id?id=${id}`
    );

    return res.data;
  } catch (error) {
    console.error("Error Fetching Product by Id", error);
    throw error;
  }
};
