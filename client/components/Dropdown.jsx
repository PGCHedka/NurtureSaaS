import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction, updateView } from '../rootReducer.js';
import { useNavigate } from 'react-router-dom';

const DropDown = ({ options, handleChange }) => {
  console.log(options);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //react hook to open/close the dropdown
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  //creates array of html button elements of each action
  const optionsArr = [];
  options.forEach((name) => {
    optionsArr.push(
      <li key={`li` + name} className='menu-item'>
        <button
          key={'li-but' + name}
          onClick={(e) => {
            handleMenu(name);
            handleChange(name);
            // setAction(name);
            if (name !== 'Logout') {
              // setButtonPopup(true);
              dispatch(updateView(name));
            } else {
              dispatch(loginAction());
              navigate('/');
            }
          }}
        >
          {name}
        </button>
      </li>
    );
  });
  //function to close menu after selection click
  const handleMenu = (name) => {
    setOpen(false);
  };

  const ref = useOutsideClick(() => {
    setOpen(false);
  });

  return (
    <div id='dropdown'>
      <button className='dropdown-button' ref={ref} onClick={handleOpen}>
        Actions
      </button>
      {open ? <ul className='menu'>{optionsArr}</ul> : null}
    </div>
  );
};

//helper function to close dropdown if click is outside of the dropdown
const useOutsideClick = (cb) => {
  const ref = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  return ref;
};

export default DropDown;
