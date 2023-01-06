import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav.jsx';
import Teacher from '../containers/Teacher.jsx';
import Admin from '../containers/Admin.jsx';
import Register from '../containers/Register.jsx';
import LoginAdmin from '../containers/LoginAdmin.jsx';

const App = () => {
  const userType = useSelector((state) => state.userInfo.type);
  let currComponent;
  userType === 'admin'
    ? (currComponent = <Admin />)
    : (currComponent = <Teacher />);
  return (
    <div id='main'>
      <Nav />
      <Routes>
        <Route path='/login' /> {/** login path */}
        <Route path='/dashboard' element={currComponent} /> {/** main path */}
        <Route path='/register' element={<Register/>} />
        <Route path='/' element={<LoginAdmin />}/> {/** login path */}
        {/* <Route path='/profile' /> * profile path -- teacher only */}
      </Routes>
    </div>
  );
};

export default App;
