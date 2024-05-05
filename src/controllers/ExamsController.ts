import { DocumentsModel } from '../models/Documents';
import { ExamsModel } from '../models/Exams';

// Create the controller
const ExamsController = require('express')();


/**
 * GET /:id
 * @summary Get an exam by its ID
 * @returns Exam if successful, error if not
 */
ExamsController.get("/:id", async (req, res) => {
    const id = req.params.id;
    if(isNaN(id) || id < 0 || id == null || id == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Exam ID', exam: null });

    // Get the exam(s)
    const result = await ExamsModel.getById(id);
    res.status(result.code).send(result);
});

/**
 * POST /
 * @summary Create a new exam
 * @returns Course if successful, error if not
 */
ExamsController.post("/", async (req, res) => {
    // Validate the request body
    const exam = req.body;

    // Create the exam
    const result = await ExamsModel.create(exam);
    res.status(result.code).send(result);
});


/**
 * DELETE /:id
 * @summary Delete a course by its ID
 * @param id The course ID
 * @returns Exam if successful, error if not
 */
ExamsController.delete("/:id", async (req, res) => {
    const courseId = req.params.id;
    // Validate parameters
    if(isNaN(courseId) || courseId < 0 || courseId == null || courseId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Course ID', course: null });

    const result = await ExamsModel.delete(courseId);
    res.status(result.code).send(result);
});


/**
 * PUT /:id
 * @summary Update an exam by its ID
 * @param id The exam ID
 * @returns Exam if successful, error if not
 */
ExamsController.put("/:id", async (req, res) => {
    const examId = req.params.id;
    const data = req.body;

    // Validate parameters
    if(isNaN(examId) || examId < 0 || examId == null || examId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Course ID', course: null });

    // Allowed fields
    const updatableFields = ["course_id", "title", "description", "building", "room", "seat", "date", "start_time", "end_time", "actual_points", "possible_points", "weight"];
    if(Object.keys(req.body).some(key => !updatableFields.includes(key))) {
    res.status(400).json({ code: 400, message: 'Invalid field in request', exam: null });
        return;
    }
    // Check that any field exists
    if(Object.keys(req.body).length == 0) {
        res.status(400).json({ code: 400, message: 'No fields provided', exam: null });
        return;
    }

    const result = await ExamsModel.update(examId, data);
    res.status(result.code).send(result);
});


/**
 * GET /:id/documents
 * @summary Get all documents for an exam
 * @param id The exam ID
 * @returns code: number, message: string, docs: DocumentSchema[]
 */
ExamsController.get("/:id/documents", async (req, res) => {
    const examId = req.params.id;
    if(isNaN(examId) || examId < 0 || examId == null || examId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Exam ID', exam: null });

    // Get the exam(s)
    const result = await DocumentsModel.getByExamId(examId);
    res.status(result.code).send(result);
});


// Export the controller
export default ExamsController;