import axios from "axios";
import React, {useCallback, useState, useEffect} from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import DropDown from "../components/Dropdown.jsx";

const Register = () => {

    const navigate = useNavigate();
    const handleGoToAdminLogin = useCallback(() => navigate('/admin_login', {replace: true}));
    const handleGoToTeacherLogin = useCallback(() => navigate('/teacher_login', {replace: true}));
    let [role, setRole] = useState('');

    const gradeOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    
    const handleSubmit = useCallback(async () => {
        const email = document.getElementById('email').value; 
        const password = document.getElementById('password').value;
        const res = await axios.post(`auth/${role}/signup`, {
            email: email, 
            password: password
        });
        console.log(res);
    });

    return (
        <div className="cover">
            <h1>Register here!</h1>
            <form>
                <label>
                    Email:
                    <input id="email" type="text" placeholder="Email"></input>
                </label>
                <label>
                    Role: (Teacher/Admin) {/*We should make this a dropdown*/}
                    
                </label>
                <label>
                    First name:
                    <input id="firstName" type="text" placeholder="Name"></input>
                </label>
                <label>
                    Last name:
                    <input id="lastName" type="text" placeholder="Name"></input>
                </label>
                { 
                    role = 'Teacher' ? 
                    <div> 
                        <label>
                            Grade 1:
                            <input id="grade1" type="text" placeholder="Name"></input>
                        </label>
                        <label>
                            Grade 2:
                            <input id="grade2" type="text" placeholder="Name"></input>
                        </label>
                        <label>
                            Grade 3:
                            <input id="grade3" type="text" placeholder="Name"></input>
                        </label>
                        <input type="submit" value="Register"></input>
                    </div> : <></>
                }
                
            </form>
            <button className="goToLogin" onClick={handleGoToTeacherLogin}>Already signed up as teacher?</button>
            <button className="goToLogin" onClick={handleGoToAdminLogin}>Already signed up as admin user?</button>
        </div>
    );

};

export default Register;