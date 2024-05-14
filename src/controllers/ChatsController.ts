import ChatsModel from "../models/Chats";
import ChatMessagesModel from "../models/ChatMessages";


// Create the controller
const ChatsController = require('express')();


/**
 * GET /:id
 * @summary Get a chat by ID
 * @returns code: number, message: string, chat: UserChatSchema
 */
ChatsController.get("/:id", async (req, res) => {
    // Validate parameters
    const id = req.params.id;
    if(isNaN(id) || id < 0) {
        res.status(400).json({ code: 400, message: "Invalid ID", chat: null });
        return;
    }

    // Get the chat
    const chat = await ChatsModel.getById(id);
    res.status(chat.code).json(chat);
});


/**
 * GET /:id/messages
 * @summary Get all messages for a chat by ID
 * @param id The chat ID
 * @returns code: number, message: string, messages: ChatMessageSchema[]
 */
ChatsController.get("/:id/messages", async (req, res) => {
    // Validate parameters
    const id = req.params.id;
    if(isNaN(id) || id < 0) {
        res.status(400).json({ code: 400, message: "Invalid ID", chat: null });
        return;
    }

    // Get the chat
    const messagesRes = await ChatMessagesModel.getByChatId(id);
    res.status(messagesRes.code).json(messagesRes);
});


/**
 * POST /
 * @summary Create a new chat
 * @param user_id The ID of the user
 * @param assignment_id The ID of the assignment
 * @param documents_used The documents used in the chat
 * @param created_at The date the chat was created
 * @param saved Whether the chat is saved
 * @returns code: number, message: string, chat: UserChatSchema
 */
ChatsController.post("/", async (req, res) => {
    const { user_id, title, assignment_id, document_id, created_at, saved } = req.body;
    // Verify required fields exist
    if(user_id == null || title == null || assignment_id == null || created_at == null || saved == null)
        return res.status(400).json({ code: 400, message: 'Missing required fields. Required: user_id, assignment_id, document_id, created_at, saved', chat: null });
    // Verify the title is not empty
    if(title == '')
        return res.status(400).json({ code: 400, message: 'Title is empty', chat: null });
    // Verify the user_id is a number
    if(isNaN(user_id)) 
        return res.status(400).json({ code: 400, message: 'Invalid user ID', chat: null });
    // Verify the assignment_id is a number
    if(isNaN(assignment_id)) 
        return res.status(400).json({ code: 400, message: 'Invalid assignment ID', chat: null });
    // Verify the document_id is a number
    if(isNaN(document_id)) 
        return res.status(400).json({ code: 400, message: 'Invalid document ID', chat: null });
    // Verify the string fields are not empty
    if(created_at == '' )
        return res.status(400).json({ code: 400, message: 'Invalid created at', chat: null });
    // Verify the saved field is a boolean
    if(saved != 0 && saved != 1)
        return res.status(400).json({ code: 400, message: 'Invalid saved field. Must be 0 or 1', chat: null });

    // Create the chat
    const chat = await ChatsModel.create(req.body);
    res.status(chat.code).json(chat);
});


/**
 * PUT /:id
 * @summary Update a chat by ID
 * @param id The chat ID
 * @returns code: number, message: string, chat: UserChatSchema
 */
ChatsController.put("/:id", async (req, res) => {
    // Validte parameters
    const id = req.params.id;
    if(isNaN(id) || id < 0) {
        res.status(400).json({ code: 400, message: "Invalid ID", chat: null });
        return;
    }

    // Allowed fields
    const updatableFields = ["title", "assignment_id", "document_id", "created_at", "saved"];
    if(Object.keys(req.body).some(key => !updatableFields.includes(key))) {
        res.status(400).json({ code: 400, message: 'Invalid field in request', chat: null });
        return;
    }
    // Check that any field exists
    if(Object.keys(req.body).length == 0) {
        res.status(400).json({ code: 400, message: 'No fields provided', chat: null });
        return;
    }

    // Update the chat
    const chat = await ChatsModel.update(id, req.body);
    res.status(chat.code).json(chat);
});


/**
 * DELETE /:id
 * @summary Delete a chat by ID
 * @param id The chat ID
 * @returns code: number, message: string, chat: UserChatSchema
 */
ChatsController.delete("/:id", async (req, res) => {
    // Validate parameters
    const id = req.params.id;
    if(isNaN(id) || id < 0) {
        res.status(400).json({ code: 400, message: "Invalid ID", chat: null });
        return;
    }

    // Delete the chat
    const chat = await ChatsModel.delete(id);
    res.status(chat.code).json(chat);
});


// Export the controller
export default ChatsController;