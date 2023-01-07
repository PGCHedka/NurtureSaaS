import { createAction, createReducer } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

// // //ACTIONS - i've included an example, feel free to change
const loginAction = createAction('loginAction');
const userIDAction = createAction('userIDAction')

//user type can be admin, teacher
const initialState = {
  userInfo: {
    type: 'admin',
  },
  loggedIn: false,
  userID: ''
};

const rootReducer = createReducer(initialState, (builder) =>
  builder.addCase(loginAction, (state, action) => {
    console.log('loginAction');
    state.loggedIn ? (state.loggedIn = false) : (state.loggedIn = true);
  })
  .addCase(userIDAction, (state, action) => {
    console.log('userIDAction');
    state.userID = action.payload;
  })
);

// //export reducer
export default rootReducer;

// export actions
export { loginAction, userIDAction };
