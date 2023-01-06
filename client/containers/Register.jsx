import React from "react";
import { Routes, Route } from 'react-router-dom';

const Register = () => {

    return (
        <div className="cover">
            <h1>Register here!</h1>
            <form>
                <label>
                     Enter email
                    <input type="text" placeholder="Email"></input>
                </label>
                <label>
                     Enter your role (Teacher/Admin)
                    <input type="text" placeholder="Role"></input>
                </label>
                <label>
                     Enter your full name (omit middle name)
                    <input type="text" placeholder="Name"></input>
                </label>
                <input type="submit" value="Register"></input>
            </form>
        </div>
    );

};

export default Register;