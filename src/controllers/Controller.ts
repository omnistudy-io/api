// Import controllers
import AuthController from "./AuthController";
import UsersController from "./UsersController";
import CoursesController from "./CoursesController";
import AssignmentsController from "./AssignmentsController";
import ExamsController from "./ExamsController";
import PlansController from "./PlansController";

// Middleware
import auth from "../auth";

// Create the controller
const Controller = require('express')();

// Register unprotected sub-controllers
Controller.use('/auth', AuthController);

// Register protected sub-controllers
Controller.use('/users', [auth], UsersController);
Controller.use('/courses', [auth], CoursesController);
Controller.use('/assignments', [auth], AssignmentsController); 
Controller.use('/exams', [auth], ExamsController);
Controller.use('/plans', [auth], PlansController);

// Unprotected controller functionality
Controller.get("/", (req, res) => {
    res.json({ message: "Welcome to the Controller API!" });
});

// Import query for general queries
import { query } from "../db";
// General form queries through the API
Controller.post("/query", [auth], async (req, res) => {
    if(req.body.query === undefined) { 
        return res.status(400).json({ error: "No query provided" });
    }
    const result = await query(req.body.query);
    res.status(200).json(result);
});

// Export the controller
export default Controller;