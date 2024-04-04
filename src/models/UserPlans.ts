import { query } from "../db";
import { Model } from "./Model";
import { ApiResponse } from "../response";

export class UserPlansModel {
    
    /**
     * @summary Get user plan(s) from the db, optionally by id
     * @source src/models/UserPlans.ts
     * 
     * @param id The user plan id
     * @returns 
     */
    static async get(id: number = null) {
        return await Model.get('user_plans', id);
    }

    /**
     * @summary Create a new user plan, defaulting to the Free plan.
     * @source src/models/UserPlans.ts
     * 
     * @param userId The user id
     * @returns 
     */
    static async create(userId: number) {
        // Create the user's plan
        const plan_sql = `INSERT INTO user_plans (
            user_id, plan_id
        ) VALUES (
            ${userId}, (SELECT id FROM plans WHERE name='Free')
        )`;
        let qr = await query(plan_sql);
        if(qr.result == null || qr.result.affectedRows == 0) 
            return ApiResponse([], 'Failed to create user plan', qr.message, 500);

        return ApiResponse([qr.result], 'User plan created successfully', '', 201);
    }

    /**
     * @summary Delete a user plan by id
     * @source src/models/UserPlans.ts
     * 
     * @param id The user plan id
     * @returns 
     */
    static async delete(id: number) {
        // Delete the user's plan
        const delete_sql = `DELETE FROM user_plans WHERE id=${id}`;
        let qr = await query(delete_sql);
        if(qr.result == null || qr.result.affectedRows == 0) 
            return ApiResponse([], 'Failed to delete user plan', qr.message, 500);

        return ApiResponse([], 'User plan deleted successfully', '', 200);
    }
}