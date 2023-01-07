const db = require('../models/postgres');


const teacherController = {};

teacherController.getClasses = async (req, res, next) => {
    const { id } = req.body; //teacher_id passed
    try {
        const q = `SELECT * 
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
    const id = req.query.class_id;   //class_id passed
    console.log(id);
    try {
        // const q = `SELECT s.first_name, s.last_name, s._id, SUM(ca.time) as "minutes", c.name  
        //             FROM tool.students s
        //             FULL OUTER JOIN tool.student_classes sc
        //             ON sc.student_id = s._id
        //             FULL OUTER JOIN tool.classes c
        //             ON sc.class_id = c._id
        //             FULL OUTER JOIN tool.class_assignments ca
        //             ON ca.class_id = c._id 
        //             WHERE ca.date = NOW()::date
        //             AND sc.class_id = $1
        //             GROUP BY s._id, s.first_name, s.last_name, sc._id, c.name`;
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
            })
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



module.exports = teacherController;