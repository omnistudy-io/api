--
-- Clear the database and create a new one
--
DROP DATABASE IF EXISTS omnistudy;
CREATE DATABASE omnistudy;
USE omnistudy;


--
-- Create all tables in the database
-- 
-- Users table
CREATE TABLE users (
  id integer AUTO_INCREMENT,
  api_key varchar(100) NOT NULL,
  first_name varchar(150),
  last_name varchar(150),
  name varchar(300),
  username varchar(25) NOT NULL DEFAULT '',
  email varchar(100) NOT NULL,
  password varchar(100),
  phone varchar(15),
  created_at datetime NOT NULL DEFAULT NOW(),
  online bool,
  PRIMARY KEY (id),
  UNIQUE (username),
  UNIQUE (email)
);

-- Plans table
CREATE TABLE plans (
  id integer,
  level integer,
  name varchar(100),
  price double,
  monthly_price double,
  annual_price double,
  monthly_price_id varchar(100),
  annual_price_id varchar(100),
  description varchar(100),
  PRIMARY KEY (id, level)
);

-- Plan features table
CREATE TABLE plan_features (
    id integer AUTO_INCREMENT,
    plan_id integer,
    description varchar(150),
    tag varchar(50),
    included boolean,
    PRIMARY KEY (id),
    FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
);

