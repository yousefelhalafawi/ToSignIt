import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18next from "i18next";

export const sendContactRequest = createAsyncThunk(
  "contactSlice/sendContactRequest",
  async ({ data }: any, { rejectWithValue, getState }) => {
    try {
      const lang = i18next.language || "en";
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact-us?lang=${lang}`,
        data
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

const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendContactRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendContactRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(sendContactRequest.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = contactSlice.actions;
export default contactSlice.reducer;
