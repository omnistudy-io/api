import { CoursesModel } from '../models/Courses';
import { ApiResponse } from '../response';
import { query } from '../db';
import { CourseEventsModel } from '../models/CourseEvents';
import { AssignmentsModel } from '../models/Assignments';
import { ExamsModel } from '../models/Exams';
import { DocumentsModel } from '../models/Documents';

// Create the controller
const CoursesController = require('express')();


/**
 * GET /
 * @summary Get all courses
 * @returns Course if successful, error if not
 */
CoursesController.get("/", async (req, res) => {
    // Get the course(s)
    const result = await CoursesModel.getAll();
    res.status(result.code).send(result);
});


/**
 * GET /:id
 * @summary Get a course by id
 * @param id The course id
 * @returns Course if successful, error if not
 */
CoursesController.get("/:id", async (req, res) => {
    // Get the course
    const result = await CoursesModel.getById(req.params.id);
    res.status(result.code).send(result);
});


/**
 * GET /:id/events
 * @summary Get all events for a course
 * @param id The course id
 * @returns code: number, message: string, course_events: CourseEventSchema[]
 */
CoursesController.get("/:id/events", async(req, res) => {
    const courseId = req.params.id;
    if(isNaN(courseId) || courseId < 0 || courseId == null || courseId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Course ID', course_events: [] });

    const result = await CourseEventsModel.getByCourseId(courseId);
    res.status(result.code).json(result);
}); 


/**
 * POST /
 * @summary Create a new course
 * @returns Course if successful, error if not
 */
CoursesController.post("/", async (req, res) => {
    // Validate the request body
    const { course, eventDefs } = req.body;

    // Create the course
    const result = await CoursesModel.create(course, eventDefs);
    res.status(result.code).send(result);
});


/**
 * DELETE /:id
 * @summary Delete a course by id
 * @param id The course id
 * @returns Course if successful, error if not
 */
CoursesController.delete("/:id", async (req, res) => {
    const courseId = req.params.id;
    // Validate parameters
    if(isNaN(courseId) || courseId < 0 || courseId == null || courseId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Course ID', course: null });

    const result = await CoursesModel.delete(courseId);
    res.status(result.code).send(result);
});


/**
 * PUT /:id
 * @summary Update a courses
 * @param id The course id
 * @returns Course if successful, error if not
 */
CoursesController.put("/:id", async (req, res) => {
    const courseId = req.params.id;

    // Validate parameters
    if(isNaN(courseId) || courseId < 0 || courseId == null || courseId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Course ID', course: null });

    // Allowed fields
    const updatableFields = ["title", "description", "subject", "number", "professor", "building", "room", "color", "thumbnail_url"]
    if(Object.keys(req.body).some(key => !updatableFields.includes(key))) {
        res.status(400).json({ code: 400, message: 'Invalid field in request', assignment: null });
        return;
    }
    // Check that any field exists
    if(Object.keys(req.body).length == 0) {
        res.status(400).json({ code: 400, message: 'No fields provided', assignment: null });
        return;
    }

    const result = await CoursesModel.update(req.params.id, req.body);
    res.status(result.code).send(result);
});


/**
 * GET /:id/assignments
 * @summary Get all assignments for a course
 * @param id The course id
 * @returns code: number, message: string, assignments: AssignmentSchema[]
 */
CoursesController.get('/:id/assignments', async (req, res) => {
    // Validate parameters
    const id = req.params.id;
    if(isNaN(id) || id < 0 || id == null || id == undefined || id == '') {
        res.status(400).json({ code: 400, message: 'Invalid id parameter', assignments: [] });
        return;
    }

    const response = await AssignmentsModel.getByCourseId(id);
    res.status(response.code).json(response);
});



/**
 * GET /:id/exams
 * @summary Get all exams for a course
 * @param id The course id
 * @returns code: number, message: string, exams: ExamSchema[]
 */
CoursesController.get("/:id/exams", async (req, res) => {
    // Validate parameters
    const id = req.params.id;
    if(isNaN(id) || id < 0 || id == null || id == undefined || id == '') {
        res.status(400).json({ code: 400, message: 'Invalid id parameter', exams: [] });
        return;
    }

    const response = await ExamsModel.getByCourseId(id);
    res.status(response.code).json(response);
});


/**
 * GET /:id/documents
 * @summary Get all documents for a course
 * @param id The course id
 * @returns code: number, message: string, docs: DocumentSchema[]
 */
CoursesController.get("/:id/documents", async (req, res) => {
    // Validate parameters
    const id = req.params.id;
    if(isNaN(id) || id < 0 || id == null || id == undefined || id == '') {
        res.status(400).json({ code: 400, message: 'Invalid id parameter', docs: [] });
        return;
    }

    const response = await DocumentsModel.getByCourseId(id);
    res.status(response.code).json(response);
});


// Export the controller
export default CoursesController;