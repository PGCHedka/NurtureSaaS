import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeed, addFriends } from '../rootReducer.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherView = () => {
  return (
    <div id='home'>
      <h1>Teacher View</h1>
      <div class='main-sidebar'></div>
    </div>
  );
};

export default TeacherView;
