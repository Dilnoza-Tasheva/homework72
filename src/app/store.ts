import { configureStore } from '@reduxjs/toolkit';
import { pizzasReducer } from '../store/slices/PizzaSlice/PizzaSlice.ts';
import { pizzaCartReducer } from '../store/slices/CartSlice/CartSlice.ts';
import { ordersReducer } from '../store/slices/OrdersSlice/OrdersSlice.ts';

export const store = configureStore({
  reducer: {
    pizzas: pizzasReducer,
    pizzaCart: pizzaCartReducer,
    orders: ordersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;