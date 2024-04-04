import { query } from "../db";
import { IApiResponse, ApiResponse } from "../response";

export class Model {
    static async get(tableName: string, id: number = null): Promise<IApiResponse> {
        const sql = `SELECT * FROM ${tableName} WHERE id LIKE '${id != null ? id : '%'}'`;
        const res = await query(sql);
        // Query error
        if(res.result == null)
            return ApiResponse([], `Failed to retrieve ${tableName}${id ? ` with id ${id}` : ''}`, res.message, 500);
        // Item(s) not found
        if(res.result.length === 0)
            return ApiResponse([], `${tableName} empty`, res.message, 200);
        // Item(s) found
        return ApiResponse(res.result, `${tableName} retrieved${id ? ` with id ${id}` : ''}`, res.message, 200);
    }
}