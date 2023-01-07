const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.get('/classes',
    teacherController.getClasses,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
);

router.get('/students',
    teacherController.getStudents,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

module.exports = router;