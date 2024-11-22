import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchPizzasLoading, selectPizzas } from '../../store/slices/PizzaSlice/PizzaSlice.ts';
import { useCallback, useEffect, useState } from 'react';
import { fetchAllPizzas } from '../../store/thunks/PizzaThunks/PizzaThunks.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { addPizza, deletePizzaFromCart, selectCartPizzas } from '../../store/slices/CartSlice/CartSlice.ts';
import { IPizza } from '../../types.ds.ts';
import Modal from '../../components/UI/Modal/Modal.tsx';
import { confirmPizzaOrder } from '../../store/thunks/CartThunk/CartThunks.ts';


const Home = () => {
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector(selectPizzas);
  const isFetchLoading = useAppSelector(selectFetchPizzasLoading);
  const cartPizzas = useAppSelector(selectCartPizzas);
  const [modal, setModal] = useState(false);

  const fetchPizzas = useCallback(async() => {
    await dispatch(fetchAllPizzas());
  },[dispatch]);

  useEffect(() => {
    void fetchPizzas();
  },[fetchPizzas]);

  const addPizzaToCart = (pizza: IPizza) => {
    dispatch(addPizza(pizza));
  };

  const totalAmountOfPizzas = cartPizzas.reduce((acc, cartItem) => {
    return acc + cartItem.pizza.price * cartItem.amount;
  }, 0);

  const showModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const deletePizzaFromOrder = (pizzaId: string) => {
    dispatch(deletePizzaFromCart(pizzaId));
  };

  const confirmCart = () => {
    dispatch(confirmPizzaOrder({cartPizzas}));
    setModal(false);
  };


  return (
    <div>

      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h3>Our range of pizzas: </h3>
        </div>
        {isFetchLoading ? (
          <Spinner/>
        ) : (
          <ul className="list-group">
            {pizzas.map((pizza) => (
              <li
                key={pizza.id}
                className="list-group-item shadow-sm rounded my-3 p-3"
                style={{ backgroundColor: '#f9f9f9' }}
                onClick={() => addPizzaToCart(pizza)}
              >
                <div className="row align-items-center">
                  <div className="col-md-2 text-center">
                    <img
                      src={pizza.imageUrl}
                      alt={pizza.title}
                      width="50"
                      height="50"
                      className="rounded-circle me-3"
                    />
                  </div>

                  <div className="col-md-7">
                    <h5 className="mb-1 text-primary">{pizza.title}</h5>
                    {pizza.price && (<p className="mb-0 text-secondary">Price: {pizza.price} KGS</p>)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cartPizzas.length > 0 && (
        <div className=" bg-white border-top p-3 shadow rounded">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Your total: <span>{totalAmountOfPizzas}</span> KGS</h5>
            </div>
            <button className="btn btn-outline-success" onClick={showModal}>Checkout</button>
          </div>
        </div>
      )}

      <Modal show={modal} title="Order preview" closeModal={closeModal} defaultModalButton={false}>
        <div>
          <h5>Your pizzas:</h5>
          <ul className="list-group mb-3">
            {cartPizzas.map((cartItem) => (
              <li key={cartItem.pizza.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <span>{cartItem.pizza.title} x {cartItem.amount}</span>
                  <span>{cartItem.pizza.price * cartItem.amount} KGS</span>
                  <button className="btn btn-danger btn-sm" onClick={() => deletePizzaFromOrder(cartItem.pizza.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between">
            <strong>Delivery: 150 KGS</strong>
          </div>
          <div className="d-flex justify-content-between mt-2 border-top pt-2">
            <strong>Total: {totalAmountOfPizzas + 150}</strong>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-4">
          <button onClick={closeModal} className="btn btn-secondary me-2">Cancel</button>
          <button className="btn btn-success" onClick={confirmCart}>Confirm</button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;