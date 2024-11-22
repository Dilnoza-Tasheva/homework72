import ToolBar from './components/ToolBar/ToolBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/HomeClient/Home.tsx';
import HomeAdmin from './containers/HomeAdmin/HomeAdmin.tsx';
import Orders from './containers/Orders/Orders.tsx';
import NewPizza from './containers/NewPizza/NewPizza.tsx';
import EditPizza from './containers/EditPizza/EditPizza.tsx';

const App = () => {

  return (
    <>
      <header>
        <ToolBar/>
      </header>
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/admin" element={<HomeAdmin/>}/>
          <Route path="/admin/pizzas" element={<HomeAdmin/>}/>
          <Route path="/admin/orders" element={<Orders/>}/>
          <Route path="/admin/newPizza" element={<NewPizza/>}/>
          <Route path="/admin/editPizza/:pizzaId" element={<EditPizza/>}/>
          <Route path="*" element={<h3>Not found</h3>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
