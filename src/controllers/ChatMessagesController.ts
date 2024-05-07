import ChatMessagesModel from "../models/ChatMessages";

// Create the controller
const ChatMessagesController = require('express')();

/**
 * GET /:id
 * @summary Get a chat message by its ID
 * @param id The chat message ID
 * @returns code: number, message: string, chat_message: ChatMessageSchema
 */
ChatMessagesController.get("/:id", async (req, res) => {
    // Validate parameters
    const id = req.params.id;
    if(isNaN(id) || id < 0) {
        res.status(400).json({ code: 400, message: "Invalid ID", chat_message: null });
        return;
    }

    // Get the chat
    const chat = await ChatMessagesModel.getById(id);
    res.status(chat.code).json(chat);
});


/**
 * POST /
 * @summary Create a new chat message
 * @param chat_id The ID of the chat
 * @param user_id The ID of the user
 * @param content The content of the message
 * @param from_user 0 if the message is from the user, 1 if it is from the system
 * @returns code: number, message: string, chat_message: ChatMessageSchema
 */
ChatMessagesController.post("/", async (req, res) => {
    // Validate parameters
    const { chat_id, user_id, content, from_user } = req.body;
    // Missing fields
    if(chat_id == null || user_id == null || content == null || from_user == null) {
        res.status(400).json({ code: 400, message: "Missing required fields. Required: chat_id, user_id, content, from_user", chat_message: null });
        return;
    }
    // Invalid chat_id
    if(isNaN(chat_id)) {
        res.status(400).json({ code: 400, message: "Invalid chat_id", chat_message: null });
        return;
    }
    // Invalid user_id
    if(isNaN(user_id)) {
        res.status(400).json({ code: 400, message: "Invalid user_id", chat_message: null });
        return;
    }
    // Empty content
    if(content == '') {
        res.status(400).json({ code: 400, message: "Empty content", chat_message: null });
        return;
    }
    // Invalid from_user
    if(from_user != 0 && from_user != 1) {
        res.status(400).json({ code: 400, message: "Invalid from_user", chat_message: null });
        return;
    }   

    // Create the chat
    const chat = await ChatMessagesModel.create(req.body);
    res.status(chat.code).json(chat);
});


// Export the controller
export default ChatMessagesController;
