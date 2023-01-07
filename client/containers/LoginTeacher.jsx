import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import forgotModal from "./forgotModal.jsx";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { loginAction, userIDAction } from '../rootReducer.js';


const LoginTeacher = () => {
    const [loginEmail, setLoginEmail] = useState();
    const [loginPass, setLoginPass] = useState();
    const loggedInStatus = useSelector((state) => state.loggedIn)
    const dispatch = useDispatch();


    const showForgotModal = () => {
        <forgotModal />
    }

    const handleEmail = (e) => {
        const value = e.target.value;
        setLoginEmail(value)
    }

    const handlePass = (e) => {
        const value = e.target.value;
        setLoginPass(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('auth/teacher/login', { email: loginEmail, password: loginPass })
            .then(res => { 
                dispatch(loginAction())
                dispatch(userIDAction(res.data.id))
            })
            .catch(err =>  {
                console.log(err);
                showForgotModal();
            })
        setLoginPass('');
        setLoginEmail('');
    }

    return (
        <div className="cover">
            <h2>Log into your teacher account</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your teacher email
                    <input onChange={handleEmail} type="text" placeholder="Email"></input>
                </label>
                <label>
                    Enter your password
                    <input onChange={handlePass} type="text" placeholder="Password"></input>
                </label>
                <input type="submit" value="Login"></input>
            </form>
            <button className="forgot" onClick={showForgotModal}>Forgot username or password?</button>
            {loggedInStatus && (
                <Navigate to= "/dashboard" replace = {true}/>
            )}
        </div>
    )

};

export default LoginTeacher;