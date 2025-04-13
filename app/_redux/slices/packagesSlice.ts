import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { errorToast } from "@/app/_components/common/alert/AlertTimer";
import i18next from "i18next";

const endPoint = process.env.NEXT_PUBLIC_SERVER_URL;
type packages = {
  loading: boolean;
  error: any;
  data: any[];
  redirectLoading: boolean;
};

const initialState: packages = {
  data: [],
  loading: false,
  error: "",
  redirectLoading: false,
};

export const fetchAllPackages = createAsyncThunk(
  "fetchAllPckagess",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).authSlice.token;
      const lang = i18next.language || "en";
      // Fetch subscriptions with dynamic language parameter
      const response = await axios.get(
        `${endPoint}/api/subscriptions/?lang=${lang}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data.subscriptions;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const StripPayment = createAsyncThunk(
  "StripPayment",
  async (data: any, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).authSlice.token;
      const lang = i18next.language || "en";
      // Choose package endpoint with dynamic language parameter
      const response = await axios.post(
        `${endPoint}/api/digital-signature/choose-package?lang=${lang}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const otpIncrease = createAsyncThunk(
  "otpIncrease",
  async (data: any, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).authSlice.token;
      const lang = i18next.language || "en";
      // Payment endpoint with dynamic language parameter
      const response = await axios.post(
        `${endPoint}/api/payment?lang=${lang}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPackages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
      })
      .addCase(fetchAllPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(StripPayment.pending, (state) => {
        state.redirectLoading = true;
      })
      .addCase(StripPayment.fulfilled, (state, action) => {
        setTimeout(() => {
          state.redirectLoading = false;
        }, 1000);
      })
      .addCase(StripPayment.rejected, (state, action) => {
        state.redirectLoading = false;
      });
  },
});

export default packagesSlice.reducer;