-- User plans table
CREATE TABLE user_plans (
  id integer AUTO_INCREMENT,
  user_id integer,
  plan_id integer,
  stripe_id integer,
  active bool,
  start_date datetime,
  renew_date datetime,
  total_spent double,
  PRIMARY KEY (id, user_id),
  UNIQUE (stripe_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, 
  FOREIGN KEY (plan_id) REFERENCES plans(id)
);

-- User profiles table
CREATE TABLE user_profiles (
  id integer AUTO_INCREMENT,
  user_id integer,
  address1 varchar(200),
  address2 varchar(200),
  city varchar(200),
  state varchar(100),
  country varchar(200),
  zip varchar(6),
  school varchar(200),
  year varchar(100),
  image_url varchar(1000),
  bio varchar(1500),
  birth_month integer,
  birth_date integer,
  birth_year integer,
  age integer,
  PRIMARY KEY (id, user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Courses table
CREATE TABLE courses (
  id integer AUTO_INCREMENT,
  user_id integer,
  title varchar(200),
  description varchar(1000),
  subject varchar(10),
  number varchar(10),
  professor varchar(150),
  building varchar(100),
  room varchar(20),
  color varchar(10),
  thumbnail_url varchar(1000),
  start_date datetime,
  end_date datetime,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Assignments table
CREATE TABLE assignments (
  id integer AUTO_INCREMENT,
  course_id integer,
  title varchar(100),
  description varchar(1000),
  progress double,
  created_at datetime,
  due_at datetime,
  actual_points double,
  possible_points double,
  weight double,
  PRIMARY KEY (id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Exams table
CREATE TABLE exams (
  id integer AUTO_INCREMENT,
  course_id integer,
  title varchar(100),
  description varchar(1000),
  building varchar(100),
  room varchar(20),
  seat varchar(20),
  date date,
  start_time timestamp,
  end_time timestamp,
  actual_points double,
  possible_points double,
  weight double,
  PRIMARY KEY (id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Documents table
CREATE TABLE documents (
  id integer AUTO_INCREMENT,
  user_id integer,
  course_id integer,
  assignment_id integer,
  exam_id integer,
  title varchar(100),
  ext varchar(10),
  url varchar(1000),
  ext_icon_url varchar(1000),
  is_note bool,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL,
  FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE SET NULL,
  FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE SET NULL
);

-- Textbooks table
CREATE TABLE textbooks (
  id integer AUTO_INCREMENT,
  course_id integer,
  title varchar(250),
  title_long varchar(1000),
  isbn varchar(25),
  isbn13 varchar(25),
  publisher varchar(100),
  pages integer,
  image varchar(1000),
  PRIMARY KEY (id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Textbook authors table
CREATE TABLE textbook_authors (
  id integer AUTO_INCREMENT,
  textbook_id integer,
  author varchar(150),
  PRIMARY KEY (id),
  FOREIGN KEY (textbook_id) REFERENCES textbooks(id) ON DELETE CASCADE
);

-- Textbook subjects
CREATE TABLE textbook_subjects (
  id integer AUTO_INCREMENT,
  textbook_id integer,
  subject varchar(200),
  PRIMARY KEY (id),
  FOREIGN KEY (textbook_id) REFERENCES textbooks(id) ON DELETE CASCADE
);

-- Textbook sections
CREATE TABLE textbook_sections (
  id integer AUTO_INCREMENT,
  textbook_id integer,
  title varchar(150),
  content_url varchar(1000),
  section_id integer,
  PRIMARY KEY (id),
  FOREIGN KEY (textbook_id) REFERENCES textbooks(id) ON DELETE CASCADE
);

-- Course events table
CREATE TABLE course_events (
  id integer AUTO_INCREMENT,
  course_id integer,
  title varchar(50),
  date date,
  start_time timestamp,
  end_time timestamp,
  length double,
  type varchar(20),
  PRIMARY KEY (id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Forums table
CREATE TABLE forums (
  id integer AUTO_INCREMENT,
  name varchar(200),
  tag_id varchar(100),
  thumbnail_url varchar(1000),
  user_count integer,
  users_online integer,
  post_count integer,
  comment_count integer,
  score integer,
  created_at datetime DEFAULT NOW(),
  PRIMARY KEY (id),
  UNIQUE (name),
  UNIQUE (tag_id)
);

-- Forum users table
CREATE TABLE forum_users (
  id integer AUTO_INCREMENT,
  user_id integer,
  forum_id integer,
  joined_at datetime,
  post_count integer,
  comment_count integer,
  founder bool,
  admin bool,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (forum_id) REFERENCES forums(id) ON DELETE CASCADE
);

-- Forum posts table
CREATE TABLE forum_posts (
  id integer AUTO_INCREMENT,
  title varchar(500),
  user_id integer,
  forum_id integer,
  content varchar(7500),
  likes integer,
  dislikes integer,
  PRIMARY KEY (id, title),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (forum_id) REFERENCES forums(id) ON DELETE CASCADE
);

-- Forum comments table
CREATE TABLE forum_comments (
  id integer AUTO_INCREMENT,
  user_id integer,
  forum_id integer,
  post_id integer,
  parent_id integer,
  content varchar(5000),
  likes integer,
  dislikes integer,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (forum_id) REFERENCES forums(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES forum_comments(id) ON DELETE CASCADE
);

-- User study sets table
CREATE TABLE user_study_sets (
  id integer AUTO_INCREMENT,
  user_id integer,
  title varchar(100),
  description varchar(500),
  num_questions integer,
  created_at datetime,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User study set questions
CREATE TABLE user_study_set_questions (
  id integer AUTO_INCREMENT,
  study_set_id integer,
  type varchar(7),
  question varchar(500),
  answer varchar(100),
  PRIMARY KEY (id),
  FOREIGN KEY (study_set_id) REFERENCES user_study_sets(id) ON DELETE CASCADE
);

-- User summarizations table
CREATE TABLE user_summarizations (
  id integer AUTO_INCREMENT,
  user_id integer,
  title varchar(150),
  content varchar(1000),
  created_at datetime,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- (Assignment) Chats table
CREATE TABLE chats (
  id integer AUTO_INCREMENT,
  title varchar(150),
  user_id integer,
  assignment_id integer,
  document_id integer,
  created_at datetime,
  saved bool,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE SET NULL
);

-- (Assignment) Chat messages table
CREATE TABLE chat_messages (
  id integer AUTO_INCREMENT,
  chat_id integer,
  user_id integer,
  content varchar(5000),
  created_at datetime,
  from_user bool,
  PRIMARY KEY (id),
  FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User AI documents table
CREATE TABLE user_ai_docs (
  id integer AUTO_INCREMENT,
  user_study_set_id integer,
  user_summarization_id integer,
  user_chat_id integer,
  document_id integer,
  PRIMARY KEY (id),
  FOREIGN KEY (user_study_set_id) REFERENCES user_study_sets(id),
  FOREIGN KEY (user_summarization_id) REFERENCES user_summarizations(id),
  FOREIGN KEY (user_chat_id) REFERENCES user_chats(id),
  FOREIGN KEY (document_id) REFERENCES documents(id)
);


--
-- Insert data into the tables
--
-- Create the plans and plan features
insert into plans values (1, 1, 'Free', 0.0, 0.0, 0.0, '', '', 'Free plan with limited features');
insert into plan_features values(null, 1, 'Course & Assignment Planning', 'planner', true);
insert into plan_features values(null, 1, 'Online Note Taker & Transcription', 'notes', true);
insert into plan_features values(null, 1, 'Question Generation', 'qgen', false);
insert into plan_features values(null, 1, 'Document Summarization', 'summ', false);
insert into plans values (2, 2, 'OmniStudy', 11.99, 11.99, 9.99, 'price_1PDbkRDapKE0mGmXzA9AjgMX', 'price_1PDbkgDapKE0mGmXdY8eJKMx', 'Our most popular plan');
insert into plan_features values(null, 2, 'Course & Assignment Planning', 'planner', true);
insert into plan_features values(null, 2, 'Online Note Taker & Transcription', 'notes', true);
insert into plan_features values(null, 2, 'Question Generation', 'qgen', true);
insert into plan_features values(null, 2, 'Document Summarization', 'summ', false);
insert into plans values (3, 3, 'Advanced', 21.99, 21.99, 19.99, 'price_1PDdQUDapKE0mGmXZmpQAW7M', 'price_1PDdR1DapKE0mGmXaCXjGlrd', 'Advanced plan with all features');
insert into plan_features values(null, 3, 'Course & Assignment Planning', 'planner', true);
insert into plan_features values(null, 3, 'Online Note Taker & Transcription', 'notes', true);
insert into plan_features values(null, 3, 'Question Generation', 'qgen', true);
insert into plan_features values(null, 3, 'Document Summarization', 'summ', true);
-- Create a user
insert into users values (null, UUID(), 'Dev', 'User', 'Dev User', 'dev', 'dev@localhost', '$2b$10$bqjXk8idtUq/9zCm2IszeOO2qZwQFRFY3u5IxpKcaFjuXIY4.y8i2', '(763) 370-0010', NOW(), false);
insert into users values (null, UUID(), 'John', 'Appleseed', 'John Appleseed', 'john', 'john@localhost', '$2b$10$bqjXk8idtUq/9zCm2IszeOO2qZwQFRFY3u5IxpKcaFjuXIY4.y8i2', '(763) 370-0010', NOW(), false);
-- Create a user plan
insert into user_plans values (null, 1, 1, 0, true, NOW(), NOW(), 0);
insert into user_plans values (null, 2, 2, 0, true, NOW(), NOW(), 0);
-- Create a user profile
insert into user_profiles values (null, 1, '1234 Avenue Street', 'Suite 250', 'Minneapolis', 'MN', 'USA', '55401', 'University of Minnesota - Twin Cities', 'Sophomore', 'https://eulyx.com/images/headshot.jpg', 'Passionate web developer', 1, 1, 2004, 20);
insert into user_profiles values (null, 2, '1234 Avenue Street', 'Suite 250', 'Minneapolis', 'MN', 'USA', '55401', 'University of Minnesota - Twin Cities', 'Sophomore', 'https://eulyx.com/images/headshot.jpg', 'Passionate web developer', 1, 1, 2004, 20);
-- Create a course
insert into courses values (null, 1, 'Web Programming', '', 'CSCI', '4131', 'Dan Challou', 'Anderson Hall', 'Room 370', '#FF0000', 'https://cse.umn.edu/sites/cse.umn.edu/files/Challou_Dan_1.jpg', '2024-01-01', '2024-05-01');
insert into courses values (null, 1, 'Distributed Systems', '', 'CSCI', '5105', 'Anand Tripathi', 'Keller Hall', 'Room 3-210', '#FF0000', 'https://cse.umn.edu/sites/cse.umn.edu/files/styles/webp_scaled/public/090623umncse095ret.jpg.webp?itok=kzVpMiHd', '2024-01-01', '2024-05-01');
insert into courses values (null, 1, 'Software Engineering', '', 'CSCI', '5801', 'Dan Knights', 'Smith Hall', 'Room 100', '#FF0000', 'https://tangledlilac.com/wp-content/uploads/2021/05/Flagstaff-Sedona-Real-Estate-Photographer_1025-1-683x1024.jpg', '2024-01-01', '2024-05-01');
insert into courses values (null, 1, 'Computer Networks', '', 'CSCI', '4601', 'Zhi-Li Zhang', 'Tate Hall', 'Room 105', '#FF0000', 'https://www.auburn.edu/academic/cosam/faculty/math_stats/zheng/headshot.jpg', '2024-01-01', '2024-05-01');
-- Create a couple assignments for that course
insert into assignments values (null, 1, 'Homework 7', 'Create a website from scratch', 0.0, NOW(), '2024-04-12', 96.0, 100.0, 0.2);
insert into assignments values (null, 1, 'Homework 8', 'Create a Node.js app from scratch', 0.0, NOW(), '2024-05-30', 88.0, 100.0, 0.2);
insert into assignments values (null, 2, 'Programming Assignment 1', 'Create a mock bank server using Java RMI', 0.0, NOW(), '2024-06-12', 72.0, 100.0, 0.2);
insert into assignments values (null, 2, 'Programming Assignment 2', 'Create a serverless bank client using Java RMI and multithreading', 0.0, NOW(), '2024-04-30', 88.0, 100.0, 0.2);
insert into assignments values (null, 2, 'Programming Assignment 3', 'Create a distributed hash table using the Chord protocol and Java RMI', 0.0, NOW(), '2024-05-12', 77.0, 100.0, 0.2);
insert into assignments values (null, 3, 'Software Design Project', 'Design a software system for a local business', 0.0, NOW(), '2024-05-18', 91.5, 100.0, 0.2);
insert into assignments values (null, 3, 'Software Implementation Project', 'Implement the software system designed in the previous assignment', 0.0, NOW(), '2024-06-02', 88.0, 100.0, 0.2);
insert into assignments values (null, 4, 'TCP Layer', 'Implement a TCP layer in C', 0.0, NOW(), '2024-05-29', 90.0, 100.0, 0.2);
insert into assignments values (null, 4, 'UDP Layer', 'Implement a UDP layer in C', 0.0, NOW(), '2024-05-18', 100.0, 100.0, 0.2);
-- Create a couple exams for that course
insert into exams values (null, 1, 'Midterm', 'Midterm exam', 'Anderson Hall', 'Room 370', 'Seat 1', '2024-04-01', '2024-04-01 08:00:00', '2024-04-01 09:00:00', 92.0, 100.0, 0.3);
insert into exams values (null, 1, 'Final', 'Final exam', 'Anderson Hall', 'Room 370', 'Seat 1', '2024-05-01', '2024-05-01 08:00:00', '2024-05-01 09:00:00', 92.0, 100.0, 0.3);
insert into exams values (null, 2, 'Midterm', 'Midterm exam', 'Keller Hall', 'Room 3-210', 'Seat 1', '2024-04-12', '2024-04-12 08:00:00', '2024-04-12 09:00:00', 92.0, 100.0, 0.3);
insert into exams values (null, 2, 'Final', 'Final exam', 'Keller Hall', 'Room 3-210', 'Seat 1', '2024-05-07', '2024-05-07 08:00:00', '2024-05-07 09:00:00', 92.0, 100.0, 0.3);
insert into exams values (null, 3, 'Midterm', 'Midterm exam', 'Smith Hall', 'Room 100', 'Seat 1', '2024-03-29', '2024-03-29 08:00:00', '2024-03-29 09:00:00', 92.0, 100.0, 0.3);
insert into exams values (null, 3, 'Final', 'Final exam', 'Smith Hall', 'Room 100', 'Seat 1', '2024-04-20', '2024-04-20 08:00:00', '2024-04-20 09:00:00', 92.0, 100.0, 0.3);
insert into exams values (null, 4, 'Midterm', 'Midterm exam', 'Tate Hall', 'Room 105', 'Seat 1', '2024-05-08', '2024-05-08 08:00:00', '2024-05-08 09:00:00', 92.0, 100.0, 0.3);
insert into exams values (null, 4, 'Final', 'Final exam', 'Tate Hall', 'Room 105', 'Seat 1', '2024-06-02', '2024-06-02 08:00:00', '2024-06-02 09:00:00', 92.0, 100.0, 0.3);
-- Create some documents
insert into documents values (null, 1, 1, 1, 1, '5802 Tech Talk.pdf', 'pdf', 'https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/5802 Tech Talk.pdf', null, false);
insert into documents values (null, 1, 1, 2, 2, 'Final Write Up.pdf', 'pdf', 'https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Final Write Up.pdf', null, false);
insert into documents values (null, 1, 2, 3, 4, 'INET 3102 Reflection 6.pdf', 'pdf', 'https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/INET 3102 Reflection 6.pdf', null, false);
insert into documents values (null, 1, 2, 5, 4, 'Lab 5 Group Work.pdf', 'pdf', 'https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Lab 5 Group Work.pdf', null, false);
insert into documents values (null, 1, 3, 6, 6, 'Note Apr 8, 2024.pdf', 'pdf', 'https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Note Apr 8, 2024.pdf', null, false);
insert into documents values (null, 1, 4, 9, 7, 'Summary Financial Projections - Financials (1).pdf', 'pdf', 'https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Summary Financial Projections - Financials (1).pdf', null, false);
-- Create a study set
insert into user_study_sets values (null, 1, 'Web Programming Questions', 'Study set for the Web Programming course', 10, NOW());
insert into user_study_sets values (null, 1, 'Distributed Systems Questions', 'Study set for the Distributed Systems course', 10, NOW());
-- Create some questions for that study set
insert into user_study_set_questions values (null, 1, 'MCQ', 'What is Node.js?', 'A JavaScript runtime built on the Chrome V8 JavaScript engine');
insert into user_study_set_questions values (null, 1, 'MCQ', 'What is Express.js?', 'A web application framework for Node.js');
insert into user_study_set_questions values (null, 1, 'MCQ', 'What is React?', 'A JavaScript library for building user interfaces');
insert into user_study_set_questions values (null, 1, 'MCQ', 'What is Redux?', 'A predictable state container for JavaScript apps');
insert into user_study_set_questions values (null, 1, 'MCQ', 'What is MongoDB?', 'A cross-platform document-oriented database program');
insert into user_study_set_questions values (null, 2, 'MCQ', 'What is Java RMI?', 'Java Remote Method Invocation');
insert into user_study_set_questions values (null, 2, 'MCQ', 'What is a distributed system?', 'A system whose components are located on different networked computers');
insert into user_study_set_questions values (null, 2, 'MCQ', 'What is a distributed hash table?', 'A distributed system that provides a lookup service similar to a hash table');
insert into user_study_set_questions values (null, 2, 'MCQ', 'What is the Chord protocol?', 'A protocol and algorithm for a peer-to-peer distributed hash table');


--