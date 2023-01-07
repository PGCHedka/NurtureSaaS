import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/popup.scss';

const ModalAdd = ({ name, classes, type, trigger, setTrigger }) => {
  const addTeacher = () => {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('lastName').value;
    const grade1 = document.getElementById('grade1').value;
    const grade2 = document.getElementById('grade2').value;
    const grade3 = document.getElementById('grade3').value;
    axios.post('teac')
  }

  const classesArray = [<option value='None'>None</option>];
  for (let key in classes) {
    classesArray.push(<option value={key}>{key}</option>);
  }
  const addData = (person) => {};
  return trigger ? (
    type === 'teacher' ? (
      <div id='popup'>
        <div id='popup-inner'>
          <h2>{name}</h2>
          <button className='close-btn' onClick={() => setTrigger(false)}>
            X
          </button>
          <div className='input-data'>
            <label>First Name:</label>
            <input required id='first-name' type='text' placeholder='First Name' />
            <label>Last Name:</label>
            <input required id='last-name' type='text' placeholder='Last Name' />
            <label>Grade: </label>
            <input id='grade1' type='number' min='0' max='12' placeholder='0'/>
            <input id='grade2' type='number' min='0' max='12' placeholder='0'/>
            <input id='grade3' type='number' min='0' max='12' placeholder='0'/>
            <button onClick={addTeacher} className='submitBtn'>Submit</button>
            </div>
          </div>
        </div>
    ) : (
      <div id='popup'>
        <div id='popup-inner'>
          <h2>{name}</h2>
          <button className='close-btn' onClick={() => setTrigger(false)}>
            X
          </button>
          <div className='input-data'>
            <label>First Name:</label>
            <input id='first-name' type='text' placeholder='First Name' />
            <label>Last Name:</label>
            <input id='last-name' type='text' placeholder='Last Name' />
            <label>Grade: </label>
            <input type='number' min='0' max='12' />
            <label>Classes:</label>
            <div id='classes-teach'>
              <select id='s-cls-1'>{classesArray}</select>
              <select id='s-cls-2'>{classesArray}</select>
              <select id='s-cls-3'>{classesArray}</select>
              <select id='s-cls-4'>{classesArray}</select>
              <select id='s-cls-5'>{classesArray}</select>
            </div>
            <button className='submitBtn'>Submit</button>
          </div>
        </div>
      </div>
    )
  ) : (
    <div></div>
  );
};

export default ModalAdd;
