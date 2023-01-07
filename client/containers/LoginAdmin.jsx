import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import forgotModal from './forgotModal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginAction, userIDAction, userTypeAction } from '../rootReducer.js';

const LoginAdmin = () => {
  const [loginEmail, setLoginEmail] = useState();
  const [loginPass, setLoginPass] = useState();
  const loggedInStatus = useSelector((state) => state.loggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showForgotModal = () => {
    <forgotModal />;
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setLoginEmail(value);
  };

  const handlePass = (e) => {
    const value = e.target.value;
    setLoginPass(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('auth/admin/login', { email: loginEmail, password: loginPass })
      .then((res) => {
        dispatch(loginAction());
        dispatch(userIDAction(res.data.id));
        dispatch(userTypeAction('admin'))
      })
      .catch((err) => {
        console.log(err);
        showForgotModal();
      });
  };

  return (
    <div>
      <div><button onClick={() => navigate("/")}>Are you a teacher?</button></div>
      <div className='cover'>
        <h2>Log into your Admin account</h2>
        <form onSubmit={handleSubmit} className='form'>
          <label>
            Enter your admin email:
            <input onChange={handleEmail} type='text' placeholder='Email'></input>
          </label>
          <label>
            Enter your password:
            <input
              onChange={handlePass}
              type='text'
              placeholder='Password'
            ></input>
          </label>
          <input type='submit' className='submitBtn' value='Login'></input>
        </form>
        <button className='goToLogin' onClick={showForgotModal}>
          Forgot username or password?
        </button>
        {loggedInStatus && <Navigate to='/dashboard' replace={true} />}
      </div>
    </div>
  );
};

export default LoginAdmin;
