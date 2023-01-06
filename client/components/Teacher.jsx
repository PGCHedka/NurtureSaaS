import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeed, addFriends } from '../rootReducer.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/main.scss';

const Teacher = ({ name, time }) => {
  return time > 120 ? (
    <div className='teacher-stat-flag'>
      <h2>FLAG AND BAN: {name}</h2>
      <img
        className='teach-img'
        src='https://cdn.elearningindustry.com/wp-content/uploads/2019/10/professional-development-tools-for-teachers.jpg'
        alt='teacher image'
      ></img>
      <h2>Minutes of Assignments Assigned Today: {time}</h2>
    </div>
  ) : (
    <div className='teacher-stat'>
      <h2>{name}</h2>
      <img
        className='teach-img'
        src='https://cdn.elearningindustry.com/wp-content/uploads/2019/10/professional-development-tools-for-teachers.jpg'
        alt='teacher image'
      ></img>
      <h2>avg hours of hwk per day</h2>
    </div>
  );
};

export default Teacher;
