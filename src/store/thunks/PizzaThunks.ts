import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPizzaMutation } from '../../types.ds.ts';
import axiosApi from '../../axiosApi.ts';

export const createPizza = createAsyncThunk<void, IPizzaMutation>(
  'pizzas/createPizza',
  async (pizza) => {
    await axiosApi.post('pizzas.json', {...pizza});
  }
);