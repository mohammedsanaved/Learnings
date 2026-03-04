// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: {},
//   loading: false,
//   error: null,
// };

// export const itemSlice = createSlice({
//   name: 'items',
//   initialState,
//   reducers: {
//     itemAdded: (state, action) => {
//       // state.items = action.payload;
//       const itemMap = action.payload.reduce((map: any, item: any) => {
//         map[item.id] = item;
//         return map;
//       }, {});
//       state.items = itemMap;
//     },
//   },
// });
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// 1. Create Adapter
const itemsAdapter = createEntityAdapter({
  selectId: (item: any) => item.id,
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsAdapter.getInitialState(), // Creates { ids: [], entities: {} }
  reducers: {
    itemAdded: itemsAdapter.setAll, // Automatically normalizes array to object
    // deleteOne: itemsAdapter.removeOne,
  },
});

// 2. Export pre-built selectors
export const { selectById, selectAll } = itemsAdapter.getSelectors(
  (state: any) => state.items,
);
export const { itemAdded } = itemsSlice.actions;
export default itemsSlice.reducer;
