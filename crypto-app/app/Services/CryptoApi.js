"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BaseUrl = "https://coinranking1.p.rapidapi.com";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-host", "coinranking1.p.rapidapi.com");
      headers.set(
        "x-rapidapi-key",
        "4eb459bed0mshc382ffa9dee7835p1bf04cjsn5a64cda923a4"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => `/coins?limit=${count}`,
    }),
    getCryptDetails: builder.query({
      query: (coinId) => `/coin/${coinId}`,
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        `/coin/${coinId}/history?timePeriod=${timePeriod}`,

    }),

  }),
});


export const {
  useGetCryptosQuery,
  useGetCryptDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
