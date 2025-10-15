import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './reducers/SelectedItemsSlice';
import { seasonAPI } from '../services';
import UIReducer from './reducers/UiStateSlice';

const rootReducer = combineReducers({
  selectedItemsReducer,
  UIReducer,
  [seasonAPI.reducerPath]: seasonAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(seasonAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
