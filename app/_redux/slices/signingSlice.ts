import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18next from "i18next";

export const SignRequest = createAsyncThunk(
  "signingSlice/SignRequest",
  async ({ data, endpoint }: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const lang = i18next.language || "en";
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/signing/${endpoint}?lang=${lang}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const SendOTP = createAsyncThunk(
  "signingSlice/SendOTP",
  async ({ endpoint }: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const lang = i18next.language || "en";
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/third-party/${endpoint}?lang=${lang}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

type signType = {
  data: any;
  loading: boolean;
  error: boolean;
};

const initialState: signType = {
  data: {},
  loading: false,
  error: false,
};

const signingSlice = createSlice({
  name: "signingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(SignRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(SignRequest.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = signingSlice.actions;
export default signingSlice.reducer;
