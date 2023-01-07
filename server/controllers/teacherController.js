const db = require('../models/postgres');


const teacherController = {};

teacherController.getClasses = async (req, res, next) => {
    const { id } = req.body; //teacher_id passed
    try {
        const q =   `SELECT * 
                    FROM tool.teacher_classes t
                    WHERE t.teacher_id = $1`;
        const values = [id];
        const { rows } = await db.query(q, values);
        res.locals = rows;
    }catch (err) {
        console.log(err);
        return next({
            log: `Error in teacherController getClasses middleware: ${err}`,
            status: 500,
            message: 'Cannot get classes right now :(',
        });
    }
};

teacherController.getStudents = async (req, res, next) => {
    const { id } = req.body;   //class_id passed
    try {
        const q = `SELECT *
                    FROM tool.students s
                    JOIN student_classes sc
                    ON sc.student_id = s._id
                    WHERE sc.class_id = $1`;
        const values = [id];
        const { rows } = await db.query(q, values);
        res.locals = rows;
    }catch (err) {
        console.log(err);
        return next({
            log: `Error in teacherController getStudents middleware: ${err}`,
            status: 500,
            message: 'Cannot get students right now :(',
        });
    }
}



module.exports = teacherController;