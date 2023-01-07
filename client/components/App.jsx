import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav.jsx';
import TeacherView from '../containers/TeacherView.jsx';
import Admin from '../containers/AdminView.jsx';
import Register from '../containers/Register.jsx';
import LoginAdmin from '../containers/LoginAdmin.jsx';
import LoginTeacher from '../containers/LoginTeacher.jsx';

const App = () => {
  const userType = useSelector((state) => state.userInfo.type);
  const logStatus = useSelector((state) => state.loggedIn);
  let currComponent;
  userType === 'admin'
    ? (currComponent = <Admin />)
    : (currComponent = <TeacherView />);
  return (
    <div id='main'>
      <Nav page={logStatus} />
      <Routes>
        {/* <Route path='/login' /> * login path */}
<<<<<<< HEAD
        <Route path='/dashboard' element={currComponent} /> {/** main path */}
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<LoginTeacher />} /> {/** login path */}
        <Route path='/login' element={<LoginAdmin />} /> {/** login path */}
=======
        <Route path='/' element={<LoginTeacher />} /> {/* login path*/}
        <Route path='/dashboard' element={currComponent} /> {/* main path */}
        <Route path='/register' element={<Register />} />
        <Route path='/loginadmin' element={<LoginAdmin />} /> {/* login path */}
>>>>>>> dev
      </Routes>
    </div>
  );
};
export default App;
