"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BaseUrl = "https://coinranking1.p.rapidapi.com";
const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "4eb459bed0mshc382ffa9dee7835p1bf04cjsn5a64cda923a4",
};
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
