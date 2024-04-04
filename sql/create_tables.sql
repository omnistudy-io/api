-- create_tables.sql
--
-- Create all tables in the MySQL DB
-- This is a rough draft of the schema and will be updated as the project progresses
--    Diagram: https://dbdiagram.io/d/OmniStudy-DB-Model-65f87f81ae072629ce51e8e8
--
-- Author: Jamison Grudem
-- Date: 2023-03-20

CREATE TABLE users (
  id integer AUTO_INCREMENT,
  token varchar(100) NOT NULL DEFAULT UUID(),
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

CREATE TABLE plans (
  id integer,
  level integer,
  name varchar(100),
  price double,
  PRIMARY KEY (id, level)
);

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

CREATE TABLE courses (
  id integer AUTO_INCREMENT,
  user_id integer,
  title varchar(200),
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
  FOREIGN KEY (course_id) REFERENCES courses(id),
  FOREIGN KEY (assignment_id) REFERENCES assignments(id),
  FOREIGN KEY (exam_id) REFERENCES exams(id)
);

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

CREATE TABLE textbook_authors (
  id integer AUTO_INCREMENT,
  textbook_id integer,
  author varchar(150),
  PRIMARY KEY (id),
  FOREIGN KEY (textbook_id) REFERENCES textbooks(id) ON DELETE CASCADE
);

CREATE TABLE textbook_subjects (
  id integer AUTO_INCREMENT,
  textbook_id integer,
  subject varchar(200),
  PRIMARY KEY (id),
  FOREIGN KEY (textbook_id) REFERENCES textbooks(id) ON DELETE CASCADE
);

CREATE TABLE textbook_sections (
  id integer AUTO_INCREMENT,
  textbook_id integer,
  title varchar(150),
  content_url varchar(1000),
  section_id integer,
  PRIMARY KEY (id),
  FOREIGN KEY (textbook_id) REFERENCES textbooks(id) ON DELETE CASCADE
);

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

CREATE TABLE user_study_sets (
  id integer AUTO_INCREMENT,
  user_id integer,
  title varchar(100),
  num_questions integer,
  created_at datetime,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_study_set_questions (
  id integer AUTO_INCREMENT,
  study_set_id integer,
  type varchar(7),
  question varchar(500),
  answer varchar(100),
  PRIMARY KEY (id),
  FOREIGN KEY (study_set_id) REFERENCES user_study_sets(id) ON DELETE CASCADE
);

CREATE TABLE user_summarizations (
  id integer AUTO_INCREMENT,
  user_id integer,
  title varchar(150),
  content varchar(1000),
  created_at datetime,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_chats (
  id integer AUTO_INCREMENT,
  user_id integer,
  content varchar(2000),
  created_at datetime,
  user_sent bool,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

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
