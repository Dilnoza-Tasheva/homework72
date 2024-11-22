import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectOrders } from '../../store/slices/OrdersSlice/OrdersSlice.ts';
import { selectFetchPizzasLoading, selectPizzas } from '../../store/slices/PizzaSlice/PizzaSlice.ts';
import { useEffect } from 'react';
import { deleteOrder, fetchAllOrders } from '../../store/thunks/OrdersThunks/OrdersThunks.ts';
import { fetchAllPizzas } from '../../store/thunks/PizzaThunks/PizzaThunks.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';


const Orders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const pizzas = useAppSelector(selectPizzas);
  const isFetchLoading = useAppSelector(selectFetchPizzasLoading);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchAllPizzas());
  }, [dispatch]);

  const getOrderDetails = (pizzaId: string) => {
    const pizza = pizzas.find((p) => p.id === pizzaId);
    if (pizza) {
      return {title: pizza.title, price: pizza.price};
    }
    return {title: 'Unknown pizza', price: 0};
  };

  const mappedOrders = orders.map((order) => {
    const pizzasInOrder = Object.keys(order).filter((pizzaId) => pizzaId !== 'id').map((pizzaId) => {
      const amount = order[pizzaId] as number;
      const {title, price} = getOrderDetails(pizzaId);
      return {title, price, amount};
    });

    const totalSum = pizzasInOrder.reduce((acc, pizza) => {
      return acc + pizza.price * pizza.amount;
    },0);

    return {id: order.id, pizzas: pizzasInOrder, totalSum};
  });

  const completeOneOrder = (orderId: string) => {
    dispatch(deleteOrder(orderId));
  };

  if (isFetchLoading) {
    return (
      <Spinner/>
    );
  }


  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Orders</h3>
      {orders.length === 0 ? (
        <div className="alert alert-info text-center">No orders were made</div>
      ) : (
        <ul className="list-group">
          {mappedOrders.map((order) => (
            <li key={order.id} className="list-group-item py-3 mb-3 border rounded">
              <ul className="list-unstyled mt-3">
                {order.pizzas.map((pizza, index) => (
                  <li key={index} className="d-flex justify-content-between">
                    <span>{pizza.title} x {pizza.amount}</span>
                    <span>{pizza.price * pizza.amount} KGS</span>
                  </li>
                ))}
              </ul>
                <div className="mt-3">
                  <div className="d-flex justify-content-between">
                    <span>Delivery cost:</span>
                    <span>150 KGS</span>
                  </div>
                  <div className="d-flex justify-content-between mt-2 border-top pt-2">
                    <strong>Total:</strong>
                    <strong>{order.totalSum + 150} KGS</strong>
                  </div>
                  <button className="btn btn-success btn-sm mt-3" onClick={() => completeOneOrder(order.id)}>Complete order</button>
                </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;