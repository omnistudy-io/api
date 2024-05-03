import StudySetsModel from "../models/StudySets";
import StudySetQuestionsModel from "../models/StudySetQuestions";

// Create the controller
const StudySetsController = require('express')();

/**
 * GET /:id
 * @summary Get a study set by its ID
 * @param id The study set ID
 * @returns code: number, message: string, studySet: UserStudySetSchema
 */
StudySetsController.get("/:id", async(req, res) => {
    const studySetId = req.params.id;
    if(isNaN(studySetId) || studySetId < 0 || studySetId == null || studySetId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Study Set ID', studySet: [] });

    const result = await StudySetsModel.getById(studySetId);
    res.status(result.code).json(result);
});


/**
 * GET /:id/questions
 * @summary Get all questions for a study set by its ID
 * @param id The study set ID
 * @returns code: number, message: string, questions: UserStudySetQuestionSchema[]
 */
StudySetsController.get("/:id/questions", async(req, res) => {
    const studySetId = req.params.id;
    if(isNaN(studySetId) || studySetId < 0 || studySetId == null || studySetId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Study Set ID', questions: [] });

    const result = await StudySetQuestionsModel.getByStudySetId(studySetId);
    res.status(result.code).json(result);
});


/**
 * POST /
 * @summary Create a new study set
 * @returns code: number, message: string, studySet: UserStudySetSchema
 */
StudySetsController.post("/", async(req, res) => {
    const ss = {
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description
    };
    const ssq = req.body.questions;

    // Verify required fields exist
    if(ss.user_id == null || ss.title == null)
        return res.status(400).json({ code: 400, message: 'Missing required fields. Required: user_id, title', studySet: null });
    // Verify the user ID is a number
    if(isNaN(ss.user_id))
        return res.status(400).json({ code: 400, message: 'Invalid user ID', studySet: null });
    // Verify the string fields are not empty
    if(ss.title == '')
        return res.status(400).json({ code: 400, message: 'One or more required fields are empty', studySet: null });

    // Create the study set
    const result = await StudySetsModel.create(ss, ssq);
    res.status(result.code).json(result);
});


/**
 * DELETE /:id
 * @summary Delete a study set by its ID
 * @param id The study set ID
 * @returns code: number, message: string, studySet: UserStudySetSchema
 */
StudySetsController.delete("/:id", async(req, res) => {
    // Validate parameters
    if(isNaN(req.params.id)) {
        res.status(400).json({ code: 400, message: 'Invalid id parameter', studySet: null });
        return;
    }

    // Delete the study set
    const response = await StudySetsModel.delete(req.params.id);
    res.status(response.code).json(response);
});


// Export the controller
export default StudySetsController;