import { errorToast } from "@/app/_components/common/alert/AlertTimer";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18next from "i18next";

export const getCompanyData = createAsyncThunk(
  "companySlice/getCompanyData",
  async (_, { rejectWithValue, getState }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const lang = i18next.language || "en";
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/company?lang=${lang}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Bearer token here
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const EditCompanyData = createAsyncThunk(
  "companySlice/EditCompanyData",
  async (data: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const lang = i18next.language || "en";
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/company?lang=${lang}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      errorToast(error.response.data.responseMessage);
      return rejectWithValue(error);
    }
  }
);

export const AddUserCompany = createAsyncThunk(
  "companySlice/AddUserCompany",
  async (data: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const lang = i18next.language || "en";
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/company/add-member?lang=${lang}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      errorToast(error.response.data.responseMessage);
      return rejectWithValue(error);
    }
  }
);

export const DeleteUserCompany = createAsyncThunk(
  "companySlice/DeleteUserCompany",
  async (data: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const lang = i18next.language || "en";
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/company/remove-member/${data.userId}?lang=${lang}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      errorToast(error.response.data.responseMessage);
      return rejectWithValue(error);
    }
  }
);

type companyType = {
  token: string;
  companyData: any;
  loading: boolean;
  error: boolean;
  email: string;
};

const initialState: companyType = {
  token: "",
  companyData: {},
  loading: false,
  error: false,
  email: "",
};

const companySlice = createSlice({
  name: "companySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompanyData.fulfilled, (state, action) => {
        state.loading = false;
        state.companyData = action.payload.data.user;
      })
      .addCase(getCompanyData.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(EditCompanyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditCompanyData.fulfilled, (state, action) => {
        state.loading = false;
        state.companyData.companyName = action.payload.data.company.companyName;
      })
      .addCase(EditCompanyData.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(AddUserCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddUserCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companyData.users = action.payload.data.company.users;
      })
      .addCase(AddUserCompany.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(DeleteUserCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteUserCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companyData.users = action.payload.data.company.users;
      })
      .addCase(DeleteUserCompany.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {} = companySlice.actions;
export default companySlice.reducer;
