import axios from "axios";
import React, {useCallback, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/_layout.scss';

const Register = () => {

    const navigate = useNavigate();
    const handleGoToAdminLogin = useCallback(() => navigate('/loginadmin', {replace: true}));
    const handleGoToTeacherLogin = useCallback(() => navigate('/', {replace: true}));
    let [role, setRole] = useState('admin');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(role);
        const email = document.getElementById('email').value; 
        const password = document.getElementById('password').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        let grade1 = '', grade2 = '', grade3 = '';
        if(role === 'teacher'){
            grade1 = document.getElementById('grade1').value;
            grade2 = document.getElementById('grade2').value;
            grade3 = document.getElementById('grade3').value;
        }
        const res = await axios.post(`/auth/${role}/signup`, {
            email: email, 
            password: password, 
            firstName: firstName, 
            lastName: lastName,
            grade1: grade1, 
            grade2: grade2, 
            grade3: grade3
        });
        console.log('here');
        console.log(res);
    };

    return (
        <div className="cover">
            <h1>Register here!</h1>
            <form className="form">
                <label>
                    Email:
                    <input id="email" type="text" placeholder="Email" required />
                </label>
                <label>
                    Role: {/*We should make this a dropdown*/}
                    <select required onChange={e => setRole(e.target.value)} id="role" type="dropdown" placeholder="Role">
                        <option value="admin">Admin</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </label>
                <label>
                    First name:
                    <input required id="firstName" type="text" placeholder="First Name" />
                </label>
                <label>
                    Last name:
                    <input required id="lastName" type="text" placeholder="Last Name" />
                </label>
                <label>
                    Password:
                    <input required id="password" type="text" placeholder="Password" />
                </label>
                { 
                    role === 'teacher' ? 
                    <form className="teacherForm"> 
                        <p>Please enter the grades you teach. If you do not teach three grades, please leave the value as zero.</p>
                        <label>
                            Grade 1 (1-12):
                            <input id="grade1" type="number" min="0" max="12" placeholder="0" />
                        </label>
                        <label>
                            Grade 2 (1-12):
                            <input id="grade2" type="number" min="0" max="12"  placeholder="0" />
                        </label>
                        <label>
                            Grade 3 (1-12):
                            <input id="grade3" type="number" min="0" max="12"  placeholder="0" />
                        </label>
                    </form> : <></>
                }
            </form>
            <button type="submit" className="submitBtn" onClick={handleSubmit}>Submit</button>
            <a className="goToLogin" onClick={handleGoToTeacherLogin}>Already signed up as teacher?</a>
            <a className="goToLogin" onClick={handleGoToAdminLogin}>Already signed up as admin user?</a>
        </div>
    );

};

export default Register;