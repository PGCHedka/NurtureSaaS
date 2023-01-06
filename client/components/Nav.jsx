import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DropDown from './Dropdown.jsx';

const Nav = () => {
  const loggedInStatus = useSelector((state) => state.loggedIn);
  const userType = useSelector((state) => state.userInfo.type);
  const [linkOptions, setLinkOptions] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    userType === 'admin'
      ? setLinkOptions([
          'Add Student',
          'Update Teacher',
          'Update Student',
          'Log Out',
        ])
      : setLinkOptions(['Assign', 'Logout']);
  }, []);

  return (
    <div id='navbar'>
      <h1 id='nav-title'>PGCHedka</h1>
      <DropDown options={linkOptions} handleChange={(name) => {}} />
    </div>
  );
};

export default Nav;
