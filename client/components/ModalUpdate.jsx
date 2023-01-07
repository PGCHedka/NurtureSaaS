import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/popup.scss';

const ModalUpdate = ({ name, data, type, trigger, setTrigger }) => {
  const classesArray = [];
  console.log(data);
  //userdata should include display name
  console.log(type);
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
            <label for='first-Name'>First Name:</label>
            <input
              id='first-name'
              type='text'
              placeholder='Teacher First Name'
            />
            <div>
              <label for='last-name'>Last Name:</label>
              <input
                id='last-name'
                type='text'
                placeholder='Teacher First Name'
              />
            </div>
            <div>
              <label for='grades-taught'>Grades Teaching: </label>
              <span name='grades-taught'>
                <input id='grade-1' type='number' min='0' max='12' />
                <input id='grade-2' type='number' min='0' max='12' />
                <input id='grade-3' type='number' min='0' max='12' />
              </span>
            </div>
            <label for='classes-teach'>Teaching Classes:</label>
            <div name='classes-teach'>
              <select id='t-cls-1' type='text' placeholder='Class1' />
              <input id='t-cls-2' type='text' placeholder='Class2' />
              <input id='t-cls-3' type='text' placeholder='Class3' />
              <input id='t-cls-4' type='text' placeholder='Class3' />
              <input id='t-cls-5' type='text' placeholder='Class3' />
            </div>
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
            <input type='text' placeholder='Student Name' />
            <input type='number' placeholder='Grade' min='0' max='12' />
            <input type='text' placeholder='Class1' />
            <input type='text' placeholder='Class2' />
            <input type='text' placeholder='Class3' />
          </div>
        </div>
      </div>
    )
  ) : (
    <div></div>
  );
};

export default ModalUpdate;
