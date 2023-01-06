import React from "react";
import {Routes, Route} from 'react-router-dom';
import forgotModal from "./forgotModal.jsx";

const LoginTeacher = () => {

    const showForgotModal = () => {
        <forgotModal/>
    }

    return (
        <div className="cover">
            <h2>Log into your teacher account</h2>
            <form>
                <label>
                     Enter your teacher email
                    <input type="text" placeholder="Email"></input>
                </label>
                <label>
                     Enter your password
                    <input type="text" placeholder="Password"></input>
                </label>
                <input type="submit" value="Login"></input>
            </form>
            <button className="forgot" onClick={showForgotModal}>Forgot username or password?</button>
        </div>
    )

};

export default LoginTeacher;