const db = require('../models/postgres');


const teacherController = {};

teacherController.getClasses = async (req, res, next) => {
    const id = req.params.id; //teacher_id passed
    try {
        const q = `SELECT * 
                    FROM tool.classes 
                    WHERE teacher_id = $1`;
        const values = [id];
        const { rows } = await db.query(q, values);
        res.locals = rows;
        console.log(rows);
        return next();
    } catch (err) {
        console.log(err);
        return next({
            log: `Error in teacherController getClasses middleware: ${err}`,
            status: 500,
            message: 'Cannot get classes right now :(',
        });
    }
};

teacherController.getStudents = async (req, res, next) => {
    const id = req.params.id;   //class_id passed
    console.log(id);
    try {
        const q = `SELECT s._id, s.first_name, s._id, s.last_name
                    FROM tool.classes c
                    LEFT OUTER JOIN tool.student_classes sc
                    ON sc.class_id = c._id
                    LEFT OUTER JOIN tool.students s
                    ON sc.student_id = s._id
                    WHERE sc.class_id = $1
                    GROUP BY s._id`;
        const values = [id];
        const { rows } = await db.query(q, values);
        if(rows.length){
            let students = ''
            rows.forEach(x => {
                students += `s._id = ${x._id} OR `;
            });
            students = students.slice(0, students.length - 3);
            const q2 = `SELECT s._id, s.first_name, s.last_name, SUM(ca.time) as "minutes"
                        FROM tool.students s
                        FULL OUTER JOIN tool.student_classes sc
                        ON sc.student_id = s._id
                        FULL OUTER JOIN tool.class_assignments ca
                        ON sc.class_id = ca.class_id
                        WHERE ` + students + `GROUP BY s._id`;
            const r1 = await db.query(q2);
            console.log(r1.rows);
            res.locals = r1.rows;
        }
        return next();
    } catch (err) {
        console.log(err);
        return next({
            log: `Error in teacherController getStudents middleware: ${err}`,
            status: 500,
            message: 'Cannot get students right now :(',
        });
    }
}

teacherController.postAssignment = async (req, res, next) => {
    const { class_id, teacher_id, time } = req.body;
    try {
        const q = `INSERT INTO tool.class_assignments (class_id, teacher_id, time)
                    VALUES ($1, $2, $3)
                    RETURNING *`;
        const values = [class_id, teacher_id, time];
        const { rows } = await db.query(q, values);
        console.log('rows: ', rows);
        res.locals = rows[0];
        return next();
    } catch (err) {
        console.log(err);
        return next({
            log: `Error in teacherController postAssignment middleware: ${err}`,
            status: 501,
            message: 'Cannot post assignment right now :(',
        });
    }
}

module.exports = teacherController;