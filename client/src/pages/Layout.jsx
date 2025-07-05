import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Register</Link>
          </li>
          <li>
            <Link to="/dashboard">dashboard</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/dash2">dashboard2</Link>
          </li>
          <li>
            <Link to="/logout">logout</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;