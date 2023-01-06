import { createAction, createReducer } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

// // //ACTIONS - i've included an example, feel free to change
const loginAction = createAction('loginAction');

//user type can be admin, teacher
const initialState = {
  userInfo: {
    type: 'admin',
  },
  loggedIn: true,
};

const rootReducer = createReducer(initialState, (builder) =>
  builder.addCase(loginAction, (state, action) => {
    console.log('here');
    state.loggedIn ? (state.loggedIn = false) : (state.loggedIn = true);
  })
);

// //export reducer
export default rootReducer;

// export actions
export { loginAction };
