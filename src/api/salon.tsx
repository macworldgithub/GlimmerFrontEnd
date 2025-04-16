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
      const state = getState() as RootState;
      const token = state.login.token;

      const params = new URLSearchParams();

      if (payload.page_no) params.append("page_no", payload.page_no.toString());
      if (payload.categoryId) params.append("categoryId", payload.categoryId);
      if (payload.salonId) params.append("salonId", payload.salonId);  
      if (payload.subCategoryName) params.append("subCategoryName", payload.subCategoryName);
      if (payload.subSubCategoryName) params.append("subSubCategoryName", payload.subSubCategoryName);

      const response = await axios.get(
        `${BACKEND_URL}/salon-services/getAllActiveServicesForWebiste?${params.toString()}`,
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

  export const getServiceById = async (serviceId: string) => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/salon-services/getServiceById?id=${serviceId}`
      );
  
      return res.data;
    } catch (error) {
      console.error("Error Fetching Service by Id", error);
      throw error;
    }
  };
  
  export const createBooking = async (data: any, token: string) => {
    try {
      data = { ...data };
      const res = await axios.post(`${BACKEND_URL}/salon-service-bookings/create`, data, {
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

  interface Salon {
    _id: number;
    salon_name: string;
    rating: number;
    reviews: number;
    address: string;
    openingHour: string;
    closingHour: string;
    image1: string;
    about: string;
  }
  
  interface GetAllSalonsResponse {
    salons: Salon[];
    total: number;
  }
  
  export const getAllSalons = createAsyncThunk<GetAllSalonsResponse, number>(
    "salons/getAllSalons",
    async (page_no: number, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BACKEND_URL}/salon/get-all-salon?page_no=${page_no}`);
        return response.data; 
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to fetch salons");
      }
    }
  );

  export const getSalonById = async (id: string) => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/salon/get-salon-by-id?id=${id}`
      );
      console.log(res);
      return res.data;
    } catch (error) {
      console.error("Error Fetching Service by Id", error);
      throw error;
    }
  };

  export const getRecommendedProductsOfSalon = async (salonId: string) => {
    try {
      const url = `${BACKEND_URL}/admin/get-recommended-products-of-salon/${salonId}`;
  
      const res = await axios.get(url);
  
      return res.data; // Return the response data
    } catch (error) {
      console.error("Error fetching recommended products for salon:", error);
      throw error; // Propagate error for handling in the calling function
    }
  };
  