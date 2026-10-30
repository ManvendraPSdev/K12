import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

export const inquiryApi = createApi({
  reducerPath: 'inquiryApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Inquiries'],
  endpoints: (builder) => ({
    // Fetch inquiries list with pagination, search, and filters
    getInquiries: builder.query({
      query: (params = {}) => ({
        url: '/admin/inquiries',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result && result.inquiries
          ? [
              ...result.inquiries.map(({ id }) => ({ type: 'Inquiries', id })),
              { type: 'Inquiries', id: 'LIST' },
            ]
          : [{ type: 'Inquiries', id: 'LIST' }],
    }),

    // Fetch single inquiry by ID
    getInquiryById: builder.query({
      query: (id) => ({
        url: `/admin/inquiries/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Inquiries', id }],
    }),

    // Update inquiry status
    updateInquiryStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/inquiries/${id}/status`,
        method: 'PATCH',
        data: { status },
      }),
      // Strictly confirm API update first before refetching/reflecting changes (no optimistic update)
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Inquiries', id },
        { type: 'Inquiries', id: 'LIST' },
      ],
    }),

    // Delete inquiry
    deleteInquiry: builder.mutation({
      query: (id) => ({
        url: `/admin/inquiries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Inquiries', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetInquiriesQuery,
  useGetInquiryByIdQuery,
  useUpdateInquiryStatusMutation,
  useDeleteInquiryMutation,
} = inquiryApi;
