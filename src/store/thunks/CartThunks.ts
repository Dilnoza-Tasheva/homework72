import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { clearPizzaCart } from '../slices/CartSlice.ts';
import { IOrder, OrdersList, } from '../../types.ds.ts';

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

export const fetchAllOrders = createAsyncThunk<IOrder[], void>(
  'orders/fetchAllOrders',
   async () => {
    const response = await axiosApi<OrdersList | null>('orders.json');
    const ordersList = response.data;

    if (ordersList === null) {
      return [];
    }

    const orders = Object.keys(ordersList).map((id) => ({
      id,
      ...ordersList[id],
    }));

    return orders;
   }
);

