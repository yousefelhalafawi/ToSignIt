import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { errorToast } from "@/app/_components/common/alert/AlertTimer";
import i18next from "i18next";

const endPoint = process.env.NEXT_PUBLIC_SERVER_URL;
type news = {
  loading: boolean;
  error: any;
  data: any[];
  sliderData: any[];
  errorSlider: any;
  loadingSlider: boolean;
  totalPages: number;
  loadingNewsById: boolean;
  errorNewsById: any;
  deleteData: any;
};

const initialState: news = {
  data: [],
  loading: false,
  error: "",
  sliderData: [],
  errorSlider: "",
  loadingSlider: false,
  totalPages: 0,
  loadingNewsById: false,
  errorNewsById: "",
  deleteData: "",
};

export const fetchAllNews = createAsyncThunk(
  "fetchAllNews",
  async (
    { limit, page }: { limit: number; page: number },
    { rejectWithValue, getState }
  ) => {
    try {
      const token = (getState() as RootState).authSlice.token;
      const lang = i18next.language || "en";
      // Append the language parameter dynamically
      const response = await axios.get(
        `${endPoint}/api/news/?limit=${limit}&page=${page}&lang=${lang}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSliderNews = createAsyncThunk(
  "sliderNews",
  async (_, { rejectWithValue, getState }) => {
    const token = (getState() as RootState).authSlice.token;
    try {
      const lang = i18next.language || "en";
      const response = await axios.get(
        `${endPoint}/api/news/slider?lang=${lang}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data.news;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteNewsById = createAsyncThunk(
  "DeleteNewsById",
  async (id: string, { rejectWithValue, getState }) => {
    const token = (getState() as RootState).authSlice.token;
    try {
      const lang = i18next.language || "en";
      const response = await axios.delete(
        `${endPoint}/api/news/${id}?lang=${lang}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.responseMessage;
    } catch (error: any) {
      errorToast(error.response.data.responseMessage);
      return rejectWithValue(error);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload.allNews;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSliderNews.pending, (state) => {
        state.loadingSlider = true;
      })
      .addCase(fetchSliderNews.fulfilled, (state, action) => {
        state.loadingSlider = false;
        state.errorSlider = "";
        state.sliderData = action.payload;
      })
      .addCase(fetchSliderNews.rejected, (state, action) => {
        state.loadingNewsById = false;
        state.errorNewsById = action.payload;
      })
      .addCase(deleteNewsById.pending, (state) => {
        state.loadingNewsById = true;
      })
      .addCase(deleteNewsById.fulfilled, (state, action) => {
        state.loadingNewsById = false;
        state.errorNewsById = "";
        state.deleteData = action.payload;
      })
      .addCase(deleteNewsById.rejected, (state, action) => {
        state.loadingNewsById = false;
        state.errorNewsById = action.payload;
      });
  },
});

export default newsSlice.reducer;
