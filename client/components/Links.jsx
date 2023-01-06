import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loginAction } from '../rootReducer';
import { useDispatch } from 'react-redux';

const Links = ({ loggedIn, userType } = props) => {
  const dispatch = useDispatch();

  return (
    <div id='links-container'>
      {loggedIn ? (
        userType === 'admin' ? (
          <div id='all-links'>
            <Link to='/' className='nav-links'>
              Go to Monitor
            </Link>
            <Link to='/profile' className='nav-links'>
              Profile
            </Link>
            <Link
              to='/login'
              className='nav-links'
              onClick={() => {
                dispatch(loginAction(false));
              }}
            >
              Log Out
            </Link>
          </div>
        ) : (
          <div id='all-links'>
            <Link to='/' className='nav-links'>
              Go to Monitor
            </Link>
            <Link to='/profile' className='nav-links'>
              Create New Student
            </Link>
            <Link
              to='/login'
              className='nav-links'
              onClick={() => {
                dispatch(loginAction(false));
              }}
            >
              Log Out
            </Link>
          </div>
        )
      ) : (
        <div id='login-container'>
          <Link to='/login' className='nav-links'>
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Links;
