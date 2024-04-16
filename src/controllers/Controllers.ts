// Import controllers
import AuthController from "./AuthController";
import UsersController from "./UsersController";
import CoursesController from "./CoursesController";
import AssignmentsController from "./AssignmentsController";
import PlansController from "./PlansController";

// Create the main controller
export const MainController = require('express')();
export const ProtectedController = require('express')();

// Register main sub-controllers
MainController.use('/auth', AuthController);

// Register protected sub-controllers
ProtectedController.use('/users', UsersController);
ProtectedController.use('/courses', CoursesController);
ProtectedController.use('/assignments', AssignmentsController); 
ProtectedController.use('/plans', PlansController);
// Add authentication middleware
import auth from "../auth";
ProtectedController.use(auth);

// Main controller functionality
MainController.get("/", (req, res) => {
    res.json({ message: "Welcome to the Controller API!" });
});

// Import query for general queries
import { query } from "../db";
// General form queries through the API
ProtectedController.post("/query", async (req, res) => {
    if(req.body.query === undefined) { 
        return res.status(400).json({ error: "No query provided" });
    }
    const result = await query(req.body.query);
    res.status(200).json(result);
});
