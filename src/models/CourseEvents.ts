import { query } from "../db";
import { Model } from "./Model";
import { IApiResponse, ApiResponse } from "../response";
import { CourseEventSchema } from "../schema";

export class CourseEventsModel {

    /**
     * @summary Get course event(s) from the db, optionally by id
     * @source src/models/CourseEvents.ts
     * 
     * @param id The course event id
     * @returns 
     */
    static async get(id: number = null): Promise<IApiResponse> {
        return await Model.get('course_events', id);
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