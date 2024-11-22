import { IOrder } from '../../types.ds.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAllOrders } from '../thunks/CartThunks.ts';
import { RootState } from '../../app/store.ts';

interface OrdersState {
  orders: IOrder[];
  isFetchLoading: boolean;
}

const initialState: OrdersState = {
  orders: [],
  isFetchLoading: false,
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
      });
  },
});

export const ordersReducer = ordersSlice.reducer;