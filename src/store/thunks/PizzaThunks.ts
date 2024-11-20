import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPizza, IPizzaMutation, PizzasList } from '../../types.ds.ts';
import axiosApi from '../../axiosApi.ts';

export const createPizza = createAsyncThunk<void, IPizzaMutation>(
  'pizzas/createPizza',
  async (pizza) => {
    await axiosApi.post('pizzas.json', {...pizza});
  }
);

export const fetchAllPizzas = createAsyncThunk<IPizza[], void>(
  'pizzas/fetchAllPizzas',
  async () => {
    const response = await axiosApi<PizzasList | null>('pizzas.json');
    const pizzaList = response.data;

    if (pizzaList === null) {
      return [];
    }

    const pizzas = Object.keys(pizzaList).map((id) => ({
      ...pizzaList[id],
      id,
    }));

    return pizzas;
  }
);