const db = require('../models/postgres');


const adminController = {};

adminController.getTeachers = async (req, res, next) => {
  const grade = req.query.grade;
  try { 
    const q = 
      `SELECT t._id, t.first_name, t.last_name, SUM(c.time) AS "minutes"
       FROM tool.class_assignments c 
       JOIN tool.teachers t 
       ON c.teacher_id = t._id 
       WHERE c.date = NOW()::DATE
       AND t.grade_1 = ${grade} OR t.grade_2 = ${grade} OR t.grade_3 = ${grade}
       GROUP BY t._id`;
    const { rows } = await db.query(q);
    res.locals = rows;
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: `Error in adminController.getTeachers: ${err}`,
      status: 500,
      message: 'Cannot get teachers right now, sorry!',
    });
  }
};

adminController.addStudent = async (req, res, next) => {
  const { firstName, lastName, classes, grade } = req.body;
  try { 
    const q = `INSERT INTO tool.students(first_name, last_name, grade) VALUES ($1, $2, $3) RETURNING *`; 
    const values = [firstName, lastName, grade];
    const { rows } = await db.query(q, values);
    console.log(rows);
    const vals =`${rows._id}, ${classes.join(`), (${rows._id}, `)}`
    console.log(vals);
    const q2 = `INSERT INTO tool.student_classes(student_id, class_id) VALUES (${vals})`;
    console.log(q2);
  } catch (err) {

  }
}

// adminController.addClass = async(req, res, next) => {
//   const { name, description, teacher_id, grade } = req.body;
//   try{

//   }
// }

module.exports = adminController;
