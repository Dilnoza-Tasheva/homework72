import { NavLink, useLocation } from 'react-router-dom';


const ToolBar = () => {
  const currentPage = useLocation();

  const isAdminPage = currentPage.pathname.startsWith('/admin');

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary-subtle">
        <div className="container">
          <NavLink to="/" className="text-decoration-none"><span className="navbar-brand mb-0 text-white fs-2 text-muted">Grab a Pizza</span></NavLink>

          <div className="ms-auto">
            <ul className="navbar-nav">
              {isAdminPage && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/pizzas">Pizzas</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/orders">Orders</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};

export default ToolBar;