import { query } from "../db";
import { CourseSchema } from "../schema";
import { CourseEventDefinitionSchema } from "../schema/course_events";

export class CoursesModel {

    /**
     * Get all courses
     * @param id The course ID
     * @returns code: number, message: string, course: CourseSchema
     */
    static async getAll(): Promise<{
        code: number,
        message: string,
        courses: CourseSchema[]
    }> {
        const sql = `SELECT * FROM courses`;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, courses: [] };
        if(res.result.length == 0) 
            return { code: 404, message: 'No courses found', courses: [] };
        return { code: 200, message: 'Courses found', courses: res.result };
    }

    /**
     * Get a course by its ID
     * 
     * @param id The course ID
     * @returns Course if found, null if not found
     */
    static async getById(id: number): Promise<{
        code: number,
        message: string,
        course: CourseSchema
    }> {
        const sql = `SELECT * FROM courses WHERE id=${id}`;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, course: null };
        if(res.result.length == 0) 
            return { code: 404, message: 'Assignment not found', course: null };
        return { code: 200, message: 'Assignment found', course: res.result[0] };
    }

    /**
     * Get all courses for a given user id
     * 
     * @param userId The user id
     * @returns 
     */
    static async getByUserId(userId: number): Promise<{
        code: number,
        message: string,
        courses: CourseSchema[]
    }> {
        const sql = `SELECT * FROM courses WHERE user_id=${userId}`;
        let res = await query(sql);
        if(res.result == null) 
            return { code: 500, message: res.message, courses: [] };
        if(res.result.length == 0) 
            return { code: 404, message: 'No courses found', courses: [] };
        return { code: 200, message: 'Courses found', courses: res.result };
    }

    /**
     * Create a new course
     * 
     * @param c The course schema
     * @param eventDefs The event definitions for the course
     * @returns 
     */
    static async create(c: CourseSchema, eventDefs: CourseEventDefinitionSchema[]): Promise<{
        code: number,
        message: string,
        course: CourseSchema
    }> {
        // Create the new course
        const course_sql = `INSERT INTO courses (
            user_id, title, subject, number, professor, building, room, color, thumbnail_url, start_date, end_date
        ) VALUES (
            ${c.user_id}, '${c.title}', '${c.subject}', '${c.number}', '${c.professor}', '${c.building}', '${c.room}', '${c.color}', '${c.thumbnail_url}', '${c.start_date}', '${c.end_date}'
        )`;
        let qr = await query(course_sql);
        if(qr.result == null || qr.result.affectedRows == 0) 
            return { code: 500, message: qr.message, course: null };
        const course: CourseSchema = (await this.getById(qr.result.insertId)).course;

        // Add all course events based on the course event definition
        eventDefs.forEach(async (eventDef) => {
            // Repeating event - create an event for each valid day in the range
            if(eventDef.rule === "repeat") {
                const start = new Date(c.start_date);
                const end = new Date(c.end_date);
                let current = start;
                while(current <= end) {
                    const dayString = current.toISOString().split('T')[0];
                    if(eventDef.days[current.getDay()]) {
                        // Create the new course event
                        const course_event_sql = `INSERT INTO course_events (
                            course_id, title, date, start_time, end_time, length, type
                        ) VALUES (
                            '${course.id}', '${eventDef.name}', '${dayString}', '${dayString} ${eventDef.startTime}', '${dayString} ${eventDef.endTime}', 0.00, '${eventDef.rule}'
                        )`;
                        let qr = await query(course_event_sql);
                        if(qr.result == null || qr.result.affectedRows == 0) 
                            return { code: 500, message: 'Failed to create course event', course: null };
                    }
                    // Increment the current date
                    current.setDate(current.getDate() + 1);
                }
            }
            // One-off event
            else if(eventDef.rule === "oneoff") {
                // Create the new course event
                const course_event_sql = `INSERT INTO course_events (
                    course_id, title, date, start_time, end_time, length, type
                ) VALUES (
                    '${course.id}', '${eventDef.name}', '${eventDef.date}', '${eventDef.date} ${eventDef.startTime}', '${eventDef.date} ${eventDef.endTime}', 0.00, '${eventDef.rule}'
                )`;
                let qr = await query(course_event_sql);
                if(qr.result == null || qr.result.affectedRows == 0) 
                    return { code: 500, message: 'Failed to create course event', course: null };
            }
        }); 

        return { code: 200, message: 'Course created successfully', course: course };
    }

    /**
     * @summary Delete a course by id
     * @source src/models/Courses.ts
     * 
     * @param id The course id
     * @returns 
     */
    static async delete(id: number): 
    Promise<{
        code: number,
        message: string,
        course: CourseSchema
    }> {
        // Delete the course
        const get_sql = `SELECT * FROM courses WHERE id=${id}`;
        let get_res = await query(get_sql);
        const delete_sql = `DELETE FROM courses WHERE id=${id}`;
        let res = await query(delete_sql);
        if(res.result == null) 
            return { code: 500, message: res.message, course: null }
        if(res.result.affectedRows === 0)
            return { code: 404, message: 'Course not found', course: null };
        
        return { code: 200, message: 'Course deleted successfully', course: get_res.result[0] };
    }

    /**
     * Update a course by its ID
     * 
     * @param id The course id
     * @param data The data to update
     */
    static async update(id: number, data: object): Promise<{
        code: number,
        message: string,
        course: CourseSchema
    }> {
        // Write each field in the data to sql
        let sql = `UPDATE courses SET `;
        for(const key in data) {
            sql += `${key}='${data[key]}', `;
        }
        sql = sql.slice(0, -2);
        sql += ` WHERE id=${id}`;

        // Update a course
        const res = await query(sql);
        if(res.result === null) 
            return { code: 500, message: res.message, course: null };
        if(res.result.affectedRows === 0)
            return { code: 404, message: 'Course not found', course: null };

        // Success
        const course = (await this.getById(id)).course;
        return { code: 200, message: 'Course updated', course: course };
    }
}