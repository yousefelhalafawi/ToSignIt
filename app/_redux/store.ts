import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage for web
import { combineReducers } from "redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

// Import your slices (reducers)
import authSlice from "./slices/authSlice";
import newsSlice from "./slices/newsSlice";
import forgetPasswordSlice from "./slices/forgetPasswordSlice";
import companySlice from "./slices/companySlice";
import packagesSlice from "./slices/packagesSlice";
import requestsSlice from "./slices/requestsSlice";
import signingSlice from "./slices/signingSlice";
import documentSlice from "./slices/documentSlice";
import contactSlice from "./slices/contact";

const persistConfig = {
  key: "root",
  storage: storageSession,
  blacklist: ["newsSlice"],
};

// Combine reducers
const rootReducer = combineReducers({
  authSlice,
  newsSlice,
  forgetPasswordSlice,
  companySlice,
  packagesSlice,
  requestsSlice,
  signingSlice,
  documentSlice,
  contactSlice,
});

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export const persistor = persistStore(store);
