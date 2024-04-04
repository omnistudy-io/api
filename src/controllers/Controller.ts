// Import controllers
import AuthController from "./AuthController";
import UsersController from "./UsersController";
import CoursesController from "./CoursesController";
import CourseEventsController from "./CourseEventsController";
import ForumsController from "./ForumsController";
import ForumPostsController from "./ForumPostsController";

// Import query for general queries
import { query } from "../db";

// Create the main controller
const Controller = require('express')();

// Register sub-controllers
Controller.use('/auth', AuthController);
Controller.use('/users', UsersController);
Controller.use('/courses', CoursesController);
Controller.use('/courses', CourseEventsController);
Controller.use('/forums', ForumsController);
Controller.use('/forum_posts', ForumPostsController);  

// Main controller functionality
Controller.get("/", (req, res) => {
    res.json({ message: "Welcome to the Controller API!" });
});

// General form queries through the API
Controller.post("/query", async (req, res) => {
    if(req.body.query === undefined) { 
        return res.status(400).json({ error: "No query provided" });
    }
    const result = await query(req.body.query);
    res.status(200).json(result);
});

// Export the main controller
export default Controller;