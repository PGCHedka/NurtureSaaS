
import React from "react";
import {Routes, Route} from 'react-router-dom';
//import styles from

const Login = () => {

    return (
        <div className="cover">
            <h1>Login into your Teacher account</h1>
            <input type="text" placeholder="username"></input>
            <input type="text" placehlder="password"></input>
        </div>
    )

};

export default Login;