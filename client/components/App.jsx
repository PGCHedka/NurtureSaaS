import React from 'react';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/login' /> {/** login path */}
      <Route path='/' /> {/** main path */}
      <Route path='/profile' /> {/** profile path -- teacher only */}
    </Routes>
  );
};

export default App;
