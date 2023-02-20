import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState : { value: 10 },
  reducers: {
    increment: (state) => { state.value++; },
    decrement: (state) => { state.value--;},
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCurrentValue = (state) => state.value;
export default counterSlice.reducer;
