import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/popup.scss';

const ModalAdd = ({ name, classes, type, trigger, setTrigger }) => {
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
            <input id='first-name' type='text' placeholder='First Name' />
            <label>Last Name:</label>
            <input id='last-name' type='text' placeholder='Last Name' />
            <label>Grade: </label>
            <input type='number' min='0' max='12' />
            <label>Classes:</label>
            <div id='classes-teach' className='centerMe'>
              <select id='t-cls-1'>{classesArray}</select>
              <select id='t-cls-2'>{classesArray}</select>
              <select id='t-cls-3'>{classesArray}</select>
              <select id='t-cls-4'>{classesArray}</select>
              <select id='t-cls-5'>{classesArray}</select>
            </div>
            <button className='submitBtn'>Submit</button>
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
