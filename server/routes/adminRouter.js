const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/teachers', 
  adminController.getTeachers,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);


module.exports = router;