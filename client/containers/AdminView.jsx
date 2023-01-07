import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeed, addFriends } from '../rootReducer.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Teacher from '../components/Teacher.jsx';

const Admin = () => {
  const gradeArray = [];
  const teacherArray = [];
  const studentArray = [];
  const [currentGrade, setGrade] = useState('0');
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const view = useSelector((state) => state.view);

  for (let i = 0; i <= 12; i++) {
    if (i === 0) {
      gradeArray.push(
        <div
          className='grades'
          key='unassigned'
          onClick={() => {
            setGrade(0);
          }}
        >
          Unassigned
        </div>
      );
    } else {
      gradeArray.push(
        <div
          className='grades'
          key={'grade' + i}
          onClick={() => {
            setGrade(i);
          }}
        >
          Grade {i}
        </div>
      );
    }
  }
  if (view === 'teachers') {
    teachers.map((teacher) => {
      teacherArray.push(
        <Teacher
          name={teacher.first_name + ' ' + teacher.last_name}
          time={teacher.minutes}
          key={teacher.first_name + teacher.last_name}
        />
      );
    });
  } else {
    students.map((student) => {
      studentArray.push(
        <Teacher
          name={teacher.first_name + ' ' + teacher.last_name}
          time={teacher.minutes}
          key={teacher.first_name + teacher.last_name}
        />
      );
    });
  }

  //get request for all teachers, should return an array of all teachers for that grade

  const getData = async (currentGrade) => {
    try {
      const response = await axios.get(`admin/${view}`, {
        params: { grade: currentGrade },
      });
      if (view === 'teachers') {
        const teacherArray = response.data;
        setTeachers(teacherArray);
      } else {
        const studentArray = response.data;
        setStudents(studentArray);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData(currentGrade);
  }, [currentGrade]);
  return view === 'teachers' ? (
    <div id='admin'>
      <div className='main-sidebar'>{gradeArray}</div>
      <div id='teach-container'>{teacherArray}</div>
    </div>
  ) : (
    <div id='admin'>
      <div className='main-sidebar'>{gradeArray}</div>
      <div id='teach-container'>{studentArray}</div>
    </div>
  );
};

export default Admin;
