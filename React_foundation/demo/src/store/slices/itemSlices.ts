import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemAdded: (state, action) => {
      state.items = action.payload;
    },
  },
});
