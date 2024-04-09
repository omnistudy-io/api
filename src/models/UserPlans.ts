import { query } from "../db";
import { Model } from "./Model";
import { ApiResponse } from "../response";

export class UserPlansModel {

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

    static async getByUserId(userId: number) {
        // Get the user's plan
        const sql = `SELECT * FROM user_plans WHERE user_id=${userId}`;
        let qr = await query(sql);
        
        // Query or connection error
        if(qr.result == null)
            return { code: 500, message: qr.message, user_plan: null };
        // No user plan found
        if(qr.result.length == 0)
            return { code: 404, message: 'User plan not found', user_plan: null };

        // Success
        return { code: 200, message: 'User plan found', user_plan: qr.result[0] };
    }

    static async update(userId: number, data: object) {
        let sql = `UPDATE user_plans SET `;
        for(const key in data) {
            sql += `${key}=${data[key]}, `;
        }
        sql = sql.slice(0, -2);
        sql += ` WHERE user_id=${userId}`;
        let qr = await query(sql);
        
        // Query or connection error
        if(qr.result == null)
            return { code: 500, message: qr.message, user_plan: null };
        // No user plan found
        if(qr.result.affectedRows == 0)
            return { code: 404, message: 'User plan not found', user_plan: null };

        // Success
        const updated = (await this.getByUserId(userId)).user_plan;
        return { code: 200, message: 'User plan updated', user_plan: updated };
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