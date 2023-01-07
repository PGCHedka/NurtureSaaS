import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/popup.scss';

const ModalAdd = ({ name, type, trigger, setTrigger }) => {
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
            <input type='text' placeholder='Student Name' />
            <input type='number' placeholder='Grade' min='0' max='12' />
            <input type='number' placeholder='Grade' min='0' max='12' />
            <input type='number' placeholder='Grade' min='0' max='12' />
            <input type='text' placeholder='Class1' />
            <input type='text' placeholder='Class2' />
            <input type='text' placeholder='Class3' />
            <input type='text' placeholder='Class3' />
            <input type='text' placeholder='Class3' />
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

export default ModalAdd;
