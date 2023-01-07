const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/teachers', adminController.getTeachers, (req, res) => {
  return res.status(200).json(res.locals);
});

router.post('/student', adminController.addStudent, (req, res) => {
  return res.status(200).json(res.locals);
});

router.patch(
  '/student',
  adminController.updateStudent,
  adminController.updateStudentClasses,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

router.post('/class', adminController.addClass, (req, res) => {
  return res.status(200).json(res.locals);
});

router.delete('/student', adminController.deleteStudent, (req, res) => {
  return res.status(200).json(res.locals);
});

router.patch('/teacher', adminController.updateTeacher, (req, res) => {
  return res.status(200).json(res.locals);
});

router.delete('/teacher', adminController.deleteTeacher, (req, res) => {
  return res.status(200).json(res.locals);
});

router.patch('/class', adminController.updateClass, (req, res) => {
  return res.status(200).json(res.locals);
});

router.delete('/class', adminController.deleteClass, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/student', adminController.getStudent, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/students', adminController.getStudents, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/teacher', adminController.getTeacher, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/classes'),
  adminController.getClasses,
  (req, res) => {
    return res.status(200).json(res.locals);
  };

module.exports = router;
