CREATE SCHEMA tool;
SET search_path TO tool;
SET TIMEZONE = 'GMT';

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
  "teacher_id" integer NOT NULL,
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

CREATE TABLE  tool.class_assignments (
  "_id" serial NOT NULL,
  "class_id" integer NOT NULL,
  "teacher_id" integer NOT NULL,
  "time" integer NOT NULL,
  "date" date NOT NULL DEFAULT NOW()::date,
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


ALTER TABLE tool.classes ADD CONSTRAINT "classes" FOREIGN KEY ("teacher_id") REFERENCES tool.teachers("_id");
ALTER TABLE tool.class_assignments ADD CONSTRAINT "class_assignements_fk0" FOREIGN KEY ("class_id") REFERENCES tool.classes("_id");
ALTER TABLE tool.student_classes ADD CONSTRAINT "student_classes_fk0" FOREIGN KEY ("student_id") REFERENCES tool.students("_id");
ALTER TABLE tool.student_classes ADD CONSTRAINT "student_classes_fk1" FOREIGN KEY ("class_id") REFERENCES tool.classes("_id");
ALTER TABLE tool.class_assignements ADD CONSTRAINT "class_assignments_fk1" FOREIGN KEY ("teacher_id") REFERENCES tools.teachers("_id");


INSERT INTO tool.classes VALUES (1, 'Science', 1, 1, 'We talk about science and stuff.');
INSERT INTO tool.classes VALUES (2, 'Biology', 1, 1, 'We talk about biology and stuff.');
INSERT INTO tool.classes VALUES (3, 'History', 1, 1, 'We talk about history and stuff.');
INSERT INTO tool.classes VALUES (34, 'Architecture', 1, 3, 'We talk about architecture and stuff.');
INSERT INTO tool.classes VALUES (35, 'Botany', 4, 10, 'We talk about botany and stuff.');
INSERT INTO tool.classes VALUES (36, 'Animal Sciences', 4, 10, 'We talk about animals and stuff.');
INSERT INTO tool.classes VALUES (37, 'World Religions', 11, 9, 'We talk about religion and stuff.');
INSERT INTO tool.classes VALUES (38, 'Eastern European History', 7, 7, 'We talk about the USSR and stuff.');
INSERT INTO tool.classes VALUES (39, 'Rocket Science', 3, 12, 'We talk about rockets and stuff.');
INSERT INTO tool.classes VALUES (40, 'The Science of Laughter', 1, 3, 'We laugh and stuff.');
INSERT INTO tool.classes VALUES (41, 'How to Find Meaning', 3, 12, 'We talk about meaning and stuff.');
INSERT INTO tool.classes VALUES (42, 'How to Deal with Stress', 3, 12, 'We talk about stress and stuff.');
INSERT INTO tool.classes VALUES (43, 'Cooking', 9, 7, 'We cook a lot of stuff.');
INSERT INTO tool.classes VALUES (44, 'Finances 101', 3, 12, 'We talk about finances and stuff.');
INSERT INTO tool.classes VALUES (45, 'Baking Baguettes', 5, 4, 'We talk about baguettes and stuff.');
INSERT INTO tool.classes VALUES (4, 'Health Class', 10, 8, 'We talk about sex and stuff.');
INSERT INTO tool.classes VALUES (5, 'Meditation', 11, 11, 'We meditate, stop asking questions.');
INSERT INTO tool.classes VALUES (6, 'Greek Tragedies', 2, 8, 'We talk about Antigone a lot.');
INSERT INTO tool.classes VALUES (7, 'JavaScript 101', 4, 10, 'We talk about the web and stuff.');
INSERT INTO tool.classes VALUES (8, 'Dangerous Insects', 8, 3, 'We talk about mosquitoes and stuff.');
INSERT INTO tool.classes VALUES (9, 'First Aid', 8, 2, 'We talk about mending wounds and stuff.');
INSERT INTO tool.classes VALUES (10, 'Overcoming Anxiety', 8, 4, 'We talk about breathing techniques and stuff.');
INSERT INTO tool.classes VALUES (11, 'How to Overcome a Crisis', 11, 11, 'We talk about resilience and stuff.');
INSERT INTO tool.classes VALUES (12, 'Declassified CIA Documents', 2, 8, 'We talk about conspiracies and stuff.');
INSERT INTO tool.classes VALUES (13, 'Mending Relationships', 10, 9, 'We talk about forgiveness and stuff.');
INSERT INTO tool.classes VALUES (14, 'IT 101', 4, 7, 'We talk about computers and stuff.');
INSERT INTO tool.classes VALUES (15, 'Databases', 5, 6, 'We talk about SQL and noSQL but not much else.');
INSERT INTO tool.classes VALUES (16, 'Web Architecture', 4, 8, 'We talk about island architecture and stuff.');
INSERT INTO tool.classes VALUES (17, 'How to be Present', 3, 11, 'We talk about reconnecting to the world and stuff.');
INSERT INTO tool.classes VALUES (18, 'The Science of Sleep', 6, 10, 'We talk about sleep and stuff.');
INSERT INTO tool.classes VALUES (19, 'Nutrition 101', 2, 8, 'We talk about cookies and stuff.');
INSERT INTO tool.classes VALUES (20, 'How to Cope with Grief', 11, 11, 'We help you handle loss.');
INSERT INTO tool.classes VALUES (21, 'Survival 101', 6, 8, 'We talk about hostile nature and stuff.');
INSERT INTO tool.classes VALUES (22, 'Navigation', 6, 8, 'We talk about maps and stuff.');
INSERT INTO tool.classes VALUES (23, 'Defense Against the Dark Arts', 10, 9, 'We talk about cars and stuff.');
INSERT INTO tool.classes VALUES (24, 'The Science of Addiction', 11, 11, 'We talk about alcohol and drugs.');
INSERT INTO tool.classes VALUES (25, 'Carpentry', 4, 7, 'We talk about birdhouses and stuff.');
INSERT INTO tool.classes VALUES (26, 'Electronics 101', 10, 8, 'We talk about transistors and stuff.');
INSERT INTO tool.classes VALUES (27, 'Robotics', 10, 8, 'We talk about robots and stuff.');
INSERT INTO tool.classes VALUES (28, 'Building Games with C++', 5, 6, 'We talk about Blizzard and stuff.');
INSERT INTO tool.classes VALUES (29, 'Mythical Creatures', 5, 5, 'We talk about dragons and stuff.');
INSERT INTO tool.classes VALUES (30, 'Chemical Reactions', 5, 5, 'We talk about bunson burners and stuff.');
INSERT INTO tool.classes VALUES (31, 'Organic Chemistry', 8, 4, 'We talk about caffeine and stuff.');
INSERT INTO tool.classes VALUES (32, 'How to Save Money', 4, 10, 'We talk about 401ks and it is boring but important.');
INSERT INTO tool.classes VALUES (33, 'How to Start a Business', 3, 12, 'We talk about LLCs.');

INSERT INTO tool.class_assignments VALUES (4, 2, 3, 30, NOW());
INSERT INTO tool.class_assignments VALUES (5, 2, 2, 20, NOW());
INSERT INTO tool.class_assignments VALUES (6, 2, 3, 25, NOW());