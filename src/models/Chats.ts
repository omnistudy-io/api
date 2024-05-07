import { query, QueryResponse } from "../db";
import { ChatSchema } from "../schema";

/**
 * Model for the `chats` table in the DB.
 * 
 * Supported operations:
 *  - `getById`: Get a chat by its ID
 *  - `getByAssignmentId`: Get all chats for an assignment by its ID
 *  - `create`: Create a new chat
 *  - `update`: Update a chat
 *  - `delete`: Delete a chat
 */
export default class ChatsModel {

    /**
     * Get a chat by its ID
     * 
     * @param id The ID of the chat
     * @returns code: number, message: string, chat: ChatSchema | null
     */
    static async getById(id: number): Promise<{
        code: number,
        message: string,
        chat: ChatSchema | null
    }> {
        const sql = `SELECT * FROM chats WHERE id = ${id}`;
        const q: QueryResponse = await query(sql);
        // Query or connection error
        if(q.result == null) 
            return { code: 500, message: q.message, chat: null };
        // Chat not found
        if(q.result.length == 0) 
            return { code: 404, message: "Chat not found", chat: null };
        // Chat found
        const chat = q.result[0] as ChatSchema;
        return { code: 200, message: "Chat found", chat: chat };
    }

    /**
     * Get all chats for an assignment by its ID
     * 
     * @param assignmentId The ID of the assignment
     * @returns code: number, message: string, chats: ChatSchema[] | null
     */
    static async getByAssignmentId(assignmentId: number): Promise<{
        code: number,
        message: string,
        chats: ChatSchema[] | null
    }> {
        const sql = `SELECT * FROM chats WHERE assignment_id = ${assignmentId} AND saved = 1`;
        const q: QueryResponse = await query(sql);
        // Query or connection error
        if(q.result == null) 
            return { code: 500, message: q.message, chats: null };
        // Chat not found
        if(q.result.length == 0) 
            return { code: 404, message: "Chats not found", chats: null };
        // Chat found
        return { code: 200, message: "Chats found", chats: q.result };
    }


    /**
     * Create a new chat
     * 
     * @param chat The chat object to create
     * @returns code: number, message: string, chat: ChatSchema | null
     */
    static async create(chat: ChatSchema): Promise<{
        code: number,
        message: string,
        chat: ChatSchema | null
    }> {
        const sql = `
            INSERT INTO chats (user_id, assignment_id, documents_used, created_at, saved) 
            VALUES (${chat.user_id}, ${chat.assignment_id}, '${chat.documents_used}', '${chat.created_at}', ${chat.saved})
        `;
        const q: QueryResponse = await query(sql);
        // Query or connection error
        if(q.result == null) 
            return { code: 500, message: q.message, chat: null };
        // Chat created
        return { code: 200, message: "Chat created", chat: chat };
    }


    /**
     * Update a chat by its ID
     * 
     * @param id The chat id
     * @param data The fields to update
     * @returns code: number, message: string, chat: ChatSchema
     */
    static async update(id: number, data: object): Promise<{
        code: number,
        message: string,
        chat: ChatSchema | null
    }> {
        // Write each field in the data to sql
        let sql = `UPDATE chats SET `;
        for(const key in data) {
            sql += `${key}='${data[key]}', `;
        }
        sql = sql.slice(0, -2);
        sql += ` WHERE id=${id}`;

        // Update the assignment
        const res = await query(sql);
        // Query or connection error
        if(res.result === null) 
            return { code: 500, message: res.message, chat: null }
        // Assignment not found
        if(res.result.affectedRows === 0)
            return { code: 404, message: 'Chat not found', chat: null }

        // Success
        const chat = (await this.getById(id)).chat;
        return { code: 200, message: 'Chat updated', chat: chat }
    }

    /**
     * Delete a chat by its ID
     * 
     * @param id The ID of the chat to delete
     * @returns code: number, message: string, chat: ChatSchema | null
     */
    static async delete(id: number): Promise<{
        code: number,
        message: string,
        chat: ChatSchema | null
    }> {    
        // Check if chat exists
        const chatRes = await this.getById(id);
        if(chatRes.code != 200) return chatRes;

        // Delete the chat
        const sql = `DELETE FROM chats WHERE id = ${id}`;
        const q: QueryResponse = await query(sql);
        // Query or connection error
        if(q.result == null) 
            return { code: 500, message: q.message, chat: null };
        // Chat deleted
        return { code: 200, message: "Chat deleted", chat: chatRes.chat };
    }

}