import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Register from '../containers/Register.jsx';
import LoginAdmin from '../containers/LoginAdmin.jsx';

const App = () => {
  return (
    <div id='main'>
      <Nav />
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/login' element={<LoginAdmin />}/> {/** login path */}
        <Route path='/dashboard' /> {/** main path */}
        {/* <Route path='/profile' /> * profile path -- teacher only */}
      </Routes>
    </div>
  );
};

export default App;
