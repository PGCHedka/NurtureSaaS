const db = require('../models/postgres');
const nodemailer = require('nodemailer');


const adminController = {};

adminController.getTeachers = async (req, res, next) => {
  const grade = req.query.grade;
  try {
    const q = `SELECT t._id, t.first_name, t.last_name, SUM(c.time) AS "minutes"
       FROM tool.class_assignments c 
       FULL OUTER JOIN tool.teachers t 
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
    console.log(req.body);
    const values = [firstName, lastName, grade];
    const { rows } = await db.query(q, values);
    console.log(rows);
    const vals = `${rows[0]._id}, ${classes.join(`), (${rows[0]._id}, `)}`;
    console.log(vals);
    const q2 = `INSERT INTO tool.student_classes(student_id, class_id) VALUES (${vals})`;
    await db.query(q2);
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.addStudent: ${err}`,
      status: 500,
      message: 'Cannot add that student right now, sorry!',
    });
  }
};

adminController.addClass = async (req, res, next) => {
  const { name, description, teacher_id, grade } = req.body;
  try {
    const q = `INSERT INTO tool.classes(name, grade, teacher_id, description) VALUES ($1, $2, $3, $4)`;
    const values = [name, grade, teacher_id, description];
    const r = await db.query(q, values);
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.addClass: ${err}`,
      status: 500,
      message: 'Cannot add that class right now, sorry!',
    });
  }
};

adminController.updateStudent = async (req, res, next) => {
  const { id, firstName, lastName, grade } = req.body;
  try {
    let q = `UPDATE tool.students SET `;
    if (firstName) q += `first_name = '${firstName}',`;
    if (lastName) q += `last_name = '${lastName}',`;
    if (grade) q += `grade = ${grade}`;
    if (q[q.length - 1] === ',') q = q.slice(0, q.length - 1) + ' ';
    q += `WHERE _id = ${id}`;
    await db.query(q);
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.updateStudent: ${err}`,
      status: 500,
      message: 'This student does not want to be updated, sorry!',
    });
  }
};

adminController.updateStudentClasses = async (req, res, next) => {
  const { id, classes } = req.body;
  try {
    if (classes) {
      let q = `DELETE FROM tool.student_classes WHERE student_id = ${id}`;
      await db.query(q);
      let q2 = `INSERT INTO tool.student_classes(student_id, class_id) VALUES `;
      classes.forEach((x, i) => {
        if (i === classes.length - 1) q2 += `(${id}, ${x})`;
        else q2 += `(${id}, ${x}),`;
      });
      const r = await db.query(q2);
    }
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.updateStudentClasses: ${err}`,
      status: 500,
      message: 'This student wants to stay in their classes, sorry!',
    });
  }
};

adminController.deleteStudent = async (req, res, next) => {
  const { id } = req.body;
  try {
    const q = `DELETE FROM tool.students WHERE _id = ${id}`;
    const r = await db.query(q);
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.deleteStudent: ${err}`,
      status: 500,
      message: 'This student does not want to be deleted, sorry!',
    });
  }
};

adminController.getStudent = async (req, res, next) => {
  const id = Number(req.query.student_id);
  console.log(req.query);
  console.log(id);
  try {
    const q = `SELECT * FROM tool.students WHERE _id = ${id}`;
    const { rows } = await db.query(q);
    res.locals = rows[0];
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.getStudent: ${err}`,
      status: 500,
      message: 'We cannot find this student, sorry!',
    });
  }
};

adminController.getStudents = async (req, res, next) => {
  const grade = req.query.grade;
  console.log(grade);
  try {
    let q = `SELECT s.*, SUM(ca.time) as "minutes"
                FROM tool.students s
                FULL OUTER JOIN tool.student_classes sc
                ON sc.student_id = s._id
                FULL OUTER JOIN tool.class_assignments ca
                ON sc.class_id = ca.class_id `
    if (grade) q += `WHERE s.grade = ${grade}`;
    q += ` GROUP BY s._id`;
    console.log(q);
    const { rows } = await db.query(q);
    console.log(rows)
    res.locals = rows;
    console.log(rows);
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.getStudents: ${err}`,
      status: 500,
      message: 'We cannot find this student, sorry!',
    });
  }
};

