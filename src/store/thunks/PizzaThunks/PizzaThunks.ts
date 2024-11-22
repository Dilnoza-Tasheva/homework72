import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPizza, IPizzaMutation, PizzasList } from '../../../types.ds.ts';
import axiosApi from '../../../axiosApi.ts';

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

export const deleteOnePizza = createAsyncThunk<void, string>(
  'pizzas/deleteOnePizza',
  async (pizzaId) => {
    await axiosApi.delete(`pizzas/${pizzaId}.json`);
  }
);

export const getOnePizzaById = createAsyncThunk<IPizzaMutation | null, string>(
  'pizzas/getOnePizzaById',
  async (pizzaId) => {
    const response = await axiosApi<IPizzaMutation | null>(`pizzas/${pizzaId}.json`);
    if (!response.data) return null;
    return response.data;
  }
);

export const editPizza = createAsyncThunk<void, {pizzaId: string, pizza: IPizzaMutation}>(
  'pizzas/editPizza',
   async({pizzaId, pizza}) => {
    await axiosApi.put(`pizzas/${pizzaId}.json`, {...pizza});
   }
);
