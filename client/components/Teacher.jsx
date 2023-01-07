import React, { useEffect, useState } from 'react';

const Teacher = ({ name, time, trigger }) => {
  return time > 120 ? (
    <div
      className='teacher-stat-flag'
      onClick={() => {
        trigger(true);
      }}
    >
      <img
        className='teach-img'
        src='https://cdn.elearningindustry.com/wp-content/uploads/2019/10/professional-development-tools-for-teachers.jpg'
        alt='teacher image'
      ></img>
      <div className='teach-info'>
        <h2>{name}</h2>
        <h2>Average Homework Hour(s): {(time / 60).toFixed(2)} Hours</h2>
      </div>
    </div>
  ) : (
    <div
      className='teacher-stat'
      onClick={() => {
        trigger(true);
      }}
    >
      <img
        className='teach-img'
        src='https://cdn.elearningindustry.com/wp-content/uploads/2019/10/professional-development-tools-for-teachers.jpg'
        alt='teacher image'
      ></img>
      <div className='teach-info'>
        <h2>{name}</h2>
        <h2>Average Homework Hour(s): {(time / 60).toFixed(2)} Hours</h2>
      </div>
    </div>
  );
};

export default Teacher;
