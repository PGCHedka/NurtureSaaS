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

module.exports = adminController;
