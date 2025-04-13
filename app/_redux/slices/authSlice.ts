import { errorToast } from "@/app/_components/common/alert/AlertTimer";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18next from "i18next";

type authType = {
  token: string;
  profileData: Record<string, any>;
  userSignature: Record<string, any>;
  loading: boolean;
  error: boolean;
};

const initialState: authType = {
  token: "",
  userSignature: {},
  profileData: {},
  loading: false,
  error: false,
};

export const Login = createAsyncThunk(
  "authSlice/Login",
  async (data: any, { rejectWithValue }) => {
    try {
      const lang = i18next.language || "en";
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login?lang=${lang}`,
        data
      );
      return response.data;
    } catch (error: any) {
      errorToast(error.response.data.responseMessage);
      return rejectWithValue(error);
    }
  }
);
export const getUserData = createAsyncThunk(
  "authSlice/getUserData",
  async (_, { rejectWithValue, getState }) => {
    try {
      const lang = i18next.language || "en";
      const state: any = getState();
      const { token } = state.authSlice;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/profile?lang=${lang}`,
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

export const Register = createAsyncThunk(
  "authSlice/Register",
  async (data: any, { rejectWithValue }) => {
    try {
      const lang = i18next.language || "en";
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/register?lang=${lang}`,
        data
      );
      return response.data;
    } catch (error: any) {
      errorToast(error.response.data.responseMessage);
      return rejectWithValue(error);
    }
  }
);

export const CompanyRegister = createAsyncThunk(
  "authSlice/CompanyRegister",
  async (data: any, { rejectWithValue }) => {
    try {
      const lang = i18next.language || "en";
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/company/register?lang=${lang}`,
        data
      );
      return response.data;
    } catch (error: any) {
      errorToast(error.response.data.responseMessage);
      return rejectWithValue(error);
    }
  }
);

export const EditProfileFunction = createAsyncThunk(
  "authSlice/EditProfileFunction",
  async (data: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const lang = i18next.language || "en";
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user?lang=${lang}`,
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

export const ChangePasswordFunction = createAsyncThunk(
  "authSlice/ChangePasswordFunction",
  async (data: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/password`,
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

export const Logout = createAsyncThunk(
  "authSlice/Logout",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(LogoutFunction());
      return response.data;
    } catch (error: any) {
      dispatch(LogoutFunction());
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    LogoutFunction: (state) => {
      state.profileData = {};
      state.token = "";
      window.location.href = "/";
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserSignature: (state, action) => {
      state.userSignature = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload.data.user;
        state.token = action.payload.data.token;
        state.userSignature = action.payload.data.userSignature;
      })
      .addCase(Login.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload.data.user;
        state.userSignature = action.payload.data.userSignature;
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(Register.pending, (state) => {
        state.loading = true;
      })
      .addCase(Register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(Register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(CompanyRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(CompanyRegister.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(CompanyRegister.rejected, (state) => {
        state.loading = false;
      })
      .addCase(EditProfileFunction.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditProfileFunction.fulfilled, (state, action) => {
        state.token = action.payload.data.token;
        state.profileData = action.payload.data.user;
        state.loading = false;
      })
      .addCase(EditProfileFunction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(ChangePasswordFunction.pending, (state) => {
        state.loading = true;
      })
      .addCase(ChangePasswordFunction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(ChangePasswordFunction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { LogoutFunction, setToken, setUserSignature } = authSlice.actions;
export default authSlice.reducer;
