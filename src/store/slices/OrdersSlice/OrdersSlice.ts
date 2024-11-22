import { IOrder } from '../../../types.ds.ts';
import { createSlice } from '@reduxjs/toolkit';
import { deleteOrder, fetchAllOrders } from '../../thunks/OrdersThunks/OrdersThunks.ts';
import { RootState } from '../../../app/store.ts';

interface OrdersState {
  orders: IOrder[];
  isFetchLoading: boolean;
  isDeleteLoading: boolean | string;
}

const initialState: OrdersState = {
  orders: [],
  isFetchLoading: false,
  isDeleteLoading: false,
};

export const selectOrders = (state: RootState) => state.orders.orders;

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.isFetchLoading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, {payload}) => {
        state.isFetchLoading = false;
        state.orders = payload;
      })
      .addCase(fetchAllOrders.rejected, (state) => {
        state.isFetchLoading = false;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, {meta}) => {
        state.isDeleteLoading = false;
        state.orders = state.orders.filter((order) => order.id !== meta.arg);
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.isDeleteLoading = false;
      });
  },
});

export const ordersReducer = ordersSlice.reducer;