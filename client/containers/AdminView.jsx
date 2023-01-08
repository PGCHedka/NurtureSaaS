import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Teacher from '../components/Teacher.jsx';
import Student from '../components/Student.jsx';
import ModalAdd from '../components/ModalAdd.jsx';
import ModalUpdate from '../components/ModalUpdate.jsx';
const Admin = () => {
  const gradeArray = [];
  const teacherArray = [];
  const studentArray = [];
  const [currentGrade, setGrade] = useState('0');
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState({});
  const view = useSelector((state) => state.view);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
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
        <div key={teacher.first_name + teacher.last_name}>
          <ModalUpdate
            name={teacher.first_name + ' ' + teacher.last_name}
            data={teacher}
            classes={classes}
            type='teacher'
            trigger={updatePopup}
            setTrigger={setUpdatePopup}
          />
          <Teacher
            name={teacher.first_name + ' ' + teacher.last_name}
            time={teacher.minutes}
            trigger={setUpdatePopup}
          />
        </div>
      );
    });
  } else {
    students.map((student) => {
      studentArray.push(
        <div key={student.first_name + student.last_name}>
          <ModalUpdate
            name={student.first_name + ' ' + student.last_name}
            data={student}
            classes={classes}
            type='student'
            trigger={updatePopup}
            setTrigger={setUpdatePopup}
          />
          <Student
            name={student.first_name + ' ' + student.last_name}
            time={100}
            trigger={setUpdatePopup}
          />
        </div>
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
  const getClasses = async () => {
    try {
      const response = await axios.get('/admin/classes');
      const data = response.data.rows;
      const obj = {};
      for (let i = 0; i < data.length; i++) {
        obj[data[i].name] = data[i]._id;
      }
      setClasses(obj);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData(currentGrade);
  }, [currentGrade]);

  useEffect(() => {
    getData(currentGrade);
    getClasses();
  }, [view]);

  return view === 'teachers' ? (
    <div id='admin'>
      <div className='main-sidebar'>
        <h2>Grades</h2>
        {gradeArray}
      </div>
      <div id='main-content'>
        <div id='teach-container'>{teacherArray}</div>
        <div className='add-contain'>
          <ModalAdd
            name={'Add Teacher'}
            type='teacher'
            classes={classes}
            trigger={addPopup}
            setTrigger={setAddPopup}
          />
          <img
            src={require('../images/add.png').default}
            className='add-button'
            onClick={() => {
              setAddPopup(true);
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <div id='admin'>
      <div className='main-sidebar'>{gradeArray}</div>
      <div id='main-content'>
        <div id='teach-container'>{studentArray}</div>
        <div className='add-contain'>
          <ModalAdd
            name={'Add Student'}
            type='student'
            classes={classes}
            trigger={addPopup}
            setTrigger={setAddPopup}
          />
          <img
            src={require('../images/add.png').default}
            className='add-button'
            onClick={() => {
              setAddPopup(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Admin;