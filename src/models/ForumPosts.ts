import { query } from "../db";
import { Model } from "./Model";
import { ForumPostSchema } from "../schema";
import { IApiResponse, ApiResponse } from "../response";

export class ForumPostsModel {
    /**
     * Retrieve forum posts, optionally by their id.
     * If no id is provided, all forum posts are retrieved
     * 
     * @param id The id of the forum post to retrieve
     * @returns IApiResponse with the forum post(s), or empty array if not found or error
     */
    static async get(id: number = null): Promise<IApiResponse> {
        return await Model.get('forum_posts', id);
    }

    /**
     * Create a new post
     * @param userId The id of the user creating the post
     * @param forumId The id of the forum the post is in
     * @param title The title of the post
     * @param content The content of the post
     * @returns IApiResponse with the new post
     */
    static async new(userId: number, forumId: number, title: string, content: string): Promise<IApiResponse> {
        // Create the new post in the database
        const post_sql = `INSERT INTO forum_posts (
            title, user_id, forum_id, content, likes, dislikes
        ) VALUES (
            '${title}', ${userId}, ${forumId}, '${content}', 0, 0
        )`;
        const postResult = await query(post_sql);

        // Check successful post creation
        if(postResult.result == null || postResult.result.affectedRows === 0)
            return ApiResponse([], 'Failed to create post', postResult.message, 500);
        // Retrieve the new post
        const post = <ForumPostSchema> (await this.get(postResult.result.insertId)).rows[0];

        // Return the response
        return ApiResponse([post], 'Post created', '', 200);
    }
}