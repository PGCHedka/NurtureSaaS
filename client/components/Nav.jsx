import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DropDown from './Dropdown.jsx';
import styles from '../styles/_components.scss';

const Nav = () => {
  const loggedInStatus = useSelector((state) => state.loggedIn);
  const userType = useSelector((state) => state.userInfo.type);
  const [linkOptions, setLinkOptions] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    userType === 'admin'
      ? setLinkOptions(['View Students', 'View Teachers', 'Log Out'])
      : setLinkOptions(['Assign', 'Logout']);
  }, []);

  return loggedInStatus ? (
    <div id='navbar'>
      <h1 id='nav-title'>PGCHedka</h1>
      <DropDown options={linkOptions} handleChange={(name) => {}} />
    </div>
  ) : (
    <div></div>
  );
};

export default Nav;
