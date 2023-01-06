import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeed, addFriends } from '../rootReducer.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  return <div id='home'>Hi</div>;
};
