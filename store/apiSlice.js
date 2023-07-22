import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  prepareHeaders: (headers, { getState }) => {
    if (getState().auth.userInfo != null) {
      headers.set("Authorization", `${getState().auth.userInfo._token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
