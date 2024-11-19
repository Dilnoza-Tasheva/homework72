import Pizzas from '../../components/Pizzas/Pizzas.tsx';
import { NavLink } from 'react-router-dom';


const HomeAdmin = () => {
  return (
    <div>
      <div>
        <p>Admin Home page</p>
        <NavLink to="/admin/newPizza" className="btn btn-primary my-3">Add New Pizza</NavLink>
      </div>
      <Pizzas/>
    </div>
  );
};

export default HomeAdmin;