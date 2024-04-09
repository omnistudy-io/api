import { query } from "../db/index";
import { Model } from "./Model";
import { IApiResponse, ApiResponse } from "../response";
import { UserSchema } from "../schema";

// Model imports
import { UserProfilesModel } from "./UserProfiles";
import { UserPlansModel } from "./UserPlans";


export class UsersModel {

    /**
     * Get all users
     */
    static async getAll() { 
        const sql = `SELECT * FROM users`;
        const res = await query(sql);
        // Query or connection error
        if(res.result === null) {
            return { code: 500, message: res.message, users: [] }
        }
        // No users found
        if(res.result.length === 0) {
            return { code: 404, message: 'No users found', users: [] }
        }
        // Success
        return { code: 200, message: 'Users retrieved', users: res.result }
    }

    /**
     * Get a user by id
     * @param id The user id
     */
    static async getById(id: number) {
        const sql = `SELECT * FROM users WHERE id=${id}`;
        const res = await query(sql);
        // Query or connection error
        if(res.result === null) {
            return { code: 500, message: res.message, user: null }
        }
        // No user found
        if(res.result.length === 0) {
            return { code: 404, message: 'User not found', user: null }
        }
        // Success
        return { code: 200, message: 'User retrieved', user: res.result[0] }
    }

    /**
     * @summary Insert a new user into the db, then create the user's profile and plan given the resulting user id.
     *      If the profile or plan creation fails, delete subsequent insertions.
     * @source src/models/Users.ts
     * 
     * @param firstName User's first name
     * @param lastName User's last name
     * @param email User's email
     * @param password User's hashed password
     * @param phone (optional) User's phone number
     * @returns IApiResponse containing the new user if successful, or an error message if not
     */
    static async create(firstName: string, lastName: string, email: string, username: string, password: string, phone: string = ''): Promise<IApiResponse> {
        // Create the new user
        const user_sql = `INSERT INTO users (
            api_key, first_name, last_name, name, email, password, phone, online, username
        ) VALUES (
            UUID(), '${firstName}', '${lastName}', '${firstName} ${lastName}', '${email}', '${password}', '${phone}', 1, '${username}'
        )`;
        let qr = await query(user_sql);
        if(qr.result == null || qr.result.affectedRows == 0) 
            return ApiResponse([], 'Failed to create user', qr.message, 500);
        const user: UserSchema = (await this.getById(qr.result.insertId)).user as UserSchema;

        // Create the user's profile
        const profileRes: IApiResponse = await UserProfilesModel.create(user.id);
        // Profile creation failed
        if(!profileRes.ok) {
            // Delete the user row
            const deleteRes = await this.delete(user.id);
            if(!deleteRes.ok)
                return ApiResponse([], 'Failed to create user profile and delete user', profileRes.sqlMessage + ' | ' + deleteRes.sqlMessage, 500);

            return profileRes;
        }

        // Create the user's plan
        const planRes: IApiResponse = await UserPlansModel.create(user.id);
        // Plan creation failed
        if(!planRes.ok) {
            // Delete the user row
            const deleteUserRes = await this.delete(user.id);
            if(!deleteUserRes.ok)
                return ApiResponse([], 'Failed to create user plan and delete user', planRes.sqlMessage + ' | ' + deleteUserRes.sqlMessage, 500);

            // Delete the user profile
            const deleteProfileRes = await UserProfilesModel.delete(user.id);
            if(!deleteProfileRes.ok)
                return ApiResponse([], 'Failed to create user plan and delete user profile', planRes.sqlMessage + ' | ' + deleteProfileRes.sqlMessage, 500);

            return planRes;
        }

        return ApiResponse([user], 'User created successfully', '', 201);
    }

    /**
     * @summary Delete a user from the db, profile and plan should delete by cascade.
     * @source src/models/Users.ts
     * 
     * @param id User id
     * @returns IApiResponse based on the success of the deletion
     */
    static async delete(id: number): Promise<IApiResponse> {
        // Delete the user
        const user_sql = `DELETE FROM users WHERE id=${id}`;
        let qr = await query(user_sql);
        if(qr.result == null || qr.result.affectedRows == 0) 
            return ApiResponse([], 'Failed to delete user', qr.message, 500);

        return ApiResponse([], 'User deleted successfully', '', 200);
    }
    
    /**
     * Check if a user exists with the given email
     * @param email User's email
     * @returns 
     */
    static async existsWithEmail(email: string): Promise<boolean> {
        const sql = `SELECT * FROM users WHERE email='${email}'`;
        const qr = await query(sql);
        return qr.result.length > 0;
    }

    /**
     * Check if a user exists with the given username
     * @param username User's username
     * @returns 
     */
    static async existsWithUsername(username: string): Promise<boolean> {
        const sql = `SELECT * FROM users WHERE username='${username}'`;
        const qr = await query(sql);
        return qr.result.length > 0;
    }
}