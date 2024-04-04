import { query, QueryResponse } from '../db';
import { ForumUsersRows } from '../schema';

export class ForumUsersModel {

    static async getById(id: number) {
        // Error checking
        if(id === undefined || id === 0) return null;

        // Get the forum user from the database
        const sql = `SELECT * FROM forum_users WHERE id = ${id}`;
        const res: QueryResponse = await query(sql);
        if(res.result == null || res.result.length === 0) return null;
        return res.result[0];
    }

    static async getAll() {
        const sql = 'SELECT * FROM forum_users';
        const res: QueryResponse = await query(sql);
        if(res.result == null) return null;
        return res.result;
    }
}