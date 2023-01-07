import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/popup.scss';

const ModalUpdate = ({ name, classes, data, type, trigger, setTrigger }) => {
  const classesArray = [<option value='None'>None</option>];
  console.log(type, data);
  //userdata should include display name
  for (let key in classes) {
    classesArray.push(<option value={key}>{key}</option>);
  }
  return trigger ? (
    type === 'teacher' ? (
      <div id='popup'>
        <div id='popup-inner'>
          <h2>Teacher: {name}</h2>
          <button className='close-btn' onClick={() => setTrigger(false)}>
            X
          </button>
          <div className='input-data'>
            <label>First Name:</label>
            <input id='first-name' type='text' placeholder='First Name' />
            <div>
              <label>Last Name:</label>
              <input id='last-name' type='text' placeholder='Last Name' />
            </div>
            <div>
              <label>Grades Teaching: </label>
              <span name='grades-taught'>
                <input id='grade-1' type='number' min='0' max='12' />
                <input id='grade-2' type='number' min='0' max='12' />
                <input id='grade-3' type='number' min='0' max='12' />
              </span>
            </div>
            <label>Teaching Classes:</label>
            <div id='classes-teach'>
              <select id='t-cls-1'>{classesArray}</select>
              <select id='t-cls-2'>{classesArray}</select>
              <select id='t-cls-3'>{classesArray}</select>
              <select id='t-cls-4'>{classesArray}</select>
              <select id='t-cls-5'>{classesArray}</select>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div id='popup'>
        <div id='popup-inner'>
          <h2>
            {name} - Grade: {data.grade}
          </h2>
          <button className='close-btn' onClick={() => setTrigger(false)}>
            X
          </button>
          <div className='input-data'>
            <label>First Name:</label>
            <input id='first-name' type='text' placeholder='First Name' />
            <div>
              <label>Last Name:</label>
              <input id='last-name' type='text' placeholder='Last Name' />
            </div>
            <label>Grade: </label>
            <input type='number' min='0' max='12' />
            <div>
              <label>Classes:</label>
              <div id='classes-teach'>
                <select id='s-cls-1'>{classesArray}</select>
                <select id='s-cls-2'>{classesArray}</select>
                <select id='s-cls-3'>{classesArray}</select>
                <select id='s-cls-4'>{classesArray}</select>
                <select id='s-cls-5'>{classesArray}</select>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <div></div>
  );
};

export default ModalUpdate;
