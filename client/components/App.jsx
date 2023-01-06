import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../containers/Register.jsx';

const App = () => {
  return (
    <div>
      <Register/>
    </div>

    // <Routes>
    //   {/* <Register/> */}
    //   <Route path='/login' /> {/** login path */}
    //   <Route path='/' /> {/** main path */}
    //   <Route path='/profile' /> {/** profile path -- teacher only */}
    // </Routes>
  );
};

export default App;
