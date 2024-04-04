import { query } from "../db";
import { Model } from "./Model";
import { IApiResponse, ApiResponse } from "../response";
import { CourseSchema } from "../schema";
import { CourseEventDefinitionSchema } from "../schema/course_events";

export class CoursesModel {

    /**
     * @summary Get course(s) from the db, optionally by id
     * @source src/models/Courses.ts
     * 
     * @param id The course id
     * @returns 
     */
    static async get(id: number = null): Promise<IApiResponse> {
        return await Model.get('courses', id);
    }

    static async create(c: CourseSchema, eventDefs: CourseEventDefinitionSchema[]) {
        // Create the new course
        const course_sql = `INSERT INTO courses (
            user_id, title, subject, number, professor, building, room, color, thumbnail_url, start_date, end_date
        ) VALUES (
            ${c.user_id}, '${c.title}', '${c.subject}', '${c.number}', '${c.professor}', '${c.building}', '${c.room}', '${c.color}', '${c.thumbnail_url}', '${c.start_date}', '${c.end_date}'
        )`;
        let qr = await query(course_sql);
        if(qr.result == null || qr.result.affectedRows == 0) 
            return ApiResponse([], 'Failed to create course', qr.message, 500);
        const course: CourseSchema = (await this.get(qr.result.insertId)).rows[0] as CourseSchema;

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
                            return ApiResponse([], 'Failed to create course event', qr.message, 500);
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
                    return ApiResponse([], 'Failed to create course event', qr.message, 500);
            }
        }); 

        return ApiResponse([course], 'Course created successfully', '', 201);
    }

    /**
     * @summary Delete a course by id
     * @source src/models/Courses.ts
     * 
     * @param id The course id
     * @returns 
     */
    static async delete(id: number): Promise<IApiResponse> {
        // Delete the course
        const delete_sql = `DELETE FROM courses WHERE id=${id}`;
        let qr = await query(delete_sql);
        if(qr.result == null || qr.result.affectedRows == 0) 
            return ApiResponse([], 'Failed to delete course', qr.message, 500);

        return ApiResponse([], 'Course deleted successfully', '', 200);
    }
}