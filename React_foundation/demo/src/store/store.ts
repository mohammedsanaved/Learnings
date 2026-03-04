import { configureStore } from '@reduxjs/toolkit';
import { dummyAPI } from '../pages/dummyAPI';
import itemsSlice from './slices/itemSlices';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    [dummyAPI.reducerPath]: dummyAPI.reducer,
    items: itemsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
