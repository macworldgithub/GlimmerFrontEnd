import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Service {
  _id: string;
  name: string;
  description: string;
  base_price: number;
  discounted_price: number;
  duration: string;
  salonId: string;
  image1: string;
  rate_of_salon: string;
  ref_of_salon: string;
  status: string;

  categoryId?: string;
  categoryName: string;
  subCategoryName?: string;
  subSubCategoryName?: string;
  hasDiscount: boolean;
  discountPercentage: number;

}

export interface BookingInfo {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string;
  bookingTime: string;
  paymentMethod: string;
}


interface ServiceCartItem {
  service: Service;
  bookingInfo: BookingInfo;
}

interface ServiceCartState {
  services: ServiceCartItem[];
  total: number;
  discountedTotal: number;
}

const initialState: ServiceCartState = {
  services: [],
  total: 0,
  discountedTotal: 0,
};

const calculateTotals = (list: ServiceCartItem[]) => {
  let sum = 0;
  let discountSum = 0;

  for (let item of list) {
    const price = item.service.base_price;
    const discounted = item.service.discounted_price || item.service.base_price;
    sum += price;
    discountSum += discounted;
  }

  return { sum, discountSum };
};

const serviceCartSlice = createSlice({
  name: "serviceCart",
  initialState,
  reducers: {
    addService: (
      state,
      action: PayloadAction<{ service: Service; bookingInfo: BookingInfo }>
    ) => {
      const { service, bookingInfo } = action.payload;
      const exists = state.services.find((s) => s.service._id === service._id);

      if (!exists) {
        state.services.push({
          service: {
            ...service,
            discounted_price: service.discounted_price || service.base_price,
            hasDiscount: service.hasDiscount ?? false,
            discountPercentage: service.discountPercentage ?? 0,
          },
          bookingInfo,
        });
      }
      const { sum, discountSum } = calculateTotals(state.services);
      state.total = sum;
      state.discountedTotal = discountSum;
    },

    removeService: (state, action: PayloadAction<string>) => {
      state.services = state.services.filter(
        (item) => item.service._id !== action.payload
      );

      const { sum, discountSum } = calculateTotals(state.services);
      state.total = sum;
      state.discountedTotal = discountSum;
    },

    updateBookingInfo: (
      state,
      action: PayloadAction<{
        id: string;
        bookingInfo: Partial<BookingInfo>;
      }>
    ) => {
      const item = state.services.find((s) => s.service._id === action.payload.id);
      if (item) {
        item.bookingInfo = { ...item.bookingInfo, ...action.payload.bookingInfo };
      }
    },

    clearServiceCart: (state) => {
      console.log("22")
      state.services = [];
      state.total = 0;
      state.discountedTotal = 0;

    },
  },
});

export const {
  addService,
  removeService,
  updateBookingInfo,
  clearServiceCart,
} = serviceCartSlice.actions;

export default serviceCartSlice;
