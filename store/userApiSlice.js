import { useSelector } from "react-redux";
import { apiSlice } from "./apiSlice";

export const userApiSlide = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    _user_login_: builder.mutation({
      query: (data) => ({
        url: "/users/auth",
        method: "POST",
        body: data,
      }),
    }),

    _user_logout_: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),

    _user_registration_: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),

    _user_update_: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  use_user_login_Mutation,
  use_user_logout_Mutation,
  use_user_registration_Mutation,
  use_user_update_Mutation,
} = userApiSlide;
