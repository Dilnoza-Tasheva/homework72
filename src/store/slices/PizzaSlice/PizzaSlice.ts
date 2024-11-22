import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPizza, IPizzaMutation } from '../../../types.ds.ts';
import { createPizza, deleteOnePizza, editPizza, fetchAllPizzas, getOnePizzaById } from '../../thunks/PizzaThunks/PizzaThunks.ts';
import { RootState } from '../../../app/store.ts';

interface PizzasState {
  pizzas: IPizza[];
  onePizza: IPizzaMutation | null;
  isCreateLoading: boolean;
  isFetchLoading: boolean;
  isDeleteLoading: boolean | string;
  isEditLoading: boolean;
}

const initialState: PizzasState = {
  pizzas: [],
  onePizza: null,
  isCreateLoading: false,
  isFetchLoading: false,
  isDeleteLoading: false,
  isEditLoading: false,
};
export const selectFetchPizzasLoading = (state: RootState) => state.pizzas.isFetchLoading;
export const selectPizzas = (state: RootState) => state.pizzas.pizzas;
export const selectOnePizza = (state: RootState) => state.pizzas.onePizza;

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
      .addCase(deleteOnePizza.pending, (state, {meta}) => {
        state.isDeleteLoading = meta.arg;
      })
      .addCase(deleteOnePizza.fulfilled, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(deleteOnePizza.rejected, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(getOnePizzaById.pending, (state) => {
        state.isFetchLoading = true;
        state.onePizza = null;
      })
      .addCase(getOnePizzaById.fulfilled, (state, action: PayloadAction<IPizzaMutation | null>) => {
        state.isFetchLoading = false;
        state.onePizza = action.payload;
      })
      .addCase(getOnePizzaById.rejected, (state) => {
        state.isFetchLoading = false;
      })
      .addCase(editPizza.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(editPizza.fulfilled, (state) => {
        state.isEditLoading = false;
        state.onePizza = null;
      })
      .addCase(editPizza.rejected, (state) => {
        state.isEditLoading = false;
      })
    ;
  }
});

export const pizzasReducer = pizzaSlice.reducer;