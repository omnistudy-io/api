import { query, QueryResponse } from "../db";
import { ChatMessageSchema } from "../schema";

/**
 * Model for the `chat_messages` table in the DB.
 * 
 * Supported operations:
 *  - `getById`: Get a chat message by its ID
 *  - `getByChatId`: Get all chat messages for a chat by its ID
 *  - `create`: Create a new chat message
 */
export default class ChatMessagesModel {

    /**
     * Get a chat message by its ID
     * 
     * @param id The ID of the chat message
     * @returns code: number, message: string, chat_message: ChatMessageSchema | null
     */
    static async getById(id: number): Promise<{
        code: number,
        message: string,
        chat_message: ChatMessageSchema | null
    }> {
        const sql = `SELECT * FROM chat_messages WHERE id = ${id}`;
        const q: QueryResponse = await query(sql);
        // Query or connection error
        if(q.result == null) 
            return { code: 500, message: q.message, chat_message: null };
        // Chat message not found
        if(q.result.length == 0) 
            return { code: 404, message: "Chat message not found", chat_message: null };
        // Chat message found
        const chat_message = q.result[0] as ChatMessageSchema;
        return { code: 200, message: "Chat message found", chat_message: chat_message };
    }

    /**
     * Get all chat messages for a chat by its ID
     * 
     * @param chatId The ID of the chat
     * @returns code: number, message: string, chat_messages: ChatMessageSchema[] | null
     */
    static async getByChatId(chatId: number): Promise<{
        code: number,
        message: string,
        chat_messages: ChatMessageSchema[] | null
    }> {
        const sql = `SELECT * FROM chat_messages WHERE chat_id = ${chatId}`;
        const q: QueryResponse = await query(sql);
        // Query or connection error
        if(q.result == null) 
            return { code: 500, message: q.message, chat_messages: null };
        // Chat messages not found
        if(q.result.length == 0) 
            return { code: 404, message: "Chat messages not found", chat_messages: null };
        // Chat messages found
        return { code: 200, message: "Chat messages found", chat_messages: q.result };
    }


    /**
     * Create a new chat message
     * @param message contains fields: chat_id, user_id, content, from_user
     */
    static async create(message: ChatMessageSchema) {
        const sql = `
            INSERT INTO chat_messages (id, chat_id, user_id, content, created_at from_user)
            VALUES (NULL, ${message.chat_id}, ${message.user_id}, "${message.content}", NOW(), ${message.from_user})
        `;
        const q: QueryResponse = await query(sql);
        // Query or connection error
        if(q.result == null) 
            return { code: 500, message: q.message, chat_message: null };
        // Chat message created
        const chat_message = this.getById(q.result.insertId);
        return { code: 201, message: "Chat message created", chat_message: chat_message };

    }

}