import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define types for better type safety
interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

interface PhotosResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
  next_page: string;
}

// Define query params interface
interface GetPhotosParams {
  query: string;
  perPage?: number;
  currentPage?: number;
}

export const dummyAPI = createApi({
  reducerPath: 'dummyAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
    // baseUrl: 'https://api.pexels.com/v1/',
    // prepareHeaders: (headers) => {
    //   headers.set(
    //     'Authorization',
    //     'yK01SPCXb6j6nCvBRd0nBIllK0P4Ifkh3cgqwaG8kt4DFMqJJHxtfzRx',
    //   );
    //   return headers; // Don't forget to return headers!
    // },
  }),
  endpoints: (builder) => ({
    getItems: builder.query<any, void>({
      query: () => 'users',
    }),

    // Fixed: Use single object parameter with proper types
    getPhotos: builder.query<PhotosResponse, GetPhotosParams>({
      query: ({ query, perPage = 10, currentPage = 1 }) =>
        `search?query=${query}&per_page=${perPage}&page=${currentPage}`,
    }),

    getItemById: builder.query<any, number>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetItemsQuery, useGetPhotosQuery, useGetItemByIdQuery } =
  dummyAPI;
