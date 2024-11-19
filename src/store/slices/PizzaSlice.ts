import { createSlice } from '@reduxjs/toolkit';
import { IPizza, IPizzaMutation } from '../../types.ds.ts';
import { createPizza } from '../thunks/PizzaThunks.ts';

interface PizzasState {
  pizzas: IPizza[];
  onePizza: IPizzaMutation | null;
  isCreateLoading: boolean;
}

const initialState: PizzasState = {
  pizzas: [],
  onePizza: null,
  isCreateLoading: false,
};

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPizza.pending, (state) => {
        state.isCreateLoading = true;
      })
      .addCase(createPizza.fulfilled, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(createPizza.rejected, (state) => {
        state.isCreateLoading = false;
      });
  }
});

export const pizzasReducer = pizzaSlice.reducer;