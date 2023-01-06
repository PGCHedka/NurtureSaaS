const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post(
  '/admin/login', 
  authController.adminLogin,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
)

router.post(
  '/admin/signup',
  authController.adminSignUp,
  authController.adminLogin,
  (req, res) => {
      return res.status(200).json(res.locals);
  }
)

router.post(
  '/teacher/login', 
  authController.teacherLogin,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
)

router.post(
  '/teacher/signup', 
  authController.teacherSignUp, 
  authController.teacherLogin,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
)

module.exports = router;