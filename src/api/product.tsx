import { createAsyncThunk } from "@reduxjs/toolkit";
import { development, production, BACKEND_URL } from "./config";

const server = null;
import axios from "axios";

export const getAllProducts = async (
  category?: string,
  subcategory?: string,
  item?: string,
  name?: string,
  minPrice?: number,
  maxPrice?: number,
  page?: number,
  sortBy?: string,
  order?: 'asc' | 'desc'
) => {
  try {
    // Start building the URL with the base endpoint
    let url = `${BACKEND_URL}/product/get_all_products?page_no=${page || 1}`;

    // Add filters to the URL only if they are provided
    if (category) url += `&category=${category}`;
    if (subcategory) url += `&sub_category=${subcategory}`;
    if (item) url += `&item=${item}`;
    if (name) url += `&name=${name}`;
    if (minPrice) url += `&minPrice=${minPrice}`;
    if (maxPrice) url += `&maxPrice=${maxPrice}`;
    if (sortBy) url += `&sortBy=${sortBy}`;
    if (order) url += `&order=${order}`;

    // Make the API request with the dynamically constructed URL
    const res = await axios.get(url);

    return res.data; // Return the response data
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; 
  }
};

export const getProductById = async (id: string) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/product/get_product_by_id?id=${id}`
    );

    return res.data;
  } catch (error) {
    console.error("Error Fetching Product by Id", error);
    throw error;
  }
};

export const getAllProductItem = async () => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/product_item/get_all_product_item`
    );

    return res.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

export const getAllProductsHighlights = createAsyncThunk<any, { filter?: string }>(
  "salons/getAllProductsHighlights",
  async ({ filter }, { rejectWithValue }) => {
    try {
      const query = filter ? `?filter=${filter}` : "";
      const response = await axios.get(`${BACKEND_URL}/admin/product-highlights${query}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch product");
    }
  }
);