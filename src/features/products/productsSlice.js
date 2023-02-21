import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products', //action name : products/loadProducts
  initialState: { products: {} },
  reducers: {
    loadProducts(state, action) {
      const products = action.payload;
      products.forEach((product) => {
        state.products[product.id] = product;
      });
    },
  },
});

export const { loadProducts } = productsSlice.actions;
export default productsSlice.reducer;
