import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// inerface Item {}

export const dummyAPI = createApi({
  reducerPath: 'dummyAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getItems: builder.query<any, void>({
      query: () => 'users',
    }),
    getItemById: builder.query<any, number>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetItemsQuery, useGetItemByIdQuery } = dummyAPI;
