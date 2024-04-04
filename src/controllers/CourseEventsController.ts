import { CourseEventsModel } from '../models/CourseEvents';
import { ApiResponse } from '../response';

// Create the controller
const CourseEventsController = require('express')();


/**
 * GET /
 * @summary Get all courses
 * @returns Course if successful, error if not
 */
CourseEventsController.get("/events", async (req, res) => {
    // Get the course(s)
    const result = await CourseEventsModel.get();
    res.status(result.code).send(result);
});

/**
 * GET /:id
 * @summary Get a course by id
 * @param id The course id
 * @returns Course if successful, error if not
 */
CourseEventsController.get("/:id/events", async (req, res) => {
    // Get the course
    const result = await CourseEventsModel.get(req.params.id);
    res.status(result.code).send(result);
});


export default CourseEventsController;