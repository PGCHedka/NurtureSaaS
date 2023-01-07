const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.get('/classes/:id',
    teacherController.getClasses,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
);

router.get('/students/:id',
    teacherController.getStudents,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

module.exports = router;