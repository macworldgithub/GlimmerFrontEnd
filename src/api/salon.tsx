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
      sortBy?: string,
      order?: 'asc' | 'desc'
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
      if(payload.sortBy) params.append("sortBy", payload.sortBy);
      if(payload.order) params.append("order", payload.order);

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

export async function fetchSalonServices(salonId: string, page_no = 1) {
  try {
    const params = new URLSearchParams();
    params.append("page_no", page_no.toString());
    params.append("salonId", salonId);

    const response = await axios.get(
      `${BACKEND_URL}/salon-services/getAllActiveServicesForWebiste?${params.toString()}`
    );

    return response.data?.services || []; // backend should return services array
  } catch (err) {
    console.error(`Error fetching services for salon ${salonId}:`, err);
    return [];
  }
}

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

export interface Salon {
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

export async function fetchAllSalons(page_no: number = 1) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/salon/get-all-salon?page_no=${page_no}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching salons:", error);
    return { salons: [], totalPages: 0 };
  }
}

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

  export const getAllSalonsHighlights = createAsyncThunk<any, { filter?: string }>(
    "salons/getAllSalonsHighlights",
    async ({ filter }, { rejectWithValue }) => {
  try {
    const query = filter ? `?filter=${filter}` : "";
        const response = await axios.get(`${BACKEND_URL}/admin/salon-highlights${query}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to fetch salons");
  }
    }
  );

export const getServicesBySearch = createAsyncThunk(
  "getServicesBySearch",
  async (
    payload: {
      page_no: number;
      nameTerm?: string;
      gender?: string;
      serviceTerm?: string;
      price?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();

      if (payload.page_no) params.append("page_no", payload.page_no.toString());
      if (payload.nameTerm) params.append("nameTerm", payload.nameTerm);
      if (payload.gender) params.append("gender", payload.gender);
        if (payload.serviceTerm) params.append("serviceTerm", payload.serviceTerm);
      if (payload.price) params.append("price", payload.price.toString());

      const response = await axios.get(
          `${BACKEND_URL}/salon-services/search?${params.toString()}`,
      );

      return response.data; // Return the response data if successful
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);