adminController.getTeacher = async (req, res, next) => {
  const id = Number(req.query.teacher_id);
  console.log(id);
  try {
    const q = `SELECT * FROM tool.teachers WHERE _id = ${id}`;
    const rows = await db.query(q);
    res.locals = rows[0];
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.getTeacher: ${err}`,
      status: 500,
      message: 'We cannot find this teacher, sorry!',
    });
  }
};

adminController.updateTeacher = async (req, res, next) => {
  const { id, firstName, lastName, grade1, grade2, grade3 } = req.body;
  console.log(req.body);
  try {
    let q = `UPDATE tool.teachers SET `;
    if (firstName) q += `first_name = '${firstName}',`;
    if (lastName) q += `last_name = '${lastName}', `;
    if (grade1) q += `grade_1 = ${grade1},`;
    if (grade2) q += `grade_2 = ${grade2},`;
    if (grade3) q += `grade_3 = ${grade3} `;
    if (q[q.length - 1] === ',') q = q.slice(0, q.length - 1) + ' ';
    q += `WHERE _id = ${id}`;
    console.log(q);
    const r = await db.query(q);
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.updateTeacher: ${err}`,
      status: 500,
      message: 'They would prefer not to be updated, sorry!',
    });
  }
};

adminController.deleteTeacher = async (req, res, next) => {
  const { id } = req.body;
  try {
    const q = `DELETE FROM tool.teachers WHERE _id = $1`;
    const vals = [id];
    const r = await db.query(q, vals);
    console.log(r);
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.deleteTeacher: ${err}`,
      status: 500,
      message: 'That teacher is here to stay, sorry!',
    });
  }
};

adminController.updateClass = async (req, res, next) => {
  const { id, name, description, teacher_id, grade } = req.body;
  try {
    let q = `UPDATE tool.classes SET `;
    if (name) q += `name = '${name}',`;
    if (description) q += `description = '${description}', `;
    if (teacher_id) q += `teacher_id = ${teacher_id},`;
    if (grade) q += `grade = ${grade},`;
    if (q[q.length - 1] === ',') q = q.slice(0, q.length - 1) + ' ';
    q += `WHERE _id = ${id}`;
    console.log(q);
    const r = await db.query(q);
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.updateClass: ${err}`,
      status: 500,
      message: 'That teacher is here to stay, sorry!',
    });
  }
};

adminController.getClasses = async (req, res, next) => {
  try {
    const q = `SELECT * FROM tool.classes`;
    console.log(q);
    const response = await db.query(q);
    res.locals = response;
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.updateClass: ${err}`,
      status: 500,
      message: 'That teacher is here to stay, sorry!',
    });
  }
};

adminController.deleteClass = async (req, res, next) => {
  const { id } = req.body;
  try {
    const q = `DELETE FROM tool.classes WHERE _id = $1`;
    const vals = [id];
    const r = await db.query(q, vals);
    console.log(r);
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.deleteClass: ${err}`,
      status: 500,
      message: 'That teacher is here to stay, sorry!',
    });
  }
};


/**
 * This is solely set up as a test. To use, you would need to incorporate your own credentials.
 */
adminController.inviteTeacher = async (req, res, next) => {
  const email = req.body.email;
  try {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"PGCHedka" <pgchedkanoreply@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Invited to join PGCHedka", // Subject line
      text: "Please sign up as a teacher at PGCHedka.", // plain text body
      html: "<a>localhost:8080/</a>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return next();
  } catch (err) {
    return next({
      log: `Error in adminController.inviteTeacher: ${err}`,
      status: 500,
      message: 'That teacher is here to stay, sorry!',
    });
  }
};

module.exports = adminController;
