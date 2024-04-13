import { query } from "../db";
import { Model } from "./Model";
import { IApiResponse, ApiResponse } from "../response";
import { CourseEventSchema } from "../schema";

export class CourseEventsModel {

    /**
     * Get a course event by its ID
     * 
     * @param id The course event ID
     * @returns code: number, message: string, course_event: CourseEventSchema
     */
    static async getById(id: number):
    Promise<{
        code: number,
        message: string,
        course_event: CourseEventSchema
    }>
    {
        const sql = `SELECT * FROM course_events WHERE id=${id}`;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, course_event: null };
        if(res.result.length == 0) 
            return { code: 404, message: 'Course event not found', course_event: null };
        return { code: 200, message: 'Course event found', course_event: res.result[0] };
    }

    /**
     * Get course events by a course ID
     * 
     * @param courseId The ID of the course
     * @returns code: number, message: string, course_events: CourseEventSchema[]
     */
    static async getByCourseId(courseId: number): 
    Promise<{ 
        code: number, 
        message: string, 
        course_events: CourseEventSchema[] 
    }> 
    {
        const sql = `SELECT * FROM course_events WHERE course_id=${courseId}`;
        let res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, course_events: [] };
        if(res.result.affectedRows == 0) 
            return { code: 404, message: 'No course events found', course_events: [] };
        return { code: 200, message: 'Course events found', course_events: res.result };
    }

    static async create(ce: CourseEventSchema) {
        // Create the new course event
        const course_event_sql = `INSERT INTO course_events (
            course_id, title, date, start_time, end_time, length, type
        ) VALUES (
            '${ce.course_id}', '${ce.title}', '${ce.date}', '${ce.start_time}', '${ce.end_time}', '${ce.length}', '${ce.type}'
        )`;
        let qr = await query(course_event_sql);
        if(qr.result == null || qr.result.affectedRows == 0) 
            return ApiResponse([], 'Failed to create course event', qr.message, 500);

        return ApiResponse([qr.result], 'Course event created successfully', '', 201);
    }

    /**
     * @summary Delete a course event by id
     * @source src/models/CourseEvents.ts
     * 
     * @param id The course event id
     * @returns 
     */
    static async delete(id: number): Promise<IApiResponse> {
        // Delete the course event
        const delete_sql = `DELETE FROM course_events WHERE id=${id}`;
        let qr = await query(delete_sql);
        if(qr.result == null || qr.result.affectedRows == 0) 
            return ApiResponse([], 'Failed to delete course event', qr.message, 500);

        return ApiResponse([], 'Course event deleted successfully', '', 200);
    }

}