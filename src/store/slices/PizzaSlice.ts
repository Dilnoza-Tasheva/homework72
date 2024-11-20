import { createSlice } from '@reduxjs/toolkit';
import { IPizza, IPizzaMutation } from '../../types.ds.ts';
import { createPizza, fetchAllPizzas } from '../thunks/PizzaThunks.ts';
import { RootState } from '../../app/store.ts';

interface PizzasState {
  pizzas: IPizza[];
  onePizza: IPizzaMutation | null;
  isCreateLoading: boolean;
  isFetchLoading: boolean;
}

const initialState: PizzasState = {
  pizzas: [],
  onePizza: null,
  isCreateLoading: false,
  isFetchLoading: false,
};
export const selectFetchPizzasLoading = (state: RootState) => state.pizzas.isFetchLoading;
export const selectPizzas = (state: RootState) => state.pizzas.pizzas;

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
      })
      .addCase(fetchAllPizzas.pending, (state) => {
        state.isFetchLoading = true;
      })
      .addCase(fetchAllPizzas.fulfilled, (state, action) => {
        state.isFetchLoading = false;
        state.pizzas = action.payload;
      })
      .addCase(fetchAllPizzas.rejected, (state) => {
        state.isFetchLoading = false;
      })
    ;
  }
});

export const pizzasReducer = pizzaSlice.reducer;