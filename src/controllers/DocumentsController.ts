const expressUploader = require("express-fileupload");
import { DocumentsModel } from "../models/Documents";
import Storage from "../utils/Storage";
import getFileExt from "../utils/getFileExt";

// Create the controller
const DocumentsController = require('express')();
// Add middleware
DocumentsController.use(expressUploader());


/**
 * GET /:id
 * @summary Get a document by its ID
 * @param id The document ID
 * @returns code: number, message: string, doc: DocumentSchema
 */
DocumentsController.get("/:id", async (req, res) => {
    const id = req.params.id;
    if (isNaN(id) || id < 0 || id == null || id == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Document ID', doc: [] });

    const result = await DocumentsModel.getById(id);
    res.status(result.code).json(result);
});


/**
 * POST /
 * @summary Create a new document
 * @returns code: number, message: string, doc: DocumentSchema
 */
DocumentsController.post("/", async (req, res) => {
    // Check for uploaded files
    if (req.files == null)
        return res.status(400).json({ code: 400, message: 'No files uploaded', doc: [] });

    // Validate user id
    const userId = req.body.user_id;
    if (isNaN(userId) || userId < 0 || userId == null || userId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid User ID', doc: [] });

    // Check for course id
    let courseId = req.body.course_id;
    if(isNaN(courseId) || courseId < 0) {
        if(courseId == null || courseId == undefined)
            courseId = null;
        else
            return res.status(400).json({ code: 400, message: 'Invalid Course ID', doc: [] });
    }
    // Check for assignment id
    let assignmentId = req.body.assignment_id;
    if(isNaN(assignmentId) || assignmentId < 0) {
        if(assignmentId == null || assignmentId == undefined)
            assignmentId = null;
        else
            return res.status(400).json({ code: 400, message: 'Invalid assignment ID', doc: [] });
    }
    // Check for exam id
    let examId = req.body.exam_id;
    if(isNaN(examId) || examId < 0) {
        if(examId == null || examId == undefined)
            examId = null;
        else
            return res.status(400).json({ code: 400, message: 'Invalid exam ID', doc: [] });
    }

    // Upload the file to the storage bucket
    const document = req.files.document;
    const uploadResult = await Storage.uploadBytes(document, `users/${userId}/documents/${document.name}`);
    if(!uploadResult.success)
        return res.status(500).json({ code: 500, message: 'Failed to upload document', doc: [] });

    // Create document object
    const doc = {
        id: null,
        user_id: userId,
        course_id: courseId,
        assignment_id: assignmentId,
        exam_id: examId,
        title: document.name,
        ext: getFileExt(document.name),
        url: `https://storage.googleapis.com/${process.env.BUCKET_NAME}/users/${userId}/documents/${document.name}`,
        ext_icon_url: '',
        is_note: false
    };
    const result = await DocumentsModel.create(doc);
    res.status(result.code).json(result);
});


/**
 * DELETE /:id
 * @summary Delete a document by its ID
 * @param id The document ID
 * @returns code: number, message: string, doc: DocumentSchema
 */
DocumentsController.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if (isNaN(id) || id < 0 || id == null || id == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Document ID', doc: [] });

    const result = await DocumentsModel.delete(id);
    res.status(result.code).json(result);
});


// Export the controller
export default DocumentsController;
