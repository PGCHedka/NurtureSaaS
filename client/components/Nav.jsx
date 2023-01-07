import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from './Dropdown.jsx';
import styles from '../styles/_components.scss';
import { updateView } from '../rootReducer';

const Nav = () => {
  const loggedInStatus = useSelector((state) => state.loggedIn);
  const userType = useSelector((state) => state.userInfo.type);
  const [linkOptions, setLinkOptions] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    userType === 'admin'
      ? setLinkOptions(['View Students', 'View Teachers', 'Logout'])
      : setLinkOptions(['Assign', 'Logout']);
  }, [userType]);

  return loggedInStatus ? (
    <div id='navbar'>
      <h1 id='nav-title'>Nurture</h1>
      <DropDown
        options={linkOptions}
        handleChange={(name) => {
          dispatch(updateView('student'));
        }}
      />
    </div>
  ) : (
    <div></div>
  );
};

export default Nav;
