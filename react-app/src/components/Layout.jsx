import {Link, Outlet} from 'react-router-dom';
import {useUserContext} from '../hooks/contextHooks';
import {useEffect} from 'react';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      <nav className="w-full">
        <ul className="
            m-0 p-0 list-none
            flex justify-end
            overflow-hidden
            bg-[#333333]
            [&>li>a]:block
            [&>li>a]:text-white
            [&>li>a]:text-center
            [&>li>a]:no-underline
            [&>li>a]:p-4
            [&>li>a:hover]:bg-[#111111]
          ">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
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
      <main className="w-full max-w-6xl mx-auto px-4 py-8 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
