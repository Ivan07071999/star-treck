import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SelectedItem = {
  uid: string;
  title: string;
  seriesTitle: string;
  seasonNumber: number;
  numberOfEpisodes: number | null;
  url: string;
};

type SelectedItemsState = {
  items: SelectedItem[];
};

const initialState: SelectedItemsState = {
  items: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItemSelection: (state, action: PayloadAction<SelectedItem>) => {
      const existingIndex = state.items.findIndex((item) => item.uid === action.payload.uid);
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { toggleItemSelection, clearItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
