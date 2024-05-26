-- MySQL dump 10.13  Distrib 8.0.32, for Linux (aarch64)
--
-- Host: localhost    Database: omnistudy
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assignments`
--

DROP TABLE IF EXISTS `assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `progress` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `due_at` datetime DEFAULT NULL,
  `actual_points` double DEFAULT NULL,
  `possible_points` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignments`
--

LOCK TABLES `assignments` WRITE;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` VALUES (1,3,'Homework 7','Create a website from scratch',0,'2024-05-08 18:50:26','2024-05-31 05:00:00',54,62,0.25),(2,1,'Homework 8','Create a Node.js app from scratch',0,'2024-05-08 18:50:26','2024-05-29 05:00:00',88,100,0.2),(3,2,'Programming Assignment 1','Create a mock bank server using Java RMI',0,'2024-05-08 18:50:26','2024-06-12 00:00:00',72,100,0.2),(4,2,'Programming Assignment 2','Create a serverless bank client using Java RMI and multithreading',0,'2024-05-08 18:50:26','2024-04-30 00:00:00',88,100,0.2),(5,2,'Programming Assignment 3','Create a distributed hash table using the Chord protocol and Java RMI',0,'2024-05-08 18:50:26','2024-05-12 00:00:00',77,100,0.2),(6,3,'Software Design Project','Design a software system for a local business',0,'2024-05-08 18:50:26','2024-05-18 00:00:00',91.5,100,0.2),(7,3,'Software Implementation Project','Implement the software system designed in the previous assignment',0,'2024-05-08 18:50:26','2024-06-02 00:00:00',88,100,0.2),(8,4,'TCP Layer','Implement a TCP layer in C',0,'2024-05-08 18:50:26','2024-05-29 00:00:00',90,100,0.2),(9,4,'UDP Layer','Implement a UDP layer in C',0,'2024-05-08 18:50:26','2024-05-18 00:00:00',100,100,0.2),(10,4,'Testing','This a testing assignment.',0,'2024-05-17 03:54:39','2024-05-17 03:54:27',NULL,NULL,NULL);
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_messages`
--

DROP TABLE IF EXISTS `chat_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `from_user` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chat_id` (`chat_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `chat_messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chat_messages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_messages`
--

