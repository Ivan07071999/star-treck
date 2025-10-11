import { createAsyncThunk } from '@reduxjs/toolkit';
import { SeasonService } from '../../API';
import type { Season, ResponseType } from '../../index';
import type { SeasonResponse } from './DetailsSlice';

export const fetchAllSeasons = createAsyncThunk<Season[], void, { rejectValue: string }>(
  'seasons/fetchSeasons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await SeasonService.getAll();
      return response.seasons;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'There was an error loading seasons.'
      );
    }
  }
);

type FetchSelectSeasonsParams = {
  uid: string | null;
};

type ThunkApiConfig = {
  rejectValue: string;
};

export const fetchSelectSeasons = createAsyncThunk<
  SeasonResponse,
  FetchSelectSeasonsParams,
  ThunkApiConfig
>('selectSeason/fetchSelectSeasons', async ({ uid }, { rejectWithValue }) => {
  try {
    const response: ResponseType = await SeasonService.getSelectSeason(uid);
    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'There was an error loading seasons details.'
    );
  }
});
