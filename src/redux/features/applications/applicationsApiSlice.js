import { API_ROUTES } from "@/constants/routes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applications = createApi({
  reducerPath: "applicationsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL
  }),
  endpoints: (builder) => ({
    getDashData: builder.query({
      query: (uid) => ({
        url: API_ROUTES.DASHBOARD + `?uid=${uid}`,
      }),
      providesTags: (result, error, uid) => [{ type: 'Dashboard', id: uid }]
    }),
    getApplications: builder.query({
      query: (uid) => ({
        url: API_ROUTES.APPLICATIONS + `?uid=${uid}`,
      }),
    }),
    addApplication: builder.mutation({
      query: (application) => ({
        url: API_ROUTES.APPLICATIONS,
        method: "POST",
        body: application,
      }),
      invalidatesTags: (result, error, { uid }) => [{ type: 'Dashboard', id: uid }]
    }),
    editApplication: builder.mutation({
      query: (application) => ({
        url: API_ROUTES.APPLICATIONS + `/${application.id}`,
        method: "PUT",
        body: application,
      }),
      invalidatesTags: (result, error, { uid }) => [{ type: 'Dashboard', id: uid }]
    }),
    deleteApplication: builder.mutation({
      query: (id) => ({
        url: API_ROUTES.APPLICATIONS + `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetDashDataQuery,
  useAddApplicationMutation,
  useDeleteApplicationMutation,
  useEditApplicationMutation,
} = applications;
