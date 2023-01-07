import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/main.scss';

const Teacher = ({ name, time }) => {
  return time > 120 ? (
    <div className='teacher-stat-flag'>
      <img
        className='teach-img'
        src='https://cdn.elearningindustry.com/wp-content/uploads/2019/10/professional-development-tools-for-teachers.jpg'
        alt='teacher image'
      ></img>
      <div className='teach-info'>
        <h2>{name}</h2>
        <h2>Average Homework Hours: {(time / 60).toFixed(2)} Hours</h2>
      </div>
    </div>
  ) : (
    <div className='teacher-stat'>
      <img
        className='teach-img'
        src='https://cdn.elearningindustry.com/wp-content/uploads/2019/10/professional-development-tools-for-teachers.jpg'
        alt='teacher image'
      ></img>
      <div className='teach-info'>
        <h2>{name}</h2>
        <h2>Average Homework Hours: {(time / 60).toFixed(2)} Hours</h2>
      </div>
    </div>
  );
};

export default Teacher;
