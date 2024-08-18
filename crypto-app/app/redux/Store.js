"use client";

import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../Services/CryptoApi";
import showSlice from "../Services/ShowSlice";
export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    show: showSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});
