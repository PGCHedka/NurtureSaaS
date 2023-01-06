import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav.jsx';
import TeacherView from '../containers/TeacherView.jsx';
import Admin from '../containers/AdminView.jsx';
import Register from '../containers/Register.jsx';
import LoginAdmin from '../containers/LoginAdmin.jsx';

const App = () => {
  const userType = useSelector((state) => state.userInfo.type);
  let currComponent;
  userType === 'admin'
    ? (currComponent = <Admin />)
    : (currComponent = <TeacherView />);
  return (
    <div id='main'>
      <Nav />
      <Routes>
        <Route path='/login' /> {/** login path */}
        <Route path='/' element={currComponent} /> {/** main path */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LoginAdmin />} /> {/** login path */}
        {/* <Route path='/profile' /> * profile path -- teacher only */}
      </Routes>
    </div>
  );
};

export default App;
