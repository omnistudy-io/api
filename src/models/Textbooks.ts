import { query } from "../db";
import { TextbookSchema } from "../schema";

export class TextbooksModel {

    /**
     * Get an textbook by its ID
     * 
     * @param id The textbook ID
     * @returns code number, message: string, textbook: TextbookSchema
     */
    static async getById(id: number): Promise<{
        code: number,
        message: string,
        textbook: TextbookSchema
    }> {
        const sql = `SELECT * FROM textbooks WHERE id=${id}`;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, textbook: null };
        if(res.result.length == 0) 
            return { code: 404, message: 'Textbook not found', textbook: null };
        return { code: 200, message: 'Textbook found', textbook: res.result[0] };
    }

    /**
     * Get all textbooks for a given user ID
     * 
     * @param userId The user id
     * @returns code: number, message: string, textbooks: TextbookSchema[]
     */
    static async getByUserId(userId: number): Promise<{
        code: number,
        message: string,
        textbooks: TextbookSchema[]
    }> {
        const sql = `
            SELECT a.*, c.title as courseTitle
            FROM users u, courses c, textbooks a
            WHERE u.id=${userId} AND u.id=c.user_id AND c.id=a.course_id
        `;
        const res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, textbooks: [] };
        if(res.result.length == 0)
            return { code: 404, message: 'No textbooks found', textbooks: [] };
        // Success
        return { code: 200, message: 'Textbooks found', textbooks: res.result };
    }
     
    /**
     * Create a new textbook
     * 
     * @param textbook Textbook data object
     * @returns code: number, message: string, textbook: TextbookSchema
     */
    static async create(a: TextbookSchema) {
        const sql = `INSERT INTO textbooks (
            id, course_id, title, title_long, isbn, isbn13, publisher, pages, image, due_at, temp_content
        ) VALUES (
            '${a.id}','${a.course_id}', '${a.title}', '${a.title_long}','${a.isbn}','${a.isbn13}',
            '${a.publisher}','${a.pages}','${a.image}', NOW(), '${a.temp_content}'
        )`;

        let res = await query(sql);
        // Query or connection error
        if(res.result == null)
            return { code: 500, message: res.message, textbook: null };

        const get_sql = `SELECT * FROM textbooks WHERE id=${res.result.insertId}`;
        let get_res = await query(get_sql);
        // Successful creation
        return { code: 201, message: 'Textbook created successfully', textbook: get_res.result[0] };
    }

    static async uploadContent(id: number, content: string) {
        const sql = `UPDATE textbooks SET content='${content}' WHERE id=${id}`;   
        let res = await query(sql);
        if (res.result == null)
            return { code: 500, message: res.message };
        return { code: 200, message: 'Textbook content uploaded successfully' };
    } 

    /**
     * Delete an textbook by its ID
     * 
     * @param id The textbook id
     * @returns code: number, message: string, textbook: TextbookSchema
     */
    static async delete(id: number) {
        const get_sql = `SELECT * FROM textbooks WHERE id=${id}`;
        let get_res = await query(get_sql);
        const delete_sql = `DELETE FROM textbooks WHERE id=${id}`;
        let res = await query(delete_sql);
        if(res.result == null) 
            return { code: 500, message: res.message, textbook: null }
        if(res.result.affectedRows === 0)
            return { code: 404, message: 'Textbook not found', textbook: null };
        
        return { code: 200, message: 'Textbook deleted successfully', textbook: get_res.result[0] };
    }
    /**
     * Delete temp_content from textbook by its ID
     * 
     * @param id The textbook id
     */
    static async delete_temp_content(id: number) {
        const update_sql = `UPDATE textbooks SET temp_content=NULL WHERE id=${id}`;
        const res = await query(update_sql);
        if(res.result == null) 
            return { code: 500, message: res.message, textbook: null }
        if(res.result.affectedRows === 0)
            return { code: 404, message: 'Textbook not found', textbook: null };

        return { code: 200, message: 'Temporary content deleted successfully' };
    }

}