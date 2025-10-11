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
    addItem: (state, action: PayloadAction<SelectedItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.uid !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
