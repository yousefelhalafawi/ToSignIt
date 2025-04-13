import { errorToast } from "@/app/_components/common/alert/AlertTimer";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18next from "i18next";

export const ResetPassword = createAsyncThunk(
  "forgetPasswordSlice/ResetPassword",
  async (data: any, { rejectWithValue }) => {
    try {
      const lang = i18next.language || "en";
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/reset-password?lang=${lang}`,
        data
      );
      return response.data;
    } catch (error: any) {
      errorToast(error.response.data.responseMessage);
      return rejectWithValue(error);
    }
  }
);

export const ActiveLink = createAsyncThunk(
  "forgetPasswordSlice/ActiveLink",
  async (data: any, { rejectWithValue }) => {
    try {
      const lang = i18next.language || "en";
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/live-activation-link?lang=${lang}`,
        {
          params: data,
        }
      );
      return response.data;
    } catch (error: any) {
      errorToast(error.response.data.responseMessage);
      return rejectWithValue(error);
    }
  }
);

export const ForgetPassword = createAsyncThunk(
  "forgetPasswordSlice/ForgetPassword",
  async (data: any, { rejectWithValue, getState }) => {
    try {
      const lang = i18next.language || "en";
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/forget-password?lang=${lang}`,
        data
      );
      return response.data;
    } catch (error: any) {
      errorToast(error.response.data.responseMessage);
      return rejectWithValue(error);
    }
  }
);

const forgetPasswordSlice = createSlice({
  name: "forgetPasswordSlice",
  initialState: {
    token: "",
    profileData: {},
    loading: false,
    error: false,
    email: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ResetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(ResetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(ResetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(ActiveLink.pending, (state) => {
        state.loading = true;
      })
      .addCase(ActiveLink.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(ActiveLink.rejected, (state) => {
        state.loading = false;
      })
      .addCase(ForgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(ForgetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(ForgetPassword.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setEmail } = forgetPasswordSlice.actions;
export default forgetPasswordSlice.reducer;
