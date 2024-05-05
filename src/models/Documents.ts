import { query } from "../db";
import { DocumentSchema } from "../schema";

export class DocumentsModel {

    /**
     * Get a document by its ID
     * 
     * @param id The id of the document
     * @returns code: number, message: string, doc: UserAiDocSchema
     */
    static async getById(id: number): Promise<{
        code: number,
        message: string,
        doc: DocumentSchema
    }> {
        const sql = `SELECT * FROM documents WHERE id=${id}`;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, doc: null };
        if(res.result.length == 0) 
            return { code: 404, message: 'Document not found', doc: null };

        return { code: 200, message: 'Document found', doc: res.result[0] };
    }

    /**
     * Get all documents for a given user id
     * 
     * @param userId Id of the user
     * @returns code: number, message: string, docs: UserAiDocSchema[]
     */
    static async getByUserId(userId: number): Promise<{
        code: number,
        message: string,
        docs: DocumentSchema[]
    }> {
        const sql = `SELECT * FROM documents WHERE user_id=${userId}`;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, docs: [] };
        if(res.result.length == 0)
            return { code: 404, message: 'No documents found', docs: [] };

        return { code: 200, message: 'Documents found', docs: res.result };
    }

    /**
     * Create a new document
     * 
     * @param doc Document to create
     * @returns code: number, message: string, doc: UserAiDocSchema
     */
    static async create(doc: DocumentSchema): Promise<{
        code: number,
        message: string,
        doc: DocumentSchema
    }> {
        const sql = `INSERT INTO documents (
            user_id, course_id, assignment_id, exam_id, title, ext, url, ext_icon_url, is_note
        ) VALUES (
            ${doc.user_id}, ${doc.course_id}, ${doc.assignment_id}, ${doc.exam_id}, 
            '${doc.title}', '${doc.ext}', '${doc.url}', '${doc.ext_icon_url}', ${doc.is_note}
        )`;
        console.log("CREATE DOC SQL: ", sql);
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, doc: null };
        if(res.result.affectedRows == 0)
            return { code: 400, message: 'Document not created', doc: null };

        // Get the new document
        const newId = res.result.insertId;
        let newDocRes = await this.getById(newId);
        if(newDocRes.code != 200)
            return newDocRes;
        return { code: 201, message: 'Document created', doc: newDocRes.doc };
    }

    /**
     * Update a document by its ID
     * 
     * @param id The document id
     * @param data The fields to update
     * @returns code: number, message: string, document: DocumentSchema
     */
    static async update(id: number, data: object) {
        // Write each field in the data to sql
        let sql = `UPDATE documents SET `;
        for(const key in data) {
            sql += `${key}=${data[key] !== "null" ? `'${data[key]}'` : "NULL"}, `;
        }
        sql = sql.slice(0, -2);
        sql += ` WHERE id=${id}`;

        // Update the document
        const res = await query(sql);
        if(res.result === null) 
            return { code: 500, message: res.message, doc: null }
        if(res.result.affectedRows === 0)
            return { code: 404, message: 'Document not found', doc: null }

        // Success
        const doc = (await this.getById(id)).doc;
        return { code: 200, message: 'Document updated', doc: doc }
    }

    /**
     * Delete a document by its ID
     * 
     * @param id The id of the document
     * @returns code: number, message: string, 
     */
    static async delete(id: number) {
        // Get the document
        let docRes = await this.getById(id);
        if(docRes.code != 200)
            return docRes;
        const doc = docRes.doc;

        // Delete the document
        const sql = `DELETE FROM documents WHERE id=${id}`;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, doc: null };
        if(res.result.affectedRows == 0)
            return { code: 404, message: 'Document not found', doc: null };

        return { code: 200, message: 'Document deleted', doc: doc };
    }

}