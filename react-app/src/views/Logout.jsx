import React from 'react';
import {useUserContext} from '../hooks/contextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }}
      >
        Log out
      </button>
    </>
  );
};

export default Logout;
