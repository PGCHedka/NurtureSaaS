import React, { useEffect, useState } from 'react';
import Links from './Links.jsx';
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
      {/* <Modal action={currentAction} setTrigger={setButtonPopup} trigger={buttonPopup}/>   */}
      <h1 id='nav-title'>Student</h1>
      <DropDown options={linkOptions} handleChange={(name) => {}} />
    </div>
  );
};

export default Nav;
