import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function NavBar() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  console.log("user : ",user);

  // Determine if the user is on the Signin or Signup page
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <div className='z-10 absolute w-full p-4 flex items-center justify-between'>
      <Link to='/'>
        <img
          className='relative left-5 w-24 z-auto'
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
        />
      </Link>
      {user && user.email ? (
        <div>
          <button onClick={handleLogout} className='capitalize bg-red-600 px-6 py-2 rounded cursor-pointer'>
            Log out
          </button>
          <Link to='/profile'>
            <button className='m-2 border rounded-lg p-1.5 capitalize'>Profile</button>
          </Link>
        </div>
      ) : null}
      {!user || !user.email ? (
        <div>
          {!isAuthPage && (
            <Link to='/signup'>
              <button className='capitalize bg-red-600 px-6 py-2 rounded cursor-pointer'>Join now</button>
            </Link>
          )}
          {!isAuthPage && (
            <Link to='/signin'>
              <button className='m-2 border rounded-lg p-1.5 capitalize'>Sign in</button>
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default NavBar;
