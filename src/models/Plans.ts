import { query } from "../db";
import { PlanSchema, PlanFeatureSchema } from "../schema";

export class PlansModel {

    /**
     * Get a list of all plans
     * 
     * @returns code: number, message: string, plans: PlanSchema
     */
    static async getAll(): Promise<{
        code: number,
        message: string,
        plans: PlanSchema[]
    }> {
        const sql = `SELECT * FROM plans`;
        const res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, plans: null };
        if(res.result.length === 0)
            return { code: 404, message: 'No plans found', plans: null };
        // Success
        return { code: 200, message: 'Plans found', plans: res.result };
    }

    /**
     * Get a plan by its id
     * 
     * @param id The id of the plan
     * @returns code: number, message: string, plan: PlanSchema
     */
    static async getById(id: number): Promise<{
        code: number,
        message: string,
        plan: PlanSchema
    }> {
        const sql = `SELECT * FROM plans WHERE id=${id}`;
        const res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, plan: null };
        if(res.result.length === 0)
            return { code: 404, message: 'Plan not found', plan: null };
        // Success
        return { code: 200, message: 'Plan found', plan: res.result[0] };
    }

    /**
     * Get a plan's features by its id
     * 
     * @param id The id of the plan
     * @returns code: number, message: string, features: PlanFeatureSchema
     */
    static async getFeatures(id: number): Promise<{
        code: number,
        message: string,
        features: PlanFeatureSchema[]
    }> {
        const sql = `SELECT * FROM plan_features WHERE plan_id=${id}`;
        const res = await query(sql);
        if(res.result == null)
            return { code: 500, message: res.message, features: null };
        if(res.result.length === 0)
            return { code: 404, message: 'No features found', features: null };
        // Success
        return { code: 200, message: 'Features found', features: res.result };
    }

}