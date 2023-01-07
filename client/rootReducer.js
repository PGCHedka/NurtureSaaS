import { createAction, createReducer } from '@reduxjs/toolkit';

// // //ACTIONS - i've included an example, feel free to change
const loginAction = createAction('loginAction');
const updateView = createAction('updateView');
const userIDAction = createAction('userIDAction');
const userTypeAction = createAction('userTypeAction')

//user type can be admin, teacher
const initialState = {
  userInfo: {
    type: '',
  },
  view: 'teachers',
  loggedIn: false,
  userID: '',
};

const rootReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(loginAction, (state, action) => {
      state.loggedIn ? (state.loggedIn = false) : (state.loggedIn = true);
    })
    .addCase(updateView, (state, action) => {
      console.log(action.payload);
      action.payload === 'View Students'
        ? (state.view = 'students')
        : (state.view = 'teachers');
    })
    .addCase(userIDAction, (state, action) => {
      console.log('userIDAction');
      state.userID = action.payload;
    })
    .addCase(userTypeAction, (state, action) => {
      state.userInfo.type = action.payload;
    })
);

// //export reducer
export default rootReducer;

// export actions
export { loginAction, updateView, userIDAction, userTypeAction };
