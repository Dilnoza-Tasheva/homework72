import PizzaForm from '../../components/PizzaForm/PizzaForm.tsx';
import { useAppDispatch } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { IPizzaMutation } from '../../types.ds.ts';
import { createPizza } from '../../store/thunks/PizzaThunks/PizzaThunks.ts';


const NewPizza = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addPizza = (newPizza: IPizzaMutation) => {
    dispatch(createPizza(newPizza));
    navigate('/admin');
  };

  return (
    <div>
      <PizzaForm addNewPizza={addPizza}/>
    </div>
  );
};

export default NewPizza;