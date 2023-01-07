import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeed, addFriends } from '../rootReducer.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherView = () => {
  const userID = useSelector((state) => state.userID);
  const [classArray, setClassArray] = useState();
  const classes = [];

  useEffect(() => {
    const getClasses = async (userID) => {
      try {
        const response = axios.get('/getClasses', {
            params: { id: userID },
          }
        )
        setClassArray(response.data);
        classes = classArray.map(className => {
          return (
            <div>{className.name}</div>
          )
        })
      }
      catch(err) {
        console.log(err)
      }
    };
    getClasses(userID);
  }, [])

  return (
    <div id='home'>
      <h1>Teacher View</h1>
      <div class='main-sidebar'>{classes}</div>
    </div>
  );
};

export default TeacherView;
