import { AssignmentsModel } from "../models/Assignments";
import { DocumentsModel } from "../models/Documents";

// Create the controller
const AssignmentsController = require('express')();


/**
 * GET /:id
 * @summary Get an assignment by its ID
 * @param id The assignment ID
 * @returns code: number, message: string, assignment: AssignmentSchema
 */
AssignmentsController.get("/:id", async(req, res) => {
    const assignmentId = req.params.id;
    if(isNaN(assignmentId) || assignmentId < 0 || assignmentId == null || assignmentId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Assignment ID', assignment: [] });

    const result = await AssignmentsModel.getById(assignmentId);
    res.status(result.code).json(result);
});


/**
 * POST /
 * @summary Create a new assignment
 * @returns code: number, message: string, assignment: AssignmentSchema
 */
AssignmentsController.post("/", async(req, res) => {
    const { course_id, title, description, due_at } = req.body;
    // Verify required fields exist
    if(course_id == null || title == null || description == null || due_at == null)
        return res.status(400).json({ code: 400, message: 'Missing required fields. Required: course_id, title, description, due_at', assignment: null });
    // Verify the course ID is a number
    if(isNaN(course_id))
        return res.status(400).json({ code: 400, message: 'Invalid course ID', assignment: null });
    // Verify the string fields are not empty
    if(title == '' || due_at == '')
        return res.status(400).json({ code: 400, message: 'One or more required fields are empty', assignment: null });

    // Create the assignment
    const result = await AssignmentsModel.create(req.body);
    res.status(result.code).json(result);
}); 

/**
 * DELETE /:id
 * @summary Delete an assignment by its ID
 * @param id The assignment ID
 * @returns code: number, message: string, assignment: AssignmentSchema
 */
AssignmentsController.delete("/:id", async(req, res) => {
    // Validate parameters
    if(isNaN(req.params.id)) {
        res.status(400).json({ code: 400, message: 'Invalid id parameter', assignment: null });
        return;
    }

    // Delete the assignment
    const response = await AssignmentsModel.delete(req.params.id);
    res.status(response.code).json(response);
});


/**
 * PUT /:id
 * @summary Update an assignment by its ID
 * @param id The assignment ID
 * @returns code: number, message: string, assignment: AssignmentSchema
 */
AssignmentsController.put("/:id", async(req, res) => {
    // Validate parameters
    if(isNaN(req.params.id)) {
        res.status(400).json({ code: 400, message: 'Invalid id parameter', assignment: null });
        return;
    }

    // Allowed fields
    const updatableFields = ["course_id", "title", "description", "progress", "due_at", "actual_points", "possible_points", "weight"];
    if(Object.keys(req.body).some(key => !updatableFields.includes(key))) {
        res.status(400).json({ code: 400, message: 'Invalid field in request', assignment: null });
        return;
    }
    // Check that any field exists
    if(Object.keys(req.body).length == 0) {
        res.status(400).json({ code: 400, message: 'No fields provided', assignment: null });
        return;
    }

    // Update assignment
    const response = await AssignmentsModel.update(req.params.id, req.body);
    res.status(response.code).json(response);
});


/**
 * GET /:id/documents
 * @summary Get all documents for an assignment
 * @param id The assignment ID
 * @returns code: number, message: string, docs: DocumentSchema[]
 */
AssignmentsController.get("/:id/documents", async(req, res) => {
    const assignmentId = req.params.id;
    if(isNaN(assignmentId) || assignmentId < 0 || assignmentId == null || assignmentId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Assignment ID', assignment: [] });

    const result = await DocumentsModel.getByAssignmentId(assignmentId);
    res.status(result.code).json(result);
});


// Export the controller
export default AssignmentsController;