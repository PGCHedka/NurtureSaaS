import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/popup.scss';

const ModalAdd = ({ name, classes, type, trigger, setTrigger }) => {
  console.log(classes);
  const addStudent = async () => {
    const student = {};
    student.firstName = document.getElementById('first-name').value;
    student.lastName = document.getElementById('last-name').value;
    student.grade = document.getElementById('grade').value;
    student.classes = [];
    const class1 = classes[document.getElementById('s-cls-1').value];
    const class2 = classes[document.getElementById('s-cls-2').value];
    const class3 = classes[document.getElementById('s-cls-3').value];
    const class4 = classes[document.getElementById('s-cls-4').value];
    const class5 = classes[document.getElementById('s-cls-5').value];
    if(class1) student.classes.push(class1);
    if(class2) student.classes.push(class1);
    if(class3) student.classes.push(class1);
    if(class4) student.classes.push(class1);
    if(class5) student.classes.push(class1);
    const response = await axios.post(`admin/student`, {
      ...student
    });
    () => setTrigger(false);
  }

  const addAssign = async() => {
    const time = document.getElementById('time').value;
  }

  const inviteTeacher = async() => {
    const email = document.getElementById('email').value;
    console.log(email);
    const response = await axios.post(`admin/teacher/invite`, {
      email: email
    });
    () => setTrigger(false);
  }

  const classesArray = [<option value='None'>None</option>];
  for (let key in classes) {
    classesArray.push(<option key={`${key}_${classes[key]}`} value={key}>{key}</option>);
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
            <label>Input Teacher Email: </label>
            <input id="email" type ="email" />
            <button onClick={inviteTeacher} className='submitBtn'>Submit</button>
          </div>
        </div>
      </div>
    ) : type === 'student' ? (
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
            <input id='grade' type='number' min='0' max='12' />
            <label>Classes:</label>
            <div id='classes-teach' className='centerMe'>
              <select id='s-cls-1'>{classesArray}</select>
              <select id='s-cls-2'>{classesArray}</select>
              <select id='s-cls-3'>{classesArray}</select>
              <select id='s-cls-4'>{classesArray}</select>
              <select id='s-cls-5'>{classesArray}</select>
            </div>
            <button onClick={addStudent} className='submitBtn'>Submit</button>
          </div>
        </div>
      </div>
    ) : (
    <div id='popup'>
        <div id='popup-inner'>
          <h2>{name}</h2>
          <h3>Class: {classes.name}</h3>
          <button className='close-btn' onClick={() => setTrigger(false)}>
            X
          </button>
          <div className='input-data'>
            <label>Time:</label>
            <input id='time' type='number' placeholder='0-60' />
            <button onClick={addAssign} className='submitBtn'>Submit</button>
          </div>
        </div>
      </div>
    )
  ) : (
    <div></div>
  );
};

export default ModalAdd;
