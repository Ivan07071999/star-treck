import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse, Season, ResponseType } from '../types';

export const seasonAPI = createApi({
  reducerPath: 'seasonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v1/rest/' }),
  tagTypes: ['Season'],
  endpoints: (build) => ({
    getSeasons: build.query<Season[], void>({
      query: () => 'season/search',
      transformResponse: (response: ApiResponse) => response.seasons,
      providesTags: ['Season'],
    }),

    getSeasonById: build.query<ResponseType, string>({
      query: (uid) => `season?uid=${uid}`,
      providesTags: (_result, _error, uid) => [{ type: 'Season', id: uid }],
    }),
  }),
});

export const api = seasonAPI;
