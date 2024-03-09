import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { xAuth } from "../../lib/constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.valantis.store:41000/",
  }),
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: (payload) => ({
          url:"/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth": xAuth,
            
          },
          body: JSON.stringify(payload),
      })
    })
  }),
});

export const { useFetchDataQuery } = apiSlice;
export const apiReducer = apiSlice.reducer;
