import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder, OrdersList } from '../../../types.ds.ts';
import axiosApi from '../../../axiosApi.ts';

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

export const deleteOrder = createAsyncThunk<void, string>(
  'orders/deleteOrder',
  async(orderId, {dispatch}) => {
    await axiosApi.delete(`orders/${orderId}.json`);
    dispatch(fetchAllOrders());
  }
);