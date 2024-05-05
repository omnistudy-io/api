import { query } from "../db";
import { ExamSchema } from "../schema";

export class ExamsModel {

    /**
     * Get an exam by its ID
     * 
     * @param id The exam ID
     * @returns code number, message: string, exam: ExamSchema
     */
    static async getById(id: number): Promise<{
        code: number,
        message: string,
        exam: ExamSchema
    }> {
        const sql = `
            SELECT e.*, c.title as courseTitle, c.number as courseNumber, c.subject as courseSubject 
            FROM exams e, courses c
            WHERE e.id=${id} AND e.course_id=c.id
        `;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, exam: null };
        if(res.result.length == 0) 
            return { code: 404, message: 'Exam not found', exam: null };
        return { code: 200, message: 'Exam found', exam: res.result[0] };
    }


    /**
     * Get all exams for a given course ID
     * 
     * @param courseId The course ID
     * @returns code: number, message: string, exams: ExamSchema[]
     */
    static async getByCourseId(courseId: number): Promise<{
        code: number,
        message: string,
        exams: ExamSchema[]
    }> {
        const sql = `
            SELECT e.*, c.title as courseTitle
            FROM users u, courses c, exams e
            WHERE c.id=${courseId} AND u.id=c.user_id AND c.id=e.course_id
        `;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, exams: [] };
        if(res.result.length == 0) 
            return { code: 404, message: 'No exams found', exams: [] };
        return { code: 200, message: 'Exams found', exams: res.result };
    }


    /**
     * Get all exams for a given user ID
     *
     * @param userId The user id
     * @returns code: number, message: string, exams: ExamSchema[]
     */
    static async getByUserId(userId: number): Promise<{
        code: number,
        message: string,
        exams: ExamSchema[]
    }> {
        const sql = `
            SELECT e.*, c.title as courseTitle
            FROM users u, courses c, exams e
            WHERE u.id=${userId} AND u.id=c.user_id AND c.id=e.course_id
        `;
        const res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, exams: [] };
        if(res.result.length == 0)
            return { code: 404, message: 'No exams found', exams: [] };
        // Success
        return { code: 200, message: 'Exams found', exams: res.result };
    }


    /**
     * Create a new exam
     * 
     * @param exam Exam data object
     * @returns code: number, message: string, exam: ExamSchema
     */
    static async create(exam: ExamSchema): Promise<{
        code: number,
        message: string,
        exam: ExamSchema
    }> {
        const sql = `INSERT INTO exams (
            course_id, title, description, building, room, seat, date, start_time, end_time
        ) VALUES (
            '${exam.course_id}', '${exam.title}', '${exam.description}', '${exam.building}', '${exam.room}', '${exam.seat}', '${exam.date}', '${exam.start_time}', '${exam.end_time}'
        )`;
        let res = await query(sql);
        // Query or connection error
        if(res.result == null)
            return { code: 500, message: res.message, exam: null };

        const newExam = (await this.getById(res.result.insertId)).exam;
        // Successful creation
        return { code: 201, message: 'Exam created successfully', exam: newExam };
    }


    /**
     * Update an exam by its ID
     * 
     * @param id The exam id
     * @param data The fields to update
     * @returns code: number, message: string, exam: ExamSchema
     */
    static async update(id: number, data: object) {
        // Write each field in the data to sql
        let sql = `UPDATE exams SET `;
        for(const key in data) {
            sql += `${key}='${data[key]}', `;
        }
        sql = sql.slice(0, -2);
        sql += ` WHERE id=${id}`;

        // Update the exam
        const res = await query(sql);
        if(res.result === null) 
            return { code: 500, message: res.message, exam: null }
        if(res.result.affectedRows === 0)
            return { code: 404, message: 'Exam not found', exam: null }

        // Success
        const exam = (await this.getById(id)).exam;
        return { code: 200, message: 'Exam updated', exam: exam }
    }

    
    /**
     * Delete an exam by its ID
     * 
     * @param id The exam id
     * @returns code: number, message: string, exam: ExamSchema
     */
    static async delete(id: number): Promise<{
        code: number,
        message: string,
        exam: ExamSchema 
    }> {
        const get_sql = `SELECT * FROM exams WHERE id=${id}`;
        let get_res = await query(get_sql);
        const delete_sql = `DELETE FROM exams WHERE id=${id}`;
        let res = await query(delete_sql);
        if(res.result == null) 
            return { code: 500, message: res.message, exam: null }
        if(res.result.affectedRows === 0)
            return { code: 404, message: 'Exam not found', exam: null };
        
        return { code: 200, message: 'Exam deleted successfully', exam: get_res.result[0] };
    }

}