CREATE SCHEMA tool;

CREATE TABLE  tool.admins (
  "_id" serial NOT NULL,
  "first_name" varchar(30) NOT NULL, 
  "last_name" varchar(40) NOT NULL,
  "email" varchar(80) NOT NULL UNIQUE, 
  "password" varchar NOT NULL,
  "date_registered" date NOT NULL,
  CONSTRAINT "admins_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE  tool.teachers (
  "_id" serial NOT NULL,
  "first_name" varchar(30) NOT NULL,
  "last_name" varchar(30) NOT NULL,
  "email" varchar(80) NOT NULL UNIQUE,
  "password" varchar NOT NULL,
  "date_registered" date NOT NULL,
  "flagged" boolean NOT NULL DEFAULT FALSE,
  "grade_1" integer NOT NULL,
  "grade_2" integer, 
  "grade_3" integer,
  CHECK (grade_1 >= 1 AND grade_1 <= 12),
  CHECK (grade_2 >= 1 AND grade_2 <= 12),
  CHECK (grade_3 >= 1 AND grade_3 <= 12),
  CONSTRAINT "teachers_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE  tool.classes (
  "_id" serial NOT NULL,
  "name" varchar(60) NOT NULL,
  "grade" integer, 
  "description" varchar,
  CHECK (grade >= 1 AND grade <= 12),
  CONSTRAINT "classes_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE  tool.students (
  "_id" serial NOT NULL,
  "first_name" varchar(30) NOT NULL,
  "last_name" varchar(30) NOT NULL,
  "grade" integer NOT NULL,
   CHECK (grade >= 1 AND grade <= 12),
  CONSTRAINT "students_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE  tool.teacher_classes (
  "_id" serial NOT NULL,
  "teacher_id" integer NOT NULL,
  "class_id" integer NOT NULL,
  CONSTRAINT "teacher_classes_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE  tool.class_assignments (
  "_id" serial NOT NULL,
  "class_id" integer NOT NULL,
  "time" integer NOT NULL,
  "date" date NOT NULL,
  CONSTRAINT "class_assignments_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE  tool.student_classes (
  "_id" serial NOT NULL,
  "student_id" integer NOT NULL,
  "class_id" integer NOT NULL,
  CONSTRAINT "student_classes_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);


ALTER TABLE tool.teacher_classes ADD CONSTRAINT "teacher_classes_fk0" FOREIGN KEY ("teacher_id") REFERENCES tool.teachers("_id");
ALTER TABLE tool.teacher_classes ADD CONSTRAINT "teacher_classes_fk1" FOREIGN KEY ("class_id") REFERENCES tool.classes("_id");
ALTER TABLE tool.class_assignments ADD CONSTRAINT "class_assignements_fk0" FOREIGN KEY ("class_id") REFERENCES tool.classes("_id");
ALTER TABLE tool.student_classes ADD CONSTRAINT "student_classes_fk0" FOREIGN KEY ("student_id") REFERENCES tool.students("_id");
ALTER TABLE tool.student_classes ADD CONSTRAINT "student_classes_fk1" FOREIGN KEY ("class_id") REFERENCES tool.classes("_id");

