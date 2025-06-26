import { API_ROUTES } from "@/constants/routes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const user = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user) => ({
        url: API_ROUTES.SIGNUP,
        method: "POST",
        body: user
      })
    }),
    logIn: builder.mutation({
      query: (user) => ({
        url: API_ROUTES.LOGIN,
        method: "POST",
        body: user
      })
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: API_ROUTES.USER + `/${payload.uid}`,
        method: "PUT",
        body: payload.user
      })
    }),
    updatePassword: builder.mutation({
      query: ({current_password, new_password, uid}) => ({
        url: API_ROUTES.CHANGE_PASSWORD + `/${uid}`,
        method: "PUT",
        body: {current_password, new_password}
      })
    }),
    deleteAccount: builder.mutation({
      query: (uid) => ({
        url: API_ROUTES.USER + `/${uid}`,
        method: "DELETE",
      })
    }),
  }),
});

export const {
  useLogInMutation,
  useSignUpMutation,
  useUpdatePasswordMutation,
  useUpdateUserMutation,
  useDeleteAccountMutation
} = user;
