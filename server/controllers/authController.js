const db = require('../models/postgres');
const bcrypt = require('bcrypt');

const authController = {};

authController.teacherSignUp = async(req, res, next) => {
  const { firstName, lastName, email, password, grade1, grade2, grade3 } = req.body;
  const today = new Date().toDateString();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const q = `INSERT INTO tool.teachers(first_name, last_name, email, password, grade_1, grade_2, grade_3, date_registered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
    const values = [firstName, lastName, email, hashedPassword, grade1, grade2, grade3, today];
    const { rows } = await db.query(q, values);
    console.log(rows);
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: `Error in authController.teacherSignUp: ${err}`,
      status: 500,
      message: 'Cannot sign up teacher right now, sorry!',
    });
  }
};

authController.teacherLogin = async(req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const q = `SELECT * FROM tool.teachers WHERE email = $1`;
    const values = [email];
    const { rows } = await db.query(q, values);
    console.log(rows);
    if(await bcrypt.compare(password, rows[0].password)){
      const teacher = {
        id: rows[0]._id,
        name: `${rows[0].first_name} ${rows[0].last_name}`,
        flagged: rows[0].flagged,
      }
      res.locals = teacher;
    } else {
      return next({ status: 403 });
    }
    return next();
  } catch(err) {
    return next({
      log: `Error in authController.teacherLogin: ${err}`,
      status: 500,
      message: 'Cannot login teacher right now, sorry!',
    });
  }
};


authController.adminSignUp = async(req, res, next) => {
    const { firstName, 
        lastName, 
        email, 
        password } = req.body;
    const today = new Date().toDateString();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const q = `INSERT INTO tool.admins(first_name, last_name, email, password, date_registered) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
        const values = [firstName, lastName, email, hashedPassword, today];
        const { rows } = await db.query(q, values);
        console.log(rows);
        return next();
    } catch(err) {
        console.log(err);
        return next({
            log:`Error in authController.adminSignup: ${err}`,
            status: 500,
            message: 'Error in admin sign-up.'
        });
    }    
};

authController.adminLogin = async(req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const q = `SELECT * FROM tool.admins WHERE email = $1`;
    const values = [email];
    const { rows } = await db.query(q, values);
    console.log(rows);
    if(await bcrypt.compare(password, rows[0].password)){
      const admin = {
        id: rows[0]._id,
        name: `${rows[0].first_name} ${rows[0].last_name}`,
      }
      res.locals = admin;
    } else {
      return next({ status: 403 });
    }
    return next();
  } catch(err) {
    return next({
      log: `Error in authController.teacherLogin: ${err}`,
      status: 500,
      message: 'Cannot login teacher right now, sorry!',
    });
  }
}

module.exports = authController;