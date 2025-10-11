import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Season } from '../../index';
import { fetchAllSeasons } from '../../index';

type SeasonState = {
  allSeasons: Season[];
  seasons: Season[];
  isLoading: boolean;
  pageNumber: number;
  error: string;
};

const initialState: SeasonState = {
  allSeasons: [],
  seasons: [],
  isLoading: false,
  pageNumber: 1,
  error: '',
};

export const seasonSlice = createSlice({
  name: 'season',
  initialState,
  reducers: {
    switchPage(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setFilteredSeasons(state, action: PayloadAction<Season[]>) {
      state.seasons = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSeasons.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchAllSeasons.fulfilled, (state, action: PayloadAction<Season[]>) => {
        state.isLoading = false;
        state.error = '';
        state.allSeasons = action.payload;
        state.seasons = action.payload;
      })
      .addCase(
        fetchAllSeasons.rejected,
        (state, action: ReturnType<typeof fetchAllSeasons.rejected>) => {
          state.isLoading = false;
          state.error = typeof action.payload === 'string' ? action.payload : 'Failed to load data';
        }
      );
  },
});

export default seasonSlice.reducer;
