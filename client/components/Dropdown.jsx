import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal.jsx';

const DropDown = ({ options, handleChange }) => {
  //react hook to open/close the dropdown
  const [open, setOpen] = useState(false);
  const currentAction = '';

  const handleOpen = () => {
    setOpen(!open);
  };

  const [buttonPopup, setButtonPopup] = useState(false);

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
            setButtonPopup(true);
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
      <Modal
        action={currentAction}
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
      />
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
