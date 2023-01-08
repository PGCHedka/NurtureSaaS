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

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [grade1, setGrade1] = useState(0);
  const [grade2, setGrade2] = useState(0);
  const [grade3, setGrade3] = useState(0);

  const handleFNameChange = (e) => {
    const value = e.target.value;
    setFName(value);
  }
  const handleLNameChange = (e) => {
    const value = e.target.value;
    setLName(value);
  }
  const handleGrade1Change = (e) => {
    const value = parseInt(e.target.value);
    setGrade1(value);
  }

  const handleGrade2Change = (e) => {
    const value = parseInt(e.target.value);
    setGrade2(value);
  }
  const handleGrade3Change = (e) => {
    const value = parseInt(e.target.value);
    setGrade3(value);
  }
  const handleTeacherUpdate = async () => { //updates teachers info in database with axios request
    console.log(data);
    const updateObj = {
      id: data._id,
      firstName: fName,
      lastName: lName,
      grade1: grade1,
      grade2: grade2,
      grade3: grade3,
    };
    console.log('Admin is updating teacher info. updateObj = ', updateObj);
    
    const response = await axios.patch( '/admin/teacher/', {data : updateObj});
    console.log('Admin is updating teacher info. updateObj = ', updateObj);
  }
  const handleStudentUpdate = () => {
    console.log('Teacher is updating their info');
  }

  return trigger ? (
    type === 'teacher' ? ( //modal for updating teachers for each grade
      <div id='popup'>
        <div id='popup-inner'>
          <h2>{name}</h2>
          <button className='close-btn' onClick={() => setTrigger(false)}>
            X
          </button>
          <div className='input-data'>
            <label>First Name:</label>
            <input id='first-name' type='text' placeholder='First Name' onChange={(e) => handleFNameChange(e)} />
            <label>Last Name:</label>
            <input id='last-name' type='text' placeholder='Last Name' onChange={(e) => handleLNameChange(e)} />
            <label>Grades currently teaching: </label>
            <span name='grades-taught' className="centerMe">
              <label>Grade 1:</label>
              <input id='grade-1' type='number' min='0' max='12' onChange={(e) => handleGrade1Change(e)} />
              <label>Grade 2:</label>
              <input id='grade-2' type='number' min='0' max='12' onChange={(e) => handleGrade2Change(e)} />
              <label>Grade 3:</label>
              <input id='grade-3' type='number' min='0' max='12' onChange={(e) => handleGrade3Change(e)} />
            </span>
            <button className='submitBtn' onClick={(e) => handleTeacherUpdate(e)}>Submit</button>
          </div>
        </div>
      </div>
    ) : ( // modal for updating students for each grade
      <div id='popup'>
        <div id='popup-inner'>
          <h2>
            {name}
          </h2>
          <button className='close-btn' onClick={() => setTrigger(false)}>
            X
          </button>
          <div className='input-data'>
            <label>First Name:</label>
            <input id='first-name' type='text' placeholder='First Name' onChange={(e) => handleFNameChange(e)} />
            <label>Last Name:</label>
            <input id='last-name' type='text' placeholder='Last Name' onChange={(e) => handleLNameChange(e)} />
            <label>Grade: </label>
            <input type='number' min='0' max='12' />
            <label>Classes:</label>
            <div id='classes-teach' className="centerMe">
              <select id='s-cls-1'>{classesArray}</select>
              <select id='s-cls-2'>{classesArray}</select>
              <select id='s-cls-3'>{classesArray}</select>
              <select id='s-cls-4'>{classesArray}</select>
              <select id='s-cls-5'>{classesArray}</select>
            </div>
            <button className='submitBtn' onClick={(e) => handleStudentUpdate(e)}>Submit</button>
          </div>
        </div>
      </div>
    )
  ) : (
    <div></div>
  );
};

export default ModalUpdate;
