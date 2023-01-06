import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeed, addFriends } from '../rootReducer.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  return (
    <div id='admin'>
      <h1>Admin View</h1>
      <div></div>
    </div>
  );
};

export default Admin;
