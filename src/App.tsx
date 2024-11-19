import ToolBar from './components/ToolBar/ToolBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home.tsx';
import HomeAdmin from './containers/HomeAdmin/HomeAdmin.tsx';
import Orders from './containers/Orders/Orders.tsx';

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
          <Route path="*" element={<h3>Not found</h3>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
