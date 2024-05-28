import { query } from "../db";
import { AssignmentSchema } from "../schema";

export class AssignmentsModel {

    /**
     * Get an assignment by its ID
     * 
     * @param id The assignment ID
     * @returns code number, message: string, assignment: AssignmentSchema
     */
    static async getById(id: number): Promise<{
        code: number,
        message: string,
        assignment: AssignmentSchema
    }> {
        const sql = `
            SELECT a.*, c.title as courseTitle, c.subject as courseSubject, c.number as courseNumber
            FROM assignments a, courses c
            WHERE a.id=${id} AND a.course_id=c.id
        `;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, assignment: null };
        if(res.result.length == 0) 
            return { code: 404, message: 'Assignment not found', assignment: null };
        return { code: 200, message: 'Assignment found', assignment: res.result[0] };
    }


    /**
     * Get all assignments for a given course ID
     * 
     * @param courseId The course ID
     * @returns code: number, message: string, assignments: AssignmentSchema[]
     */
    static async getByCourseId(courseId: number): Promise<{
        code: number,
        message: string,
        assignments: AssignmentSchema[]
    }> {
        const sql = `
            SELECT a.*, c.title as courseTitle, c.subject as courseSubject, c.number as courseNumber
            FROM users u, courses c, assignments a
            WHERE c.id=${courseId} AND u.id=c.user_id AND c.id=a.course_id
        `;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, assignments: [] };
        if(res.result.length == 0) 
            return { code: 404, message: 'No assignments found', assignments: [] };
        return { code: 200, message: 'Assignments found', assignments: res.result };
    }


    /**
     * Get all assignments for a given user ID
     * 
     * @param userId The user id
     * @returns code: number, message: string, assignments: AssignmentSchema[]
     */
    static async getByUserId(userId: number): Promise<{
        code: number,
        message: string,
        assignments: AssignmentSchema[]
    }> {
        const sql = `
            SELECT a.*, c.title as courseTitle, c.subject as courseSubject, c.number as courseNumber
            FROM users u, courses c, assignments a
            WHERE u.id=${userId} AND u.id=c.user_id AND c.id=a.course_id
        `;
        const res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, assignments: [] };
        if(res.result.length == 0)
            return { code: 404, message: 'No assignments found', assignments: [] };
        // Success
        return { code: 200, message: 'Assignments found', assignments: res.result };
    }


    /**
     * Create a new assignment
     * 
     * @param assignment Assignment data object
     * @returns code: number, message: string, assignment: AssignmentSchema
     */
    static async create(a: AssignmentSchema) {
        const sql = `INSERT INTO assignments (
            course_id, title, description, progress, created_at, due_at
        ) VALUES (
            '${a.course_id}', '${a.title}', '${a.description}', 0, NOW() - INTERVAL 5 hour, '${a.due_at}'
        )`;
        let res = await query(sql);
        // Query or connection error
        if(res.result == null)
            return { code: 500, message: res.message, assignment: null };

        const get_sql = `SELECT * FROM assignments WHERE id=${res.result.insertId}`;
        let get_res = await query(get_sql);
        // Successful creation
        return { code: 201, message: 'Assignment created successfully', assignment: get_res.result[0] };
    }


    /**
     * Update an assignment by its ID
     * 
     * @param id The assignment id
     * @param data The fields to update
     * @returns code: number, message: string, assignment: AssignmentSchema
     */
    static async update(id: number, data: object) {
        // Write each field in the data to sql
        let sql = `UPDATE assignments SET `;
        for(const key in data) {
            sql += `${key}='${data[key]}', `;
        }
        sql = sql.slice(0, -2);
        sql += ` WHERE id=${id}`;

        // Update the assignment
        const res = await query(sql);
        if(res.result === null) 
            return { code: 500, message: res.message, assignment: null }
        if(res.result.affectedRows === 0)
            return { code: 404, message: 'Assignment not found', assignment: null }

        // Success
        const assignment = (await this.getById(id)).assignment;
        return { code: 200, message: 'Assignment updated', assignment: assignment }
    }

    
    /**
     * Delete an assignment by its ID
     * 
     * @param id The assignment id
     * @returns code: number, message: string, assignment: AssignmentSchema
     */
    static async delete(id: number) {
        const get_sql = `SELECT * FROM assignments WHERE id=${id}`;
        let get_res = await query(get_sql);
        const delete_sql = `DELETE FROM assignments WHERE id=${id}`;
        let res = await query(delete_sql);
        if(res.result == null) 
            return { code: 500, message: res.message, assignment: null }
        if(res.result.affectedRows === 0)
            return { code: 404, message: 'Assignment not found', assignment: null };
        
        return { code: 200, message: 'Assignment deleted successfully', assignment: get_res.result[0] };
    }

}