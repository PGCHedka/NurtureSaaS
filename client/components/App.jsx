import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from '../components/Nav.jsx';

const App = () => {
  return (
    <div id='main'>
      <Nav />
      <Routes>
        <Route path='/login' /> {/** login path */}
        <Route path='/' /> {/** main path */}
        {/* <Route path='/profile' /> * profile path -- teacher only */}
      </Routes>
    </div>
  );
};

export default App;
