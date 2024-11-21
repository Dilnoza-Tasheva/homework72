import { IPizza, PizzaCart } from '../../types.ds.ts';
import { RootState } from '../../app/store.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  pizzasCart: PizzaCart[];
 }

 const initialState: CartState = {
  pizzasCart: []
 };

export const selectCartPizzas = (state: RootState) => state.pizzaCart.pizzasCart;

const pizzaCartSlice = createSlice({
  name: 'pizzaCart',
  initialState,
  reducers: {
    addPizza: (state, {payload: pizza}: PayloadAction<IPizza>) => {
      const indexPizza = state.pizzasCart.findIndex(pizzaCart => pizzaCart.pizza.id === pizza.id);

      if (indexPizza === -1) {
        state.pizzasCart = [...state.pizzasCart, {pizza, amount: 1}];
      } else {
        const cartCopy = [...state.pizzasCart];
        const copyPizzaCart = {...cartCopy[indexPizza]};
        copyPizzaCart.amount++;
        cartCopy[indexPizza] = copyPizzaCart;
        state.pizzasCart = [...cartCopy];
      }
    },
    clearPizzaCart: (state) => {
      state.pizzasCart = [];
    },
    updatePizzaCart: (state, {payload: pizzas}: PayloadAction<IPizza[]>) => {
      state.pizzasCart = state.pizzasCart.map((cartPizza) => {
        const updatePizza = pizzas.find(p => p.id === cartPizza.pizza.id);

        if (updatePizza) {
          return {
            ...cartPizza,
            pizza: updatePizza
          };
        }
        return cartPizza;
      });
    },
    deletePizzaFromCart: (state, {payload: pizzaId}: PayloadAction<string>) => {
      state.pizzasCart = state.pizzasCart.filter(cartPizza => cartPizza.pizza.id !== pizzaId);
    }
  },
});

export const pizzaCartReducer = pizzaCartSlice.reducer;
export const {addPizza, clearPizzaCart, updatePizzaCart,deletePizzaFromCart} = pizzaCartSlice.actions;