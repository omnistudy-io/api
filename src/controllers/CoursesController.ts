import { CoursesModel } from '../models/Courses';
import { ApiResponse } from '../response';
import { query } from '../db';
import { CourseEventsModel } from '../models/CourseEvents';
import { AssignmentsModel } from '../models/Assignments';
import { ExamsModel } from '../models/Exams';

// Create the controller
const CoursesController = require('express')();


/**
 * GET /
 * @summary Get all courses
 * @returns Course if successful, error if not
 */
CoursesController.get("/", async (req, res) => {
    // Get the course(s)
    const result = await CoursesModel.get();
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
    const result = await CoursesModel.get(req.params.id);
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
 * 
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
 * 
 */
CoursesController.put("/:id/color", async (req, res) => {
    const courseId = req.params.id;
    const color = req.body.color;

    // Validate parameters
    if(isNaN(courseId) || courseId < 0 || courseId == null || courseId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Course ID', course: null });
    if(color == null || color == undefined || color == '')
        return res.status(400).json({ code: 400, message: 'Color not provided', course: null });

    const result = await CoursesModel.changeColor(req.params.id, req.body.color);
    res.status(result.code).send(result);
});


/**
 * 
 */
CoursesController.put("/:id/thumbnail", async (req, res) => {
    const courseId = req.params.id;
    const thumbnailUrl = req.body.thumbnail_url;
    
    // Course ID must be defined and positive
    if(isNaN(courseId) || courseId < 0 || courseId == null || courseId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Course ID', course: null });
    // Thumbnail URL must be defined and be a valid URL
    if(thumbnailUrl == null || thumbnailUrl == undefined || thumbnailUrl == '' || !thumbnailUrl.includes('http'))
        return res.status(400).json({ code: 400, message: 'Invalid thumbnail URL', course: null });

    const result = await CoursesModel.changeThumbnail(req.params.id, req.body.thumbnail_url);
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


// Export the controller
export default CoursesController;