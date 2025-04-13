import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18next from "i18next";

export const GetDocs = createAsyncThunk(
  "documentSlice/GetDocs",
  async ({ params }: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const lang = i18next.language || "en";
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-documents?lang=${lang}`,
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
export const downloadDocument = createAsyncThunk(
  "documentSlice/downloadDocument",
  async ({ params }: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    try {
      const lang = i18next.language || "en";
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/signing/download-document`,
        {},
        {
          params,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const addDoc = createAsyncThunk(
  "documentSlice/addDoc",
  async (data: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const lang = i18next.language || "en";
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-documents?lang=${lang}`,
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

export const DeleteDoc = createAsyncThunk(
  "documentSlice/DeleteDoc",
  async (DocID: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const lang = i18next.language || "en";
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-documents/${DocID}?lang=${lang}`,
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

export const verfiyDoc = createAsyncThunk(
  "documentSlice/verfiyDoc",
  async (data: any, { rejectWithValue, getState }) => {
    const state: any = getState();
    const { token } = state.authSlice;
    try {
      const lang = i18next.language || "en";
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/validation-pdf?lang=${lang}`,
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

type requestsType = {
  DocsData: any;
  loading: boolean;
  error: boolean;
};

const initialState: requestsType = {
  DocsData: {},
  loading: false,
  error: false,
};

const documentSlice = createSlice({
  name: "documentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetDocs.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetDocs.fulfilled, (state, action) => {
        state.loading = false;
        state.DocsData = action.payload.data;
      })
      .addCase(GetDocs.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(downloadDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(downloadDocument.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(downloadDocument.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(DeleteDoc.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteDoc.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update DocsData after deletion
      })
      .addCase(DeleteDoc.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {} = documentSlice.actions;
export default documentSlice.reducer;
