import { TextbooksModel } from "../models/Textbooks";

// Create the controller
const TextbooksController = require('express')();


/**
 * GET /:id
 * @summary Get an textbook by its ID
 * @param id The textbook ID
 * @returns code: number, message: string, textbook: TextbookSchema
 */
TextbooksController.get("/:id", async(req, res) => {
    const textbookId = req.params.id;
    if(isNaN(textbookId) || textbookId < 0 || textbookId == null || textbookId == undefined)
        return res.status(400).json({ code: 400, message: 'Invalid Textbook ID', textbook: [] });

    const result = await TextbooksModel.getById(textbookId);
    res.status(result.code).json(result);
});


/**
 * POST /
 * @summary Create a new textbook
 * @returns code: number, message: string, textbook: TextbookSchema
 */
TextbooksController.post("/", async(req, res) => {
    const { course_id, title, description, due_at } = req.body;
    // Verify required fields exist
    if(course_id == null || title == null || description == null || due_at == null)
        return res.status(400).json({ code: 400, message: 'Missing required fields. Required: course_id, title, description, due_at', textbook: null });
    // Verify the course ID is a number
    if(isNaN(course_id))
        return res.status(400).json({ code: 400, message: 'Invalid course ID', textbook: null });
    // Verify the string fields are not empty
    if(title == '' || due_at == '')
        return res.status(400).json({ code: 400, message: 'One or more required fields are empty', textbook: null });

    // Create the textbook
    const result = await TextbooksModel.create(req.body);
    res.status(result.code).json(result);
}); 

/**
 * DELETE /:id
 * @summary Delete an textbook by its ID
 * @param id The textbook ID
 * @returns code: number, message: string, textbook: TextbookSchema
 */
TextbooksController.delete("/:id", async(req, res) => {
    // Validate parameters
    if(isNaN(req.params.id)) {
        res.status(400).json({ code: 400, message: 'Invalid id parameter', textbook: null });
        return;
    }

    // Delete the textbook
    const response = await TextbooksModel.delete(req.params.id);
    res.status(response.code).json(response);
});

/**
 * PUT /:id
 * @summary Update an textbook by its ID
 * @param id The textbook ID
 * @returns code: number, message: string, textbook: TextbookSchema
 */
TextbooksController.put("/:id", async(req, res) => {
    // Validate parameters
    if(isNaN(req.params.id)) {
        res.status(400).json({ code: 400, message: 'Invalid id parameter', textbook: null });
        return;
    }

    // Allowed fields
    const updatableFields = ["id", "course_id", "title", "title_long", "isbn", "isbn13", "publisher", "pages", "image", "due_at", "processed"];
    if(Object.keys(req.body).some(key => !updatableFields.includes(key))) {
        res.status(400).json({ code: 400, message: 'Invalid field in request', textbook: null });
        return;
    }
    // Check that any field exists
    if(Object.keys(req.body).length == 0) {
        res.status(400).json({ code: 400, message: 'No fields provided', textbook: null });
        return;
    }

    // Update textbook
    const response = await TextbooksModel.update(req.params.id, req.body);
    res.status(response.code).json(response);
});

// Export the controller
export default TextbooksController;