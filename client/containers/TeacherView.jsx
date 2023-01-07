import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Student from '../components/Student.jsx'

const TeacherView = () => {
  const userID = useSelector((state) => state.userID);
  const [classArray, setClassArray] = useState();
  const [currClass, setCurrClass] = useState(classes[0] ? classes[0] : null)
  const [studentArray, setStudents] = useState()

  const getStudents = async (currClass) => {
    try {
      const response = await axios.get('teachers/students', {
        params: { class: currClass },
      });
      const students = response.data.map(student => {
        return <Student />
      })
      setStudents(students);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getClasses = async (userID) => {
      try {
        const response = await axios.get('teachers/classes', {
            params: { id: userID },
          }
        )
        const classes = response.data.map((className, i) => {
          return (
            <div 
            key={`${className.name}${i}`}
            onClick={() => setCurrClass(className.id)}>
              {className.name}
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
      <div class='main-sidebar'>{classArray}</div>
      <div class='students'>{studentArray}</div>
    </div>
  );
};

export default TeacherView;
