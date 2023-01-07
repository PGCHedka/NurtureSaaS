import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Teacher from '../components/Teacher.jsx';
import Student from '../components/Student.jsx';
import ModalAdd from '../components/ModalAdd.jsx';
import ModalUpdate from '../components/ModalUpdate.jsx';

const Admin = () => {
  const [grades, setGrades] = useState([])
  const [currentGrade, setGrade] = useState('0');
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState({});
  const [updatePopup, setUpdatePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const view = useSelector((state) => state.view);

  const teacherGen = (teachers) => {
    return teachers.map((teacher) => {
      return (
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
      )
    });
  };

  const studentGen = (students) => {
    return students.map((student, i) => {
      if (student.minutes === null) {
        student.minutes = 0;
      }
      return (
        <div key={student.first_name + student.last_name + student.minutes + student.grade + i}>
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
            time={student.minutes}
            trigger={setUpdatePopup}
          />
        </div>
      )
    });
  }
  
  useEffect(() => {
    const gradeArray = [];
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
    setGrades(gradeArray);
    if (view === 'teachers') {
      setTeachers(teacherGen(teachers))
    } else {
      setStudents(studentGen(students))
    }
  }, []);

  //get request for all teachers, should return an array of all teachers for that grade

  const getData = async (currentGrade) => {
    try {
      const response = await axios.get(`admin/${view}`, {
        params: { grade: currentGrade },
      });
      if (view === 'teachers') {
        if (!Object.keys(response.data).length) {
          setTeachers([])
        } else {
          const teacherArray = response.data;
          setTeachers(teacherGen(teacherArray));
        }
      } else {
        if (!Object.keys(response.data).length) {
          console.log('this is if theres no students')
          setStudents([])
        } else {
          const studentArray = response.data;
          setStudents(studentGen(studentArray));
        }
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
        obj[data[i].name] = 1;
      }
      setClasses(obj);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    getData(currentGrade);
  }, [currentGrade]);

  useEffect(() => {
    getData(currentGrade);
  }, [view]);

  return view === 'teachers' ? (
    <div id='admin'>
      <div className='main-sidebar'>
        <h2>Grades</h2>
        {grades}
      </div>
      <div id='main-content'>
        <h1>Teachers</h1>
        <div id='teach-container'>{teachers}</div>
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
      <div className='main-sidebar'>
        <h2>Grades</h2>
        {grades}
      </div>
      <div id='main-content'>
        <h1>Students</h1>
        <div id='teach-container'>{students}</div>
        <div className='add-contain'>
          <ModalAdd
            name={'Add Student'}
            type='student'
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
