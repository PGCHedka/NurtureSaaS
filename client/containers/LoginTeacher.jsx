import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import forgotModal from "./forgotModal.jsx";
import axios from 'axios';

const LoginTeacher = () => {
    const [loginEmail, setLoginEmail] = useState();
    const [loginPass, setLoginPass] = useState();


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
            .then(res => console.log('request successful'))
            .catch(err => console.log(err))
        setLoginPass('')
        setLoginEmail('')
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
        </div>
    )

};

export default LoginTeacher;