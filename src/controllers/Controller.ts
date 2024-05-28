// Import controllers
import AuthController from "./AuthController";
import UsersController from "./UsersController";
import CoursesController from "./CoursesController";
import AssignmentsController from "./AssignmentsController";
import ExamsController from "./ExamsController";
import PlansController from "./PlansController";
import StudySetsController from "./StudySetsController";
import DocumentsController from "./DocumentsController";
import AIController from "./AIController";
import PaymentsController from "./PaymentsController";
import ChatsController from "./ChatsController";
import ChatMessagesController from "./ChatMessagesController";
import InvitesController from "./InvitesController";
import EmailController from "./EmailController";
import ReportsController from "./ReportsController";

// Middleware
import auth, { uidReplace } from "../auth";

// Create the controller
const Controller = require('express')();

// Register unprotected sub-controllers
Controller.use('/auth', AuthController);
Controller.use('/invites', InvitesController);

// Register protected sub-controllers
Controller.use('/users', [auth, uidReplace], UsersController);
Controller.use('/courses', [auth, uidReplace], CoursesController);
Controller.use('/assignments', [auth, uidReplace], AssignmentsController); 
Controller.use('/exams', [auth, uidReplace], ExamsController);
Controller.use('/plans', [auth, uidReplace], PlansController);
Controller.use('/study-sets', [auth, uidReplace], StudySetsController);
Controller.use('/documents', [auth, uidReplace], DocumentsController);
Controller.use('/ai', [auth, uidReplace], AIController);
Controller.use('/payments', [auth, uidReplace], PaymentsController);
Controller.use('/chats', [auth, uidReplace], ChatsController);
Controller.use('/chat-messages', [auth, uidReplace], ChatMessagesController);
Controller.use('/email', [auth, uidReplace], EmailController);
Controller.use('/reports', [auth, uidReplace], ReportsController);

// Unprotected controller functionality
Controller.get("/", (req, res) => {
    res.json({ message: "Welcome to the Controller API - Staging Test!" });
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