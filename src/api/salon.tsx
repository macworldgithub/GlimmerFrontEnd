import axios from "axios";
import { BACKEND_URL } from "./config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/reduxStore";

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

export const getAllActiveServices = createAsyncThunk(
    "getAllActiveServices",
    async (
      payload: {
        page_no: number;
        categoryId?: string;
        salonId?: string;
        subCategoryName?: string;
        subSubCategoryName?: string;
      },
      { rejectWithValue, getState }
    ) => {
      try {
        // Access token from the Redux state
        const state = getState() as RootState;
        const token = state.login.token;
  
        // Make API request with page number as a query parameter
        const response = await axios.get(
          `${BACKEND_URL}/salon-services/getAllActiveServicesForWebiste?page_no=${payload.page_no}&categoryId=${payload.categoryId}&salonId=${payload.salonId}&subCategoryName=${payload.subCategoryName}&subSubCategoryName=${payload.subSubCategoryName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add Bearer token
            },
          }
        );
  
        return response.data; // Return the response data if successful
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "An error occurred");
      }
    }
  );