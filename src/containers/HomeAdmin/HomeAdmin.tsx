
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchPizzasLoading, selectPizzas } from '../../store/slices/PizzaSlice/PizzaSlice.ts';
import { useCallback, useEffect } from 'react';
import { deleteOnePizza, fetchAllPizzas } from '../../store/thunks/PizzaThunks/PizzaThunks.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';


const HomeAdmin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pizzas = useAppSelector(selectPizzas);
  const isFetchLoading = useAppSelector(selectFetchPizzasLoading);

  const fetchPizzas = useCallback(async() => {
    await dispatch(fetchAllPizzas());
  },[dispatch]);

  useEffect(() => {
    void fetchPizzas();
  },[fetchPizzas]);


  const deletePizza = async(pizzaId: string) => {
    await dispatch(deleteOnePizza(pizzaId));
    dispatch(fetchAllPizzas());
  };

  const editPizza = (pizzaId: string) => {
      navigate(`/admin/editPizza/${pizzaId}`);

  };

  return (
    <div>
      <div>
        <h6>Grab a pizza admin page</h6>
        <hr/>
      </div>

      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h3>Our range of pizzas: </h3>
          <NavLink to="/admin/newPizza" className="btn btn-success my-3">Add New Pizza</NavLink>
        </div>
        {isFetchLoading ? (
          <Spinner/>
        ) : (
          <ul className="list-group">
            {pizzas.map((pizza) => (
              <li
                key={pizza.id}
                className="list-group-item shadow-sm rounded my-3 p-3"
                style={{ backgroundColor: '#f9f9f9' }}>
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

                  <div className="col-md-3 text-end">
                    <button className="btn btn-outline-success btn-sm me-2" onClick={() => editPizza(pizza.id)}>Edit</button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => deletePizza(pizza.id)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomeAdmin;