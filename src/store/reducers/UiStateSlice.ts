import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Season } from '../../types';

type UIState = {
  pageNumber: number;
  allSeasons: Season[];
  filteredSeasons: Season[];
  selectedSeasonUid: string | null;
};

const initialState: UIState = {
  pageNumber: 1,
  allSeasons: [],
  filteredSeasons: [],
  selectedSeasonUid: null,
};

export const uiStateSlice = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setFilteredSeasons: (state, action: PayloadAction<Season[]>) => {
      state.filteredSeasons = action.payload;
    },
    setSelectedSeasonUid: (state, action: PayloadAction<string | null>) => {
      state.selectedSeasonUid = action.payload;
    },
    setAllSeasons: (state, action: PayloadAction<Season[]>) => {
      state.allSeasons = action.payload;
      if (state.filteredSeasons.length === 0) {
        state.filteredSeasons = action.payload;
      }
    },
  },
});

export const { setPageNumber, setFilteredSeasons, setSelectedSeasonUid, setAllSeasons } =
  uiStateSlice.actions;
export default uiStateSlice.reducer;
