import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18next from "i18next";

export const GetRequests = createAsyncThunk(
  "requestsSlice/GetRequests",
  async ({ params }: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const lang = i18next.language || "en";
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/signing?lang=${lang}`,
        {
          params,
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

type requestsType = {
  requestsData: any;
  loading: boolean;
  error: boolean;
};
const initialState: requestsType = {
  requestsData: {},
  loading: false,
  error: false,
};
const requestsSlice = createSlice({
  name: "requestsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requestsData = action.payload.data;
      })
      .addCase(GetRequests.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const {} = requestsSlice.actions;
export default requestsSlice.reducer;
