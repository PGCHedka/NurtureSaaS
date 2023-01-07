import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import forgotModal from "./forgotModal.jsx";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginAction, userIDAction, userTypeAction } from '../rootReducer.js';


const LoginTeacher = () => {
    const [loginEmail, setLoginEmail] = useState();
    const [loginPass, setLoginPass] = useState();
    const loggedInStatus = useSelector((state) => state.loggedIn)
    const userType = useSelector((state) => state.userInfo.type)
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                dispatch(userTypeAction('teacher'))
            })
            .catch(err =>  {
                console.log(err);
                alert('Wrong email or password.');
            })
        setLoginPass('');
        setLoginEmail('');
    }

    return (
        <div>
            <div><button onClick={() => navigate("/loginadmin")}>Are you an admin?</button></div>
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
                {loggedInStatus && (
                    <Navigate to= "/dashboard" replace = {true}/>
                )}
            </div>
        </div>
    )

};

export default LoginTeacher;