import {Link, Outlet} from 'react-router-dom';
import {useUserContext} from '../hooks/contextHooks';
import { useEffect } from 'react';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin()
  }, [])


  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
          {user && (
            <li>
              <Link to="/logout">Log out</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/login">Log in</Link>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
