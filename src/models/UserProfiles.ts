import { query } from "../db/index";
import { Model } from "./Model";
import { IApiResponse, ApiResponse } from "../response";
import { UserProfileSchema } from "../schema";

export class UserProfilesModel {

    static async getById(id: number){
        const sql = `SELECT * FROM user_profiles WHERE id=${id}`;
        const res = await query(sql);

        if(res.result === null) 
            return { code: 500, message: res.message, user_profile: null };
        if(res.result.length === 0) 
            return { code: 404, message: 'User profile not found', user_profile: null };

        // Success
        return { code: 200, message: 'User profile found', user_profile: res.result[0] };
    
    };

    static async getByUserId(user_id: number){
        const sql = `SELECT * FROM user_profiles WHERE user_id=${user_id}`;
        const res = await query(sql);

        if(res.result === null) 
            return { code: 500, message: res.message, user_profile: null };
        if(res.result.length === 0) 
            return { code: 404, message: `User profile not found for user ${user_id}`, user_profile: null };

        // Success
        return { code: 200, message: 'User profile found', user_profile: res.result[0] };
    
    };

    static async updateById(id: number, data: object) {
        // Write each field in the data to sql
        let sql = `UPDATE user_profiles SET `;
        for(let key in data) {
            sql += `${key}='${data[key]}', `;
        }
        sql = sql.slice(0, -2);
        sql += ` WHERE id=${id}`;

        // Execute the query
        const res = await query(sql);
        if(res.result === null) 
            return { code: 500, message: res.message, user_profile: null };
        if(res.result.affectedRows === 0)
            return { code: 404, message: 'User profile not found', user_profile: null };

        // Success
        const updated = (await this.getById(id)).user_profile;
        return { code: 200, message: 'User profile updated', user_profile: updated };
    }

    static async updateByUserId(user_id: number, data: object) {
        // Write each field in the data to sql
        let sql = `UPDATE user_profiles SET `;
        for(let key in data) {
            sql += `${key}='${data[key]}', `;
        }
        sql = sql.slice(0, -2);
        sql += ` WHERE user_id=${user_id}`;

        // Execute the query
        const res = await query(sql);
        if(res.result === null) 
            return { code: 500, message: res.message, user_profile: null };
        if(res.result.affectedRows === 0)
            return { code: 404, message: 'User profile not found', user_profile: null };

        // Success
        const updated = (await this.getByUserId(user_id)).user_profile;
        return { code: 200, message: 'User profile updated', user_profile: updated };
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