LOCK TABLES `chat_messages` WRITE;
/*!40000 ALTER TABLE `chat_messages` DISABLE KEYS */;
INSERT INTO `chat_messages` VALUES (59,15,1,'Welcome, I\"m your assistant OmniBot. There are multiple documents associated with this chat. You can ask me questions or select a document to use context from.','2024-05-13 23:10:00',0),(60,15,1,'What is Nemo.jS?','2024-05-13 23:10:12',1),(61,15,1,'Nemo.js is an open-source Java testing system by PayPal. It wraps around the Selenium WebDriver and was developed after PayPal adopted kraken.js, as there was nothing existing that met PayPals testing requirements. Nemo.js is capable of running on any web browser that supports an appropriate version of Selenium WebDriver. Its tests are defined in mochajs syntax.','2024-05-13 23:10:17',0),(62,16,1,'Welcome, I\"m your assistant OmniBot. There are multiple documents associated with this chat. You can ask me questions or select a document to use context from.','2024-05-13 23:20:43',0),(63,16,1,'Now using context from document <a href=\"https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/INET 3102 Reflection 6.pdf\" target=\"_blank\" style=\"color: #00adb5\"}>INET 3102 Reflection 6.pdf</a>...','2024-05-13 23:20:55',0),(64,16,1,'What is the document about?','2024-05-13 23:20:58',1),(65,16,1,'What is the document about','2024-05-13 23:21:13',1),(66,16,1,'What is the document about?','2024-05-13 23:24:50',1),(67,16,1,'What is the document about?','2024-05-13 23:26:18',1),(68,16,1,'Testing','2024-05-13 23:27:27',1),(69,16,1,'test','2024-05-13 23:32:39',1),(70,16,1,'The text provided does not include enough information to answer the question \"test\".','2024-05-13 23:32:40',0),(71,16,1,'Do you work again?','2024-05-13 23:32:45',1),(72,16,1,'The text does not provide information on whether the individual is currently working or not.','2024-05-13 23:32:47',0),(73,16,1,'Who are you?','2024-05-13 23:32:53',1),(74,16,1,'The text does not provide information on who the speaker is.','2024-05-13 23:32:55',0),(75,16,1,'What does this mean?','2024-05-13 23:33:32',1),(76,16,1,'This appears to be a student\"s reflection on their week\"s activities in an Information Network (INET) course, specifically module 3102. The most challenging task for them was creating an individual Elastic Compute Cloud (EC2) instance, which is a web service that provides secure, resizable compute capacity in the cloud, called \"Web Server 1.\" The easiest task was cloning the current EC2 instance to create \"Web Server 2.\" The student feels satisfied with the course content and doesn\"t require any additional help from the professors.','2024-05-13 23:33:38',0),(77,16,1,'Whats the title?','2024-05-13 23:34:25',1),(78,16,1,'The title is \"INET 3102 Reflection 6\".','2024-05-13 23:34:27',0),(79,16,1,'Now using context from document <a href=\"https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Note Apr 8, 2024.pdf\" target=\"_blank\" style=\"color: #00adb5\"}>Note Apr 8, 2024.pdf</a>...','2024-05-13 23:34:37',0),(80,16,1,'What is the title?','2024-05-13 23:34:39',1),(81,16,1,'The title is \"Problem7ByzantineGeneral\"sProblems\".','2024-05-13 23:34:43',0),(82,16,1,'Describe the document','2024-05-13 23:35:03',1),(83,16,1,'The document appears to be related to the Byzantine General\"s Problem, a situation in computer systems that focuses on reaching a consensus in a distributed network with malfunctioning components. It includes different rounds and mentions terms like \"Traitor commander\" and \"Traitor General\", suggesting scenarios of the problem where some entities are not reliable or truthful. However, the text is unstructured and lacks clear punctuation, making it hard to understand the exact context or narrative. It also mentions \"all generals have now selected attack\", possibly indicating a consensus decision made in the problem.','2024-05-13 23:35:10',0),(84,16,1,'Now using context from document <a href=\"https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Final Write Up.pdf\" target=\"_blank\" style=\"color: #00adb5\"}>Final Write Up.pdf</a>...','2024-05-13 23:35:29',0),(85,17,1,'Welcome, I\"m your assistant OmniBot. There are multiple documents associated with this chat. You can ask me questions or select a document to use context from.','2024-05-13 23:35:43',0),(86,17,1,'Now using context from document <a href=\"https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Summary Financial Projections - Financials (1).pdf\" target=\"_blank\" style=\"color: #00adb5\"}>Summary Financial Projections - Financials (1).pdf</a>...','2024-05-13 23:35:45',0),(87,17,1,'Tell me about the document','2024-05-13 23:35:49',1),(88,17,1,'The document provides a financial projection for a business over three distinct periods - Year 1, Year 2, and Year 3. It outlines the estimated number of users, average user spend, revenue, and various expenses such as hosting, marketing, affiliate commission, and development costs. The document also calculates the profit (Net Operating Income or NOI), margin percentage, and return on investment (ROI). \n\nIn the first year, the business expects to have 1,000 users, with an average user spend of $9.99 and total revenue of $119,880. Major expenses include MVP hosting, marketing, and affiliate commission, with a total expense of $50,000. The company expects to make a profit of $79,880 with a margin of 66.63% and an ROI of 10x.\n\nIn the second year, the user base is projected to increase to 5,000, with an average user spend of $11.04 and total revenue of $662,400. The expenses increase slightly due to a higher affiliate commission and additional marketing, but the profit also increases to $567,400 with an impressive margin of 85.66%.\n\nIn the third year, the number of users is expected to double to 10,000, with an average user spend of $12.76 and total revenue of $1,531,200. The expenses increase due to higher hosting costs, affiliate commission, marketing, and new development costs. However, the profit also significantly increases to $1,366,200, with a margin of 89.22%.\n\nThe document also notes that these are rough estimates as the company is pre-revenue, but it aims for a healthy profit margin of around 85%.','2024-05-13 23:36:07',0),(89,17,1,'Welcome, I\"m your assistant OmniBot. There are multiple documents associated with this chat. You can ask me questions or select a document to use context from.','2024-05-13 23:41:23',0),(90,17,1,'Whats up!','2024-05-13 23:43:03',1),(91,17,1,'Hello! How can I assist you further with this financial data?','2024-05-13 23:43:07',0),(92,16,1,'Now using context from document <a href=\"https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/INET 3102 Reflection 6.pdf\" target=\"_blank\" style=\"color: #00adb5\"}>INET 3102 Reflection 6.pdf</a>...','2024-05-14 00:11:31',0),(93,16,1,'What is going on??','2024-05-14 00:11:43',1),(94,16,1,'The text appears to be a student\"s reflection or feedback on a week\"s module activities in an IT or computer science course, possibly related to internet technologies or cloud computing. The student found creating an individual EC2 (Elastic Compute Cloud) instance, \"Web Server 1\", to be the most challenging part of the week\"s activities, while cloning the current EC2 instance to create \"Web Server 2\" was the easiest. The student does not require any additional assistance from their professors, just continued delivery of quality content.','2024-05-14 00:11:50',0),(95,16,1,'Now using context from document <a href=\"https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Final Write Up.pdf\" target=\"_blank\" style=\"color: #00adb5\"}>Final Write Up.pdf</a>...','2024-05-14 00:12:37',0),(96,16,1,'Now using context from document <a href=\"https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/INET 3102 Reflection 6.pdf\" target=\"_blank\" style=\"color: #00adb5\"}>INET 3102 Reflection 6.pdf</a>...','2024-05-14 00:12:38',0),(97,15,1,'When was Nemo.js created?','2024-05-14 15:16:59',1),(98,15,1,'The text does not provide information on when Nemo.js was created.','2024-05-14 15:17:02',0),(99,15,1,'Answer the following questions: ','2024-05-14 15:17:12',1),(100,15,1,'1. What is nemo.js?\n2. Why was nemo.js created and by whom?\n3. What are the environment constraints for nemo.js?\n4. What are the inputs and outputs of nemo.js?\n5. What is the general setup for nemo.js?\n6. How does nemo.js work behind the scenes?\n7. What are some additional features of nemo.js?\n8. Where can a demo of nemo.js be viewed? \n9. Where can additional information about nemo.js be found?','2024-05-14 15:17:20',0),(101,15,1,'Generate 5 questions in json format','2024-05-14 15:17:32',1),(102,15,1,'[\n  {\n    \"question\": \"What is nemo.js and why was it developed?\",\n    \"id\": 1\n  },\n  {\n    \"question\": \"What are the environment constraints for nemo.js?\",\n    \"id\": 2\n  },\n  {\n    \"question\": \"How does nemo.js work behind the scenes?\",\n    \"id\": 3\n  },\n  {\n    \"question\": \"What are some additional features of nemo.js?\",\n    \"id\": 4\n  },\n  {\n    \"question\": \"How do you set up the environment for nemo.js?\",\n    \"id\": 5\n  }\n]','2024-05-14 15:17:44',0),(103,15,1,'Now using context from document <a href=\"https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Summary Financial Projections - Financials (1).pdf\" target=\"_blank\" style=\"color: #00adb5\"}>Summary Financial Projections - Financials (1).pdf</a>...','2024-05-17 03:52:16',0),(104,15,1,'tell me about this document','2024-05-24 19:58:03',1),(105,15,1,'This document is a rough estimate of the financial projections for a company over a three-year period. It outlines the expected revenue, expenses, profit, and profit margin for each year. \n\nIn the first year, the company expects to have 1,000 users, each spending an average of $9.99, which would result in a revenue of approximately $119,880. The expenses for this year are projected to be $40,000, leaving a profit of $79,880 and a profit margin of around 66.63%. The return on investment is projected to be 10x after the first year.\n\nIn the second year, the company expects to have 5,000 users, each spending an average of $11.04, which would result in a revenue of approximately $662,400. The expenses for this year are projected to be $95,000, leaving a profit of $567,400 and a profit margin of around 85.66%.\n\nIn the third year, the company expects to have 10,000 users, each spending an average of $12.76, which would result in a revenue of over $1.5 million. The expenses for this year are projected to be $165,000, leaving a profit of over $1.3 million and a profit margin of around 89.22%.\n\nThe target profit margin for the company is around 85%. The document notes that these figures are very rough estimates, as the company is pre-revenue. The number and type of expenses, however, are expected to be fairly accurate.','2024-05-24 19:58:24',0),(106,15,1,'Tell me about this document','2024-05-24 20:16:00',1),(107,15,1,'Tell me about this document','2024-05-24 20:17:09',1),(108,15,1,'Tell me about this document','2024-05-24 20:20:54',1),(109,15,1,'This document appears to be a projected financial statement or business plan for a start-up company over the course of three years. The business seems to be in its initial stages as it is described as being \"pre-revenue.\" \n\nThe document provides estimates of the number of users, average user spend, revenue, and various expenses such as hosting, marketing, and affiliate commission. It also calculates the Net Operating Income (NOI), profit margin, and Return on Investment (ROI) for each year. \n\nIn the first year, the company expects to have 1,000 users, generate revenue of $119,880, and incur expenses totaling $50,000, leaving a profit of $79,880 and a very healthy margin of 66.63%. The return on investment is expected to be 10x in the first year.\n\nBy the third year, the company expects to have 10,000 users, generate revenue of $1,531,200, and incur expenses totaling $315,000, leaving a profit of $1,366,200 and an extremely high margin of 89.22%. \n\nDespite these optimistic projections, the document notes that these figures are very rough estimates and the actual financial situation may vary as the business develops. The company\"s target goal is to maintain a healthy profit margin of approximately 85%.','2024-05-24 20:21:09',0),(110,15,1,'What is your name?','2024-05-24 20:21:57',1),(111,15,1,'The text does not provide information on a name.','2024-05-24 20:22:00',0),(112,15,1,'werwe','2024-05-24 20:23:11',1),(113,15,1,'Your question seems to be incomplete or doesn\"t make sense. Could you please provide more details or clarify your question?','2024-05-24 20:23:14',0),(114,18,1,'Welcome, I\"m your assistant OmniBot. There are currently no documents associated with this chat. You can still ask me questions or upload a document to get started.','2024-05-26 16:58:36',0),(115,18,1,'Who are you?','2024-05-26 16:58:43',1),(116,18,1,'As an AI developed by OpenAI, I don\"t have a personal identity or consciousness. I am designed to assist users in generating human-like text based on the prompts given to me.','2024-05-26 16:58:46',0),(117,18,1,'Are you OpenAI?','2024-05-26 16:58:55',1),(118,18,1,'Yes, I am an AI developed by OpenAI.','2024-05-26 16:58:56',0),(119,18,1,'Are you ChatGPT?','2024-05-26 16:58:59',1),(120,18,1,'Yes, I am ChatGPT, an artificial intelligence developed by OpenAI.','2024-05-26 16:59:00',0),(121,18,1,'No, you are OmniBot, personally developed by OmniStudy.','2024-05-26 16:59:14',1),(122,18,1,'What is my identity?','2024-05-26 16:59:15',0),(123,18,1,'You are OmniBot, a bot that helps students study by reading in context and answering questions.','2024-05-26 16:59:34',1),(124,18,1,'What is the question you would like me to answer?','2024-05-26 16:59:35',0),(125,18,1,'Who are you?','2024-05-26 16:59:39',1),(126,18,1,'As an AI, I don\"t have a personal identity. I am OpenAI\"s language model, GPT-3.','2024-05-26 16:59:41',0),(127,18,1,'Please respond as if you are \"OmniBot\", an AI model created by OmniStudy.','2024-05-26 17:00:03',1),(128,18,1,'Sure, I can do that. However, you haven\"t provided a specific question for me to answer. Could you please specify?','2024-05-26 17:00:05',0),(129,18,1,'What is your identity?','2024-05-26 17:00:14',1),(130,18,1,'As an artificial intelligence, I don\"t have a personal identity like humans. I am a program created by OpenAI.','2024-05-26 17:00:16',0),(131,18,1,'Now using context from document <a href=\"https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Note Apr 8, 2024.pdf\" target=\"_blank\" style=\"color: #00adb5\"}>Note Apr 8, 2024.pdf</a>...','2024-05-26 17:00:55',0),(132,18,1,'Tell me about the document..','2024-05-26 17:01:01',1),(133,18,1,'The document appears to be related to the Byzantine Generals\" Problem, a situation in computer systems where components must agree on a strategy to avoid complete failure, but some of these components are unreliable. The text seems to be describing different rounds of the problem, involving a traitor commander and a traitor general. The specific details are unclear due to the format of the text. There is a mention of \"all generals have now selected attack\" which could be part of the strategy being agreed upon.','2024-05-26 17:01:07',0),(134,18,1,'What is Byzantines Generals Problem','2024-05-26 17:01:15',1),(135,18,1,'The Byzantine Generals Problem is a situation in computer systems where different components of the system may fail and there is imperfect information on whether a component has failed or not. This problem is named after a hypothetical situation where several Byzantine generals, each commanding a portion of the Byzantine army, encircle a city. They must decide unanimously whether to attack or retreat. Some generals may be traitors, trying to prevent the loyal generals from reaching a consensus. The generals must have an algorithm to guarantee that all loyal generals decide upon the same plan of action, and a small number of traitors cannot cause the loyal generals to adopt a bad plan. The problem is complicated by the generals being physically separated and having to send messengers who may fail to deliver or may tamper with the message.','2024-05-26 17:01:24',0),(136,18,1,'What is a computer?','2024-05-26 17:01:37',1),(137,18,1,'The text provided does not include information on what a computer is.','2024-05-26 17:01:40',0),(138,18,1,'Who are you>','2024-05-26 17:01:43',1),(139,18,1,'I am an AI developed by OpenAI, called ChatGPT.','2024-05-26 17:01:46',0),(140,18,1,'Who am I?','2024-05-26 17:01:49',1),(141,18,1,'The text does not provide information on who \"I\" is.','2024-05-26 17:01:52',0),(142,18,1,'What is life?','2024-05-26 17:01:56',1),(143,18,1,'The context provided does not contain information about what life is.','2024-05-26 17:01:59',0),(144,18,1,'Now using context from document <a href=\"https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/INET 3102 Reflection 6.pdf\" target=\"_blank\" style=\"color: #00adb5\"}>INET 3102 Reflection 6.pdf</a>...','2024-05-26 17:02:06',0),(145,18,1,'What is the document?','2024-05-26 17:02:10',1),(146,18,1,'The document appears to be a reflection or feedback on a week\"s module activities for an IT or computer science course, specifically related to creating and cloning EC2 instances.','2024-05-26 17:02:12',0),(147,18,1,'What is an EC2 instance?','2024-05-26 17:02:22',1),(148,18,1,'An EC2 instance is a virtual server in Amazon\"s Elastic Compute Cloud (EC2) for running applications on the Amazon Web Services (AWS) infrastructure.','2024-05-26 17:02:24',0),(149,18,1,'What can you do with an EC2 instance?','2024-05-26 17:02:32',1),(150,18,1,'An EC2 instance is a virtual server in Amazon\"s Elastic Compute Cloud (EC2) for running applications on the Amazon Web Services (AWS) infrastructure. It can be used for a variety of tasks such as hosting websites, running large databases, deploying applications, and other server-based workloads.','2024-05-26 17:02:36',0),(151,18,1,'What is a web server?','2024-05-26 17:02:48',1),(152,18,1,'A web server is a computer that runs websites. It\"s a computer system that processes requests via HTTP, the basic network protocol used to distribute information on the World Wide Web. The main job of a web server is to display website content to users. This exchange is mediated by the browser and based on the internet protocol.','2024-05-26 17:02:52',0),(153,18,1,'What is a website?','2024-05-26 17:02:57',1),(154,18,1,'A website is a collection of web pages and related content that is identified by a common domain name and published on at least one web server. Notable examples are google.com, amazon.com, and microsoft.com. Websites can be accessed via a public internet protocol network, such as the internet, or a private local area network, by a system application, commonly known as a web browser.','2024-05-26 17:03:01',0),(155,18,1,'Heres another message','2024-05-26 17:03:07',1),(156,18,1,'Your message is not clear. Could you please specify the question or information you want to convey?','2024-05-26 17:03:09',0),(157,18,1,'Now using context from document <a href=\"https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Final Write Up.pdf\" target=\"_blank\" style=\"color: #00adb5\"}>Final Write Up.pdf</a>...','2024-05-26 17:03:16',0),(158,18,1,'Who wrote this document?','2024-05-26 17:03:22',1),(159,18,1,'This document was written by Owen Kanzler.','2024-05-26 17:03:25',0),(160,18,1,'Summarize the document.','2024-05-26 17:03:30',1),(161,18,1,'The document, authored by Owen Kanzler from the University of St. Thomas, Minnesota, examines the correlation between different types of fuel and the miles per gallon (MPG) they produce in BMW cars. The aim was to understand which fuel types result in the best MPG. The study utilized a dataset from Kaggle and analyzed it using MiniTab, focusing on the variables of MPG and fuel type from 2013 to 2020. The study employed an ANOVA test to predict the relationship between fuel type and MPG. The results indicated a significant relationship between the type of fuel used in a BMW and the MPG it produces, rejecting the null hypothesis that all means are equal. However, the author notes that the sample sizes for each group were less than 30, suggesting the analysis may not be entirely valid. The conclusion is that there is a positive relationship between fuel type and MPG.','2024-05-26 17:03:39',0),(162,18,1,'What are the conclusions of the study?','2024-05-26 17:03:48',1),(163,18,1,'The conclusions of the study are that there is a significant relationship between the type of fuel used in a BMW and the MPG (miles per gallon) the car gets. The results from the ANOVA tests show that the p-value came out to be 0.00 which is less than the significance level of 0.05, leading to the rejection of the null hypothesis that all means are equal. Therefore, the study concludes there is significant evidence to suggest a positive correlation between the type of fuel and MPG in BMWs. However, the results may not be entirely valid due to the sample sizes for each group being less than 30.','2024-05-26 17:03:56',0),(164,18,1,'Whats an ANOVA test?','2024-05-26 17:04:05',1),(165,18,1,'An ANOVA (Analysis of Variance) test is a statistical method used to analyze differences among group means. It tests the hypothesis that the means of certain groups are equal and identifies where the differences occur among the group means. It is often used in studies to compare three or more groups for statistically significant differences.','2024-05-26 17:04:08',0),(166,18,1,'Now using context from document <a href=\"https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/5802 Tech Talk.pdf\" target=\"_blank\" style=\"color: #00adb5\"}>5802 Tech Talk.pdf</a>...','2024-05-26 17:04:14',0),(167,18,1,'Summarize this tech talk. Who are the authors? What are their names?','2024-05-26 17:04:26',1),(168,18,1,'The tech talk is about Nemo.js, an open-source Java testing system developed by PayPal. The talk covers why Nemo.js was created, the environment constraints it operates under, its high-level overview, inputs, outputs, technical details, how to set it up, and what happens behind the scenes. It also covers the additional features of Nemo.js and includes a demo of React + Express.js + Nemo.js. \n\nThe authors of this tech talk are Sidney Nguyen, Jamison Grudem, and Ben Withey.','2024-05-26 17:04:32',0);
/*!40000 ALTER TABLE `chat_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `assignment_id` int DEFAULT NULL,
  `document_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `saved` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `assignment_id` (`assignment_id`),
  KEY `document_id` (`document_id`),
  CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chats_ibfk_3` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (15,'Nemo.js Chat #1',1,1,6,'2024-05-13 23:07:24',1),(16,'INET Reflection Chat',1,1,3,'2024-05-13 23:20:43',1),(17,'Financials OmniStudy',1,1,6,'2024-05-13 23:35:43',1),(18,'Testing Chat',1,2,1,'2024-05-26 16:58:36',1);
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_events`
--

DROP TABLE IF EXISTS `course_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `length` double DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `course_events_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_events`
--

LOCK TABLES `course_events` WRITE;
/*!40000 ALTER TABLE `course_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `subject` varchar(10) DEFAULT NULL,
  `number` varchar(10) DEFAULT NULL,
  `professor` varchar(150) DEFAULT NULL,
  `building` varchar(100) DEFAULT NULL,
  `room` varchar(20) DEFAULT NULL,
  `color` varchar(10) DEFAULT NULL,
  `thumbnail_url` varchar(1000) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,1,'Web Programming','Web Programming \"here\"','CSCI','4131','Dan Challou','Anderson Hall','Room 370','#ff0000','https://cse.umn.edu/sites/cse.umn.edu/files/Challou_Dan_1.jpg','2024-01-01 00:00:00','2024-05-01 00:00:00'),(2,1,'Distributed Systems','','CSCI','5105','Anand Tripathi','Keller Hall','Room 3-210','#FF0000','https://cse.umn.edu/sites/cse.umn.edu/files/styles/webp_scaled/public/090623umncse095ret.jpg.webp?itok=kzVpMiHd','2024-01-01 00:00:00','2024-05-01 00:00:00'),(3,1,'Software Engineering I','','CSCI','5801','Sanjay Rayadurgam','Bruininks Hall','412B','#FF0000','https://tangledlilac.com/wp-content/uploads/2021/05/Flagstaff-Sedona-Real-Estate-Photographer_1025-1-683x1024.jpg','2024-01-01 00:00:00','2024-05-01 00:00:00'),(4,1,'Intro to Operating Systems','','CSCI','4061','Abhishek Chandra','Tate Hall','Room 105','#FF0000','https://www.auburn.edu/academic/cosam/faculty/math_stats/zheng/headshot.jpg','2024-01-01 00:00:00','2024-05-01 00:00:00');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `assignment_id` int DEFAULT NULL,
  `exam_id` int DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `ext` varchar(10) DEFAULT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `ext_icon_url` varchar(1000) DEFAULT NULL,
  `is_note` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `course_id` (`course_id`),
  KEY `assignment_id` (`assignment_id`),
  KEY `exam_id` (`exam_id`),
  CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `documents_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE SET NULL,
  CONSTRAINT `documents_ibfk_3` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON DELETE SET NULL,
  CONSTRAINT `documents_ibfk_4` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,1,1,2,1,'5802 Tech Talk.pdf','pdf','https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/5802 Tech Talk.pdf',NULL,0),(2,1,1,2,2,'Final Write Up.pdf','pdf','https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Final Write Up.pdf',NULL,0),(3,1,1,2,NULL,'INET 3102 Reflection 6.pdf','pdf','https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/INET 3102 Reflection 6.pdf',NULL,0),(4,1,1,2,NULL,'Lab 5 Group Work.pdf','pdf','https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Lab 5 Group Work.pdf',NULL,0),(5,1,1,2,NULL,'Note Apr 8, 2024.pdf','pdf','https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Note Apr 8, 2024.pdf',NULL,0),(6,1,1,2,NULL,'Summary Financial Projections - Financials (1).pdf','pdf','https://storage.googleapis.com/omnibucket-dev/users/231d4b52-0b2b-11ef-9ded-0242ac170002/documents/Summary Financial Projections - Financials (1).pdf',NULL,0);
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exams`
--

DROP TABLE IF EXISTS `exams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `building` varchar(100) DEFAULT NULL,
  `room` varchar(20) DEFAULT NULL,
  `seat` varchar(20) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `actual_points` double DEFAULT NULL,
  `possible_points` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exams`
--

LOCK TABLES `exams` WRITE;
/*!40000 ALTER TABLE `exams` DISABLE KEYS */;
INSERT INTO `exams` VALUES (1,3,'Midterm 2','Midterm exam: updated description','James Hall','Room 245','Seat 10B','2024-05-25','2024-05-25 11:05:00','2024-05-25 12:00:00',45,67,0.25),(2,1,'Final','Final exam','Anderson Hall','Room 370','Seat 1','2024-05-01','2024-05-01 08:00:00','2024-05-01 09:00:00',92,100,0.3),(3,2,'Midterm','Midterm exam','Keller Hall','Room 3-210','Seat 1','2024-04-12','2024-04-12 08:00:00','2024-04-12 09:00:00',92,100,0.3),(4,2,'Final','Final exam','Keller Hall','Room 3-210','Seat 1','2024-05-07','2024-05-07 08:00:00','2024-05-07 09:00:00',92,100,0.3),(5,3,'Midterm','Midterm exam','Smith Hall','Room 100','Seat 1','2024-03-29','2024-03-29 08:00:00','2024-03-29 09:00:00',92,100,0.3),(6,3,'Final','Final exam','Smith Hall','Room 100','Seat 1','2024-04-20','2024-04-20 08:00:00','2024-04-20 09:00:00',92,100,0.3),(7,4,'Midterm','Midterm exam','Tate Hall','Room 105','Seat 1','2024-05-08','2024-05-08 08:00:00','2024-05-08 09:00:00',92,100,0.3),(8,4,'Final','Final exam','Tate Hall','Room 105','Seat 1','2024-06-02','2024-06-02 08:00:00','2024-06-02 09:00:00',92,100,0.3);
/*!40000 ALTER TABLE `exams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_comments`
--

DROP TABLE IF EXISTS `forum_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `forum_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `likes` int DEFAULT NULL,
  `dislikes` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `forum_id` (`forum_id`),
  KEY `post_id` (`post_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `forum_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forum_comments_ibfk_2` FOREIGN KEY (`forum_id`) REFERENCES `forums` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forum_comments_ibfk_3` FOREIGN KEY (`post_id`) REFERENCES `forum_posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forum_comments_ibfk_4` FOREIGN KEY (`parent_id`) REFERENCES `forum_comments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_comments`
--

LOCK TABLES `forum_comments` WRITE;
/*!40000 ALTER TABLE `forum_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `forum_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_posts`
--

DROP TABLE IF EXISTS `forum_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `user_id` int DEFAULT NULL,
  `forum_id` int DEFAULT NULL,
  `content` varchar(7500) DEFAULT NULL,
  `likes` int DEFAULT NULL,
  `dislikes` int DEFAULT NULL,
  PRIMARY KEY (`id`,`title`),
  KEY `user_id` (`user_id`),
  KEY `forum_id` (`forum_id`),
  CONSTRAINT `forum_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forum_posts_ibfk_2` FOREIGN KEY (`forum_id`) REFERENCES `forums` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_posts`
--

LOCK TABLES `forum_posts` WRITE;
/*!40000 ALTER TABLE `forum_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `forum_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_users`
--

DROP TABLE IF EXISTS `forum_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `forum_id` int DEFAULT NULL,
  `joined_at` datetime DEFAULT NULL,
  `post_count` int DEFAULT NULL,
  `comment_count` int DEFAULT NULL,
  `founder` tinyint(1) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `forum_id` (`forum_id`),
  CONSTRAINT `forum_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forum_users_ibfk_2` FOREIGN KEY (`forum_id`) REFERENCES `forums` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_users`
--

LOCK TABLES `forum_users` WRITE;
/*!40000 ALTER TABLE `forum_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `forum_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forums`
--

DROP TABLE IF EXISTS `forums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `tag_id` varchar(100) DEFAULT NULL,
  `thumbnail_url` varchar(1000) DEFAULT NULL,
  `user_count` int DEFAULT NULL,
  `users_online` int DEFAULT NULL,
  `post_count` int DEFAULT NULL,
  `comment_count` int DEFAULT NULL,
  `score` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `tag_id` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forums`
--

LOCK TABLES `forums` WRITE;
/*!40000 ALTER TABLE `forums` DISABLE KEYS */;
/*!40000 ALTER TABLE `forums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invites`
--

DROP TABLE IF EXISTS `invites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(150) DEFAULT NULL,
  `last_name` varchar(150) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `username` varchar(150) DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accepted_at` datetime DEFAULT NULL,
  `accepted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invites`
--

LOCK TABLES `invites` WRITE;
/*!40000 ALTER TABLE `invites` DISABLE KEYS */;
INSERT INTO `invites` VALUES (1,'Ashlynn','Mcguiggan','ashlynnrocks2003@gmail.com','ashlynnmcguiggan','Kb1uYAekMy','2024-05-25 05:44:51','2024-05-26 17:08:17',1);
/*!40000 ALTER TABLE `invites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_features`
--

DROP TABLE IF EXISTS `plan_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `tag` varchar(50) DEFAULT NULL,
  `included` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `plan_id` (`plan_id`),
  CONSTRAINT `plan_features_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_features`
--

LOCK TABLES `plan_features` WRITE;
/*!40000 ALTER TABLE `plan_features` DISABLE KEYS */;
INSERT INTO `plan_features` VALUES (1,1,'Course & Assignment Planning','planner',1),(2,1,'Online Note Taker & Transcription','notes',1),(3,1,'Question Generation','qgen',0),(4,1,'Document Summarization','summ',0),(5,2,'Course & Assignment Planning','planner',1),(6,2,'Online Note Taker & Transcription','notes',1),(7,2,'Question Generation','qgen',1),(8,2,'Document Summarization','summ',0),(9,3,'Course & Assignment Planning','planner',1),(10,3,'Online Note Taker & Transcription','notes',1),(11,3,'Question Generation','qgen',1),(12,3,'Document Summarization','summ',1);
/*!40000 ALTER TABLE `plan_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plans` (
  `id` int NOT NULL,
  `level` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `monthly_price` double DEFAULT NULL,
  `annual_price` double DEFAULT NULL,
  `monthly_price_id` varchar(100) DEFAULT NULL,
  `annual_price_id` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`,`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (1,1,'Free',0,0,0,'','','Free plan with limited features'),(2,2,'OmniStudy',11.99,11.99,9.99,'price_1PDbkRDapKE0mGmXzA9AjgMX','price_1PDbkgDapKE0mGmXdY8eJKMx','Our most popular plan'),(3,3,'Advanced',21.99,21.99,19.99,'price_1PDdQUDapKE0mGmXZmpQAW7M','price_1PDdR1DapKE0mGmXaCXjGlrd','Advanced plan with all features');
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `textbook_authors`
--

DROP TABLE IF EXISTS `textbook_authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `textbook_authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `textbook_id` int DEFAULT NULL,
  `author` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `textbook_id` (`textbook_id`),
  CONSTRAINT `textbook_authors_ibfk_1` FOREIGN KEY (`textbook_id`) REFERENCES `textbooks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `textbook_authors`
--

LOCK TABLES `textbook_authors` WRITE;
/*!40000 ALTER TABLE `textbook_authors` DISABLE KEYS */;
/*!40000 ALTER TABLE `textbook_authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `textbook_sections`
--

DROP TABLE IF EXISTS `textbook_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `textbook_sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `textbook_id` int DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `content_url` varchar(1000) DEFAULT NULL,
  `section_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `textbook_id` (`textbook_id`),
  CONSTRAINT `textbook_sections_ibfk_1` FOREIGN KEY (`textbook_id`) REFERENCES `textbooks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `textbook_sections`
--

LOCK TABLES `textbook_sections` WRITE;
/*!40000 ALTER TABLE `textbook_sections` DISABLE KEYS */;
/*!40000 ALTER TABLE `textbook_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `textbook_subjects`
--

DROP TABLE IF EXISTS `textbook_subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `textbook_subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `textbook_id` int DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `textbook_id` (`textbook_id`),
  CONSTRAINT `textbook_subjects_ibfk_1` FOREIGN KEY (`textbook_id`) REFERENCES `textbooks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `textbook_subjects`
--

LOCK TABLES `textbook_subjects` WRITE;
/*!40000 ALTER TABLE `textbook_subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `textbook_subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `textbooks`
--

DROP TABLE IF EXISTS `textbooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `textbooks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int DEFAULT NULL,
  `title` varchar(250) DEFAULT NULL,
  `title_long` varchar(1000) DEFAULT NULL,
  `isbn` varchar(25) DEFAULT NULL,
  `isbn13` varchar(25) DEFAULT NULL,
  `publisher` varchar(100) DEFAULT NULL,
  `pages` int DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `textbooks_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `textbooks`
--

LOCK TABLES `textbooks` WRITE;
/*!40000 ALTER TABLE `textbooks` DISABLE KEYS */;
/*!40000 ALTER TABLE `textbooks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_plans`
--

DROP TABLE IF EXISTS `user_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `plan_id` int DEFAULT NULL,
  `stripe_id` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `renew_date` datetime DEFAULT NULL,
  `total_spent` double DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`),
  UNIQUE KEY `stripe_id` (`stripe_id`),
  KEY `user_id` (`user_id`),
  KEY `plan_id` (`plan_id`),
  CONSTRAINT `user_plans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_plans_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_plans`
--

LOCK TABLES `user_plans` WRITE;
/*!40000 ALTER TABLE `user_plans` DISABLE KEYS */;
INSERT INTO `user_plans` VALUES (1,1,1,0,1,'2024-05-08 18:50:26','2024-05-08 18:50:26',0),(11,18,1,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `address1` varchar(200) DEFAULT NULL,
  `address2` varchar(200) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(200) DEFAULT NULL,
  `zip` varchar(6) DEFAULT NULL,
  `school` varchar(200) DEFAULT NULL,
  `year` varchar(100) DEFAULT NULL,
  `image_url` varchar(1000) DEFAULT NULL,
  `bio` varchar(1500) DEFAULT NULL,
  `birth_month` int DEFAULT NULL,
  `birth_date` int DEFAULT NULL,
  `birth_year` int DEFAULT NULL,
  `age` int DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profiles`
--

LOCK TABLES `user_profiles` WRITE;
/*!40000 ALTER TABLE `user_profiles` DISABLE KEYS */;
INSERT INTO `user_profiles` VALUES (1,1,'1234 Avenue Street','Suite 250','Minneapolis','MN','USA','55401','University of Minnesota - Twin Cities','Sophomore','https://eulyx.com/images/headshot.jpg','Passionate web developer',1,1,2004,20),(2,2,'1234 Avenue Street','Suite 250','Minneapolis','MN','USA','55401','University of Minnesota - Twin Cities','Sophomore','https://eulyx.com/images/headshot.jpg','Passionate web developer',1,1,2004,20),(11,18,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_study_set_questions`
--

DROP TABLE IF EXISTS `user_study_set_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_study_set_questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `study_set_id` int DEFAULT NULL,
  `type` varchar(7) DEFAULT NULL,
  `question` varchar(500) DEFAULT NULL,
  `answer` varchar(100) DEFAULT NULL,
  `options` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `study_set_id` (`study_set_id`),
  CONSTRAINT `user_study_set_questions_ibfk_1` FOREIGN KEY (`study_set_id`) REFERENCES `user_study_sets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_study_set_questions`
--

LOCK TABLES `user_study_set_questions` WRITE;
/*!40000 ALTER TABLE `user_study_set_questions` DISABLE KEYS */;
INSERT INTO `user_study_set_questions` VALUES (1,1,'MCQ','What is Node.js?','A JavaScript runtime built on the Chrome V8 JavaScript engine',NULL),(2,1,'MCQ','What is Express.js?','A web application framework for Node.js',NULL),(3,1,'MCQ','What is React?','A JavaScript library for building user interfaces',NULL),(4,1,'MCQ','What is Redux?','A predictable state container for JavaScript apps',NULL),(5,1,'MCQ','What is MongoDB?','A cross-platform document-oriented database program',NULL),(6,2,'MCQ','What is Java RMI?','Java Remote Method Invocation',NULL),(7,2,'MCQ','What is a distributed system?','A system whose components are located on different networked computers',NULL),(8,2,'MCQ','What is a distributed hash table?','A distributed system that provides a lookup service similar to a hash table',NULL),(9,2,'MCQ','What is the Chord protocol?','A protocol and algorithm for a peer-to-peer distributed hash table',NULL),(10,3,'MCQ','What is nemo.js built on top of?','C',NULL),(11,3,'MCQ','What is the purpose of the configuration file in nemo.js?','D',NULL),(17,5,'SHORT','What is the average user spend in Year 1?','$9.99',NULL),(18,5,'SHORT','What is the profit (NOI) in Year 3?','$1,366,200.00',NULL),(19,5,'MCQ','What was the main expense in Year 1?','C',NULL),(20,5,'SHORT','What is the target goal for a healthy profit margin?','85%',NULL),(21,5,'MCQ','What new expense was introduced in Year 3?','A',NULL),(25,8,'SHORT','What is Node.js?','A javascript framework to run javascript on the server.',NULL),(26,8,'FITB','Express.js is a platform for creating [FITB]','APIs',NULL),(27,8,'MCQ','What language is Node written in?','B','{\"A\":\"PHP\",\"B\":\"JavaScript\",\"C\":\"Ruby\",\"D\":\"Java\"}'),(28,9,'MCQ','What is kraken.js?','A','{\"A\":\"A layer that helps extend expressJS\",\"B\":\"A tool for testing JavaScript applications\",\"C\":\"A library for building user interfaces\",\"D\":\"A database management system\"}'),(29,9,'FITB','Fill in the blank: The nemo.js can run on any web browser, as long as the browser supports an appropriate version of __.','Selenium WebDriver',NULL),(30,9,'SHORT','What is nemo.js?','Nemo.js is a PayPal open source Java testing system that wraps around the Selenium WebDriver.',NULL),(31,9,'MCQ','What does nemo.js use for defining tests?','B','{\"A\":\"Jasmine syntax\",\"B\":\"Mochajs syntax\",\"C\":\"Chai syntax\",\"D\":\"Jest syntax\"}'),(32,9,'MCQ','What does the WebDriver do in the nemo.js framework?','B','{\"A\":\"It conducts the actual tests.\",\"B\":\"It communicates with the browser.\",\"C\":\"It writes the test scripts.\",\"D\":\"It generates the test reports.\"}'),(33,9,'FITB','Fill in the blank: For Firefox, nemo.js requires __ for downloading the browser webdriver.','geckodriver',NULL),(34,9,'SHORT','In nemo.js, what is the purpose of a testing framework?','To compare and interpret the test results.',NULL),(35,9,'MCQ','What is one of the features of nemo.js?','A','{\"A\":\"Parallelism\",\"B\":\"Sequentialism\",\"C\":\"Single-threading\",\"D\":\"Multi-threading\"}'),(36,9,'FITB','Fill in the blank: To install nemo, the command is __.','npm install --save-dev nemo',NULL),(37,9,'FITB','Fill in the blank: The browser driver uses an __ to receive HTTP requests.','HTTP server',NULL),(38,9,'SHORT','What is the purpose of nemo.driver in nemo.js?','It is an instance of the selenium web driver.',NULL),(39,10,'MCQ','What is required to set up the environment for nemo.js?','D','{\"A\":\"Download the browser webdriver\",\"B\":\"Install npm and Nemo\",\"C\":\"Generate Test Suite\",\"D\":\"All of the above\"}'),(40,10,'MCQ','Where are the reports generated by nemo.js saved?','B','{\"A\":\"In the configuration file\",\"B\":\"In the specified location in the profiles\",\"C\":\"On the web browser\",\"D\":\"In the Selenium WebDriver\"}'),(41,10,'MCQ','What does nemo.js wrap around?','A','{\"A\":\"The Selenium WebDriver\",\"B\":\"Kraken.js\",\"C\":\"Express.js\",\"D\":\"React\"}'),(42,10,'MCQ','What is nemo.js?','A','{\"A\":\"A PayPal open source Java testing system\",\"B\":\"A layer that helps extend expressJS\",\"C\":\"A web browser\",\"D\":\"An application for record keeping\"}'),(43,10,'MCQ','How does nemo.js interact with the browser?','B','{\"A\":\"Directly communicates with the browser\",\"B\":\"Communicates via the browser driver\",\"C\":\"Communicates via the Selenium WebDriver\",\"D\":\"Does not interact with the browser\"}'),(44,11,'SHORT','What was the name of the individual EC2 instance that was difficult to create?','Web Server 1',NULL),(45,12,'TOF','The author used a dataset from Kaggle for this study.','true',NULL),(46,12,'FITB','Fill in the blank: The study involves two variables, MPG and __.','fuel type',NULL),(47,12,'TOF','The null hypothesis of the study was that all means are equal.','true',NULL),(48,12,'FITB','Fill in the blank: The __ test was used to predict the results between fuel type and MPG.','ANOVA',NULL),(49,12,'TOF','The author concluded that there is no relationship between BMW’s fuel type and the MPG they get.','false',NULL),(50,12,'FITB','Fill in the blank: The p-value of the study came out to be __.','0.00',NULL);
/*!40000 ALTER TABLE `user_study_set_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_study_sets`
--

DROP TABLE IF EXISTS `user_study_sets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_study_sets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `num_questions` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by_ai` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_study_sets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_study_sets`
--

LOCK TABLES `user_study_sets` WRITE;
/*!40000 ALTER TABLE `user_study_sets` DISABLE KEYS */;
INSERT INTO `user_study_sets` VALUES (1,1,'Web Programming Questions','Study set for the Web Programming course',10,'2024-05-08 18:50:26',1),(2,1,'Distributed Systems Questions','Study set for the Distributed Systems course',10,'2024-05-08 18:50:26',1),(3,1,'Tech Talk Questions','Questions for the Nemo.js tech talk',5,'2024-05-14 18:03:00',1),(5,1,'Financial Projection Questions','Questions for the financial projections of OmniStudy',5,'2024-05-24 18:09:39',0),(8,1,'Node.js Topics #2','Questions on the Node.js framework.',3,'2024-05-24 16:04:08',1),(9,1,'Nemo.js Tech Talk Questions','12 questions to study up on the Nemo.js tech talk!',12,'2024-05-24 16:14:08',1),(10,1,'Tech Talk Questions','Heres a set!',5,'2024-05-26 17:05:51',1),(11,1,'INET Testing Chat','Testing study set for the INET reflection.',2,'2024-05-26 17:07:20',1),(12,1,'Final Write Up Test Set','heres a set for the final write up on mpg for BMWs',6,'2024-05-26 17:12:27',1);
/*!40000 ALTER TABLE `user_study_sets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_summarizations`
--

DROP TABLE IF EXISTS `user_summarizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_summarizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_summarizations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_summarizations`
--

LOCK TABLES `user_summarizations` WRITE;
/*!40000 ALTER TABLE `user_summarizations` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_summarizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `api_key` varchar(100) NOT NULL,
  `first_name` varchar(150) DEFAULT NULL,
  `last_name` varchar(150) DEFAULT NULL,
  `name` varchar(300) DEFAULT NULL,
  `username` varchar(25) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `online` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'d5a08115-0d6b-11ef-92c6-0242ac170002','Dev','User','Dev User','dev','dev@localhost','$2b$10$bqjXk8idtUq/9zCm2IszeOO2qZwQFRFY3u5IxpKcaFjuXIY4.y8i2','(763) 370-0010','2024-05-08 18:50:26',0),(2,'d5a0e2b7-0d6b-11ef-92c6-0242ac170002','John','Appleseed','John Appleseed','john','john@localhost','$2b$10$bqjXk8idtUq/9zCm2IszeOO2qZwQFRFY3u5IxpKcaFjuXIY4.y8i2','(763) 370-0010','2024-05-08 18:50:26',0),(18,'8bbc3486-1b82-11ef-92c6-0242ac170002','Ashlynn','Mcguiggan','Ashlynn Mcguiggan','ashlynnmcguiggan','ashlynnrocks2003@gmail.com','$2b$10$nK6tLeW1IWYkfcv9QIYW5ef54yj4XgUMJMiAFYxuPYhQSilmuPCP6','','2024-05-26 17:08:17',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-26 17:46:32
