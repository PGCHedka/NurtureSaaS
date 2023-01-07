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
  const [currentGrade, setGrade] = useState('0');
  const [teachers, setTeachers] = useState([
    { first_name: 'Kate', last_name: 'A', time: 500 },
    { first_name: 'Dhruv', last_name: 'B', time: 1 },
    { first_name: 'Anna', last_name: 'L', time: 60 },
    { first_name: 'Emily', last_name: 'C', time: 548974895 },
  ]);

  for (let i = 0; i <= 12; i++) {
    if (i === 0) {
      gradeArray.push(
        <div
          className='grades'
          key='unassigned'
          onClick={() => {
            console.log('grade_' + i);
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
            console.log('grade_' + i);
            setGrade(i);
          }}
        >
          Grade {i}
        </div>
      );
    }
  }

  teachers.map((teacher) => {
    teacherArray.push(
      <Teacher
        name={teacher.first_name + ' ' + teacher.last_name}
        time={teacher.time}
        key={teacher.first_name + teacher.last_name}
      />
    );
  });

  //get request for all teachers, should return an array of all teachers for that grade

  const getTeachers = async (currentGrade) => {
    try {
      const response = await axios.get('admin/teachers', {
        params: { grade: currentGrade },
      });
      const teacherArray = response.data;
      console.log(teacherArray);
      // setTeachers(teacherArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTeachers(currentGrade);
  }, [currentGrade]);
  return (
    <div id='admin'>
      <div className='main-sidebar'>{gradeArray}</div>
      <div id='teach-container'>{teacherArray}</div>
    </div>
  );
};

export default Admin;
