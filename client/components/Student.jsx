import React, { useEffect, useState } from 'react';
import styles from '../styles/main.scss';
import BarChart from './BarChart.jsx';

const Student = ({ name, time, trigger }) => {
  return (
    <div
      className='student-data'
      onClick={() => {
        trigger(true);
      }}
    >
      <img
        className='teach-img'
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgrx964lIYqeRUiAxvun2VUe0lpUyytPIG7w&usqp=CAU'
        alt='teacher image'
      ></img>
      <div className='student-info'>
        <h2>{name}</h2>
        <p>Average Homework Hour(s): {(time / 60).toFixed(2)} Hours</p>
        <BarChart time={time} />
      </div>
    </div>
  );
};

export default Student;
