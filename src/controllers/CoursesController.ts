import { CoursesModel } from '../models/Courses';
import { ApiResponse } from '../response';
import { query } from '../db';

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

CoursesController.get("/:id/events", async (req, res) => {
    const result = await query("SELECT * FROM course_events WHERE course_id=" + req.params.id);
    if(result.result == null) 
        return res.status(404).json(ApiResponse([], 'Course events not found', result.message, 404));
    res.status(200).json(ApiResponse(result.result, 'Course events found', '', 200));
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

CoursesController.put("/:id/color", async (req, res) => {
    // Validate body
    if(req.body.color == null) 
        return res.status(400).json(ApiResponse([], 'Color not provided', '', 400));

    const result = await CoursesModel.changeColor(req.params.id, req.body.color);
    res.status(result.code).send(result);
});

CoursesController.put("/:id/thumbnail", async (req, res) => {
    // Validate body
    if(req.body.thumbnail_url == null) 
        return res.status(400).json(ApiResponse([], 'Thumbnail URL not provided', '', 400));

    const result = await CoursesModel.changeThumbnail(req.params.id, req.body.thumbnail_url);
    res.status(result.code).send(result);
});


export default CoursesController;