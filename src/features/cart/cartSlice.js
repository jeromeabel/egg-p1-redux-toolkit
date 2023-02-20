import { createSlice, createSelector } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: {} },
  reducers: {
    addToCart(state, action) {
      const id = action.payload;
      if (state.items[id]) state.items[id]++;
      else state.items[id] = 1;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

//Selectors
export const getNumItems = (state) => {
  let num = 0;
  for (let id in state.cart.items) {
    num += state.cart.items[id];
  }
  return num;
};

export const getTotalPrice = createSelector(
  (state) => state.products.products,
  (state) => state.cart.items,
  (products, items) => {
    let total = 0;
    for (let id in items) {
      total += products[id].price * items[id];
    }
    return total.toFixed(2);
  }
);
