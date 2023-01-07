import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Student from '../components/Student.jsx'

const TeacherView = () => {
  const userID = useSelector((state) => state.userID);
  const [classArray, setClassArray] = useState();
  const [currClass, setCurrClass] = useState(0)
  const [studentArray, setStudents] = useState()

  const getStudents = async (currClass) => {
    try {
      const response = await axios.get(`teacher/students/${currClass}`, {
        params: { class: currClass },
      });
      console.log('this is student data', response.data)
      const students = response.data.map(student => {
        console.log(student)
        return <Student name={student.first_name} time={student.minutes}/>
      })
      setStudents(students);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getClasses = async (userID) => {
      try {
        const response = await axios.get(`teacher/classes/${userID}`, {
            params: { id: userID },
          }
        )
        const classes = response.data.map((currClass, i) => {
          return (
            <div 
            key={`${currClass.name}${i}`}
            onClick={() => setCurrClass(currClass._id)}>
              {currClass.name}
            </div>
          )
        })
        setClassArray(classes)
      }
      catch(err) {
        console.log(err)
      }
    };
    getClasses(userID);
    getStudents(currClass);
  }, [])

  useEffect(() => {
    getStudents(currClass)
  }, [currClass])

  return (
    <div id='home'>
      <h1>Teacher View</h1>
      <div className='main-sidebar'>{classArray}</div>
      <div className='students'>{studentArray}</div>
    </div>
  );
};

export default TeacherView;
