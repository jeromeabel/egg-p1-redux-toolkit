import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: {} },
  reducers: {
    addToCart(state, action) {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
  },
});

//Selector
export const getNumItems = (state) => {
  let num = 0;
  for (let id in state.cart.items) {
    num += state.cart.items[id];
  }
  return num;
};

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
