import { query } from "../db";
import { Model } from "./Model";
import { ForumSchema } from "../schema";
import { IApiResponse, ApiResponse } from "../response";

export class ForumsModel {

    /**
     * Get all forums, or a specific forum by id
     *      See `models/Model.ts` for implementation
     */
    static async get(id: number = null): Promise<IApiResponse> {
        return await Model.get('forums', id);
    }

    /**
     * Create a new forum with a given user
     * @param userId The id of the user creating the forum
     * @param name The display name of the forum
     * @param tagId The unique string identifier for the forum
     * @param thumbnailUrl A URL to the forum's thumbnail image or null
     * @returns A response object with the new forum and forum user
     */
    static async new(userId: number, name: string, tagId: string, thumbnailUrl: string | null = null): Promise<IApiResponse> {
        // Create the new forum in the database
        const forum_sql = `INSERT INTO forums (
            name, tag_id, thumbnail_url, user_count, users_online, post_count, comment_count, score
        ) VALUES (
            '${name}', '${tagId}', '${thumbnailUrl}', 1, 1, 0, 0, 0
        )`;
        const forumResult = await query(forum_sql);
        // Check successful forum creation
        if(forumResult.result == null || forumResult.result.affectedRows === 0)
            return ApiResponse([], 'Failed to create forum', forumResult.message, 500);
        // Retrieve the new forum
        const forum: ForumSchema = (await this.get(forumResult.result.insertId)).rows[0] as ForumSchema;

        // Add the user to forum_users
        const forum_users_sql = `INSERT INTO forum_users (
            user_id, forum_id, founder, admin
        ) VALUES (
            ${userId}, ${forum.id}, 1, 1
        )`;
        const forumUsersResult = await query(forum_users_sql);
        // Check successful forum user creation
        if(forumUsersResult.result == null || forumUsersResult.result.affectedRows === 0) 
            return ApiResponse([], 'Failed to add creating user to forum', forumUsersResult.message, 500);

        // Return the response
        return ApiResponse([forum], 'Forum created', '', 200);
    }
}