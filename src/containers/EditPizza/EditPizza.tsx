
import PizzaForm from '../../components/PizzaForm/PizzaForm.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchPizzasLoading, selectOnePizza } from '../../store/slices/PizzaSlice/PizzaSlice.ts';
import { useCallback, useEffect } from 'react';
import { editPizza, getOnePizzaById } from '../../store/thunks/PizzaThunks/PizzaThunks.ts';
import { IPizzaMutation } from '../../types.ds.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';

const EditPizza = () => {
  const {pizzaId} = useParams<{pizzaId: string}>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const pizza = useAppSelector(selectOnePizza);
  const isLoading = useAppSelector(selectFetchPizzasLoading);

  const getPizzaById = useCallback(async() => {
    if (pizzaId) {
      await dispatch(getOnePizzaById(pizzaId));
    }
  }, [dispatch, pizzaId]);

  useEffect(() => {
    void getPizzaById();
  }, [getPizzaById]);

  const updatePizza = async(updatedPizza: IPizzaMutation) => {
    if (pizzaId) {
      await dispatch(editPizza({pizzaId, pizza: updatedPizza}));
      navigate('/admin');
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner/>
      ) : (
        <>
          {pizza ? (
            <PizzaForm
              addNewPizza={updatePizza}
              existingPizza={pizza}
              isEdit
            />
          ) : (
            navigate('/admin')
          )}
        </>
      )}

    </div>
  );
};

export default EditPizza;