const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post(
  '/admin/login', 
  (req, res) => {
    return res.status(200).json(res.locals);
  }
)

router.post(
    '/admin/signup',
    authController.adminSignUp,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

router.post(
  '/teacher/login', 
  (req, res) => {
    return res.status(200).json(res.locals);
  }
)

router.post(
  '/teacher/signup', 
  authController.teacherSignUp, 
  (req, res) => {
    return res.status(200).json(res.locals);
  }
)

module.exports = router;