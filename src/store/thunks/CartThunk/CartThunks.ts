import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi.ts';
import { clearPizzaCart } from '../../slices/CartSlice/CartSlice.ts';

interface orderPayload {
  cartPizzas: {pizza: {id: string}; amount: number}[];
}

interface orderFormat {
  [key: string]: number;
}

export const confirmPizzaOrder = createAsyncThunk<void, orderPayload>(
  'cart/confirmPizzaOrder',
  async({cartPizzas}, {dispatch}) => {
    const orderData: orderFormat = cartPizzas.reduce((order, cartItem) => {
      return{
        ...order,
        [cartItem.pizza.id]: cartItem.amount,
      };
    }, {} as orderFormat);

    await axiosApi.post('/orders.json', orderData);
    dispatch(clearPizzaCart());
  }
);



