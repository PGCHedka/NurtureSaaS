const db = require('../models/postgres');


const adminController = {};

adminController.getTeachers = async (req, res, next) => {
  const grade = req.query.grade;
  try { 
    const q = `SELECT first_name, last_name, email FROM tool.teachers WHERE grade_1 = $1 OR grade_2 = $1 OR grade_3 = $1`;
    const values = [grade];
    const { rows } = await db.query(q, values);
    console.log(rows);
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
}

module.exports = adminController;
