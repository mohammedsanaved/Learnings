import { configureStore } from '@reduxjs/toolkit';
import { dummyAPI } from '../pages/dummyAPI';
import { itemSlice } from './slices/itemSlices';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    [dummyAPI.reducerPath]: dummyAPI.reducer,
    items: itemSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
