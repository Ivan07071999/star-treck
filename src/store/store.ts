import { combineReducers, configureStore } from '@reduxjs/toolkit';
import seasonReducer from './reducers/SeasonSlice';
import detailsReducer from './reducers/DetailsSlice';
import selectedItemsReducer from './reducers/SelectedItemsSlice';

const rootReducer = combineReducers({
  seasonReducer,
  detailsReducer,
  selectedItemsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
