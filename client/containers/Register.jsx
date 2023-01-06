import React, {useCallback} from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const handleGoToAdminLogin = useCallback(() => navigate('/admin_login', {replace: true}));
    const handleGoToTeacherLogin = useCallback(() => navigate('/teacher_login', {replace: true}));

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
            <button className="goToLogin" onClick={handleGoToTeacherLogin}>Already signed up as teacher?</button>
            <button className="goToLogin" onClick={handleGoToAdminLogin}>Already signed up as admin user?</button>
        </div>
    );

};

export default Register;