import { query } from "../db/index";
import { Model } from "./Model";
import { IApiResponse, ApiResponse } from "../response";
import { UserProfileSchema } from "../schema";

export class UserProfilesModel {
    
    /**
     * @summary Get user profile(s) from the db, optionally by id
     * @source src/models/UserProfiles.ts
     * 
     * @param id The user id
     * @returns 
     */
    static async get(id: number = null): Promise<IApiResponse> {
        return await Model.get('user_profiles', id);
    }

    /**
     * @summary Create a new user profile
     * @source src/models/UserProfiles.ts
     * 
     * @param userId The user id
     * @returns 
     */
    static async create(userId: number): Promise<IApiResponse> {
        // Create the user's profile
        const profile_sql = `INSERT INTO user_profiles (
            user_id
        ) VALUES (
            ${userId}
        )`;
        let qr = await query(profile_sql);
        if(qr.result == null || qr.result.affectedRows == 0) 
            return ApiResponse([], 'Failed to create user profile', qr.message, 500);

        return ApiResponse([qr.result], 'User profile created successfully', '', 201);
    }

    /**
     * @summary Delete a user profile
     * @source src/models/UserProfiles.ts
     * 
     * @param id The user id
     * @returns 
     */
    static async delete(id: number): Promise<IApiResponse> {
        // Delete the user's profile
        const delete_sql = `DELETE FROM user_profiles WHERE id=${id}`;
        let qr = await query(delete_sql);
        if(qr.result == null || qr.result.affectedRows == 0) 
            return ApiResponse([], 'Failed to delete user profile', qr.message, 500);

        return ApiResponse([], 'User profile deleted successfully', '', 200);
    }
}