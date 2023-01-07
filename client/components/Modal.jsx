import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/popup.scss';

const Modal = ({ action, trigger, setTrigger }) => {
  //userdata should include display name
  let actionType;
  action.includes('Student')
    ? (actionType = 'student')
    : (actionType = 'other');
  return trigger ? (
    actionType === 'student' ? (
      <div id='popup'>
        <div id='popup-inner'>
          <h2>{action}</h2>
          <button className='close-btn' onClick={() => setTrigger(false)}>
            X
          </button>
        </div>
      </div>
    ) : (
      <div id='popup'>
        <div id='popup-inner'>
          <h2>{action}</h2>
          <button className='close-btn' onClick={() => setTrigger(false)}>
            X
          </button>
        </div>
      </div>
    )
  ) : (
    <div></div>
  );
};

export default Modal;
