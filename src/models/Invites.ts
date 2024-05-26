import { query } from "../db";
import { InviteSchema } from "../schema/invites";
import { UsersModel } from "./Users";
import { AuthModel } from "./Auth";
import { compare } from "bcrypt";
import { sign as jwtSign } from "jsonwebtoken";

export class InvitesModel {

    /**
     * Get an invite by its code
     * 
     * @param code The invite code
     * @returns code: number, message: string, invite: InviteSchema
     */
    static async getByCode(code: number): Promise<{
        code: number, 
        message: string, 
        invite: InviteSchema | null
    }> {
        // Prepare and execute sql
        const sql = `
            SELECT *
            FROM invites
            WHERE code='${code}'
        `;
        console.log(sql);
        const qr = await query(sql);
        console.log(qr);

        // Query or connection error
        if(qr.result == null) 
            return { code: 500, message: "Internal server error", invite: null };
        // Invite not found
        if(qr.result.length == 0)
            return { code: 404, message: "Invite not found", invite: null };
        // Return the invite
        return { code: 200, message: "Invite found", invite: qr.result[0] as InviteSchema };
    }

    /**
     * Accept an invite by its code
     * 
     * @param code The invite code
     * @returns code: number, message: string, 
     */
    static async acceptByCode(code: number, user: UserSnapshot): Promise<{
        code: number,
        message: string
        token: string | null,
        sqlMessage?: string
    }> {
        // Prepare and execute sql
        const sql = `
            UPDATE invites
            SET accepted=true, accepted_at=NOW()
            WHERE code='${code}'
        `;
        const qr = await query(sql);
        // Query or connection error
        if(qr.result == null) 
            return { code: 500, message: "Internal server error", token: null };
        // Invite not found
        if(qr.result.affectedRows == 0)
            return { code: 404, message: "Invite not found", token: null };

        // Hash the users password
        const hash = await AuthModel.hashPassword(user.password, 10);
        if(hash === null) 
            return { code: 500, message: "Failed to hash password", token: null };
        // Make a post to create new user
        const createResult = await UsersModel.create(user.first_name, user.last_name, user.email, user.username, hash);
        if(!createResult.ok)
            return { code: 500, message: createResult.message, sqlMessage: createResult.sqlMessage, token: null };

        // Get the database user
        const userSql = `SELECT * FROM users WHERE email='${user.email}'`;
        const userQuery = await query(userSql);
        if(userQuery.result == null || userQuery.result.length === 0)
            return { code: 500, message: "Failed to find user", token: null };
        const dbUser = userQuery.result[0];

        // Compare the password with the hash
        const result = await compare(user.password, hash);
        // Send response
        if(result) {
            // Create a token
            const data = {
                ...dbUser, password: undefined
            }
            const token = jwtSign(data, process.env.JWT_SECRET || "testing");
            return { code: 200, message: "Login successful", token: token };
        }
        else {
            return { code: 401, message: "Login failed, wrong password", token: null };
        }
    }

}

type UserSnapshot = {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string
}