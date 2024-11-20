import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchPizzasLoading, selectPizzas } from '../../store/slices/PizzaSlice.ts';
import { useCallback, useEffect } from 'react';
import { fetchAllPizzas } from '../../store/thunks/PizzaThunks.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { addPizza, selectCartPizzas } from '../../store/slices/CartSlice.ts';
import { IPizza } from '../../types.ds.ts';


const Home = () => {
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector(selectPizzas);
  const isFetchLoading = useAppSelector(selectFetchPizzasLoading);
  const cartPizzas = useAppSelector(selectCartPizzas);

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
        <div className=" bg-success-subtle border-top p-3 shadow rounded">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Your total: <span>{totalAmountOfPizzas}</span> KGS</h5>
            </div>
            <button className="btn btn-success">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;