import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchSelectSeasons, type SelectSeason } from '../../index';

type DetailsState = {
  season: SelectSeason | null;
  isLoading: boolean;
  error: string;
  seasonUid: string | null;
};

export type SeasonResponse = {
  season: SelectSeason;
};

const initialState: DetailsState = {
  season: null,
  isLoading: false,
  error: '',
  seasonUid: null,
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setSeasonUid(state, action: PayloadAction<string | null>) {
      state.seasonUid = action.payload;
    },
    resetSelectSeason(state, action: PayloadAction<null>) {
      state.season = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelectSeasons.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchSelectSeasons.fulfilled, (state, action: PayloadAction<SeasonResponse>) => {
        state.isLoading = false;
        state.error = '';
        state.season = action.payload.season;
      })
      .addCase(fetchSelectSeasons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to load data';
      });
  },
});

export default detailsSlice.reducer;
