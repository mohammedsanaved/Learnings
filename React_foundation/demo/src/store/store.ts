import { configureStore } from '@reduxjs/toolkit';
import { dummyAPI } from '../pages/dummyAPI';
import itemsSlice from './slices/itemSlices';
import todoSlice from './slices/todoSlices';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    [dummyAPI.reducerPath]: dummyAPI.reducer,
    items: itemsSlice,
    todos: todoSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
