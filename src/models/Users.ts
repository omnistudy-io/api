import { query } from "../db/index";
import { Model } from "./Model";
import { IApiResponse, ApiResponse } from "../response";
import { UserSchema } from "../schema";

// Model imports
import { UserProfilesModel } from "./UserProfiles";
import { UserPlansModel } from "./UserPlans";


export class UsersModel {

    /**
     * @summary Get user(s) from the db, optionally by id
     * @source src/models/Users.ts
     * 
     * @param id The user id
     * @returns IApiResponse containing the user(s) if successful, or an error message if not
     */
    static async get(id: number = null): Promise<IApiResponse> {
        return await Model.get('users', id);
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
    static async create(firstName: string, lastName: string, email: string, password: string, phone: string = ''): Promise<IApiResponse> {
        // Create the new user
        const user_sql = `INSERT INTO users (
            token, first_name, last_name, name, email, password, phone, online, username
        ) VALUES (
            UUID(), '${firstName}', '${lastName}', '${firstName} ${lastName}', '${email}', '${password}', '${phone}', 1, '${email}'
        )`;
        let qr = await query(user_sql);
        if(qr.result == null || qr.result.affectedRows == 0) 
            return ApiResponse([], 'Failed to create user', qr.message, 500);
        const user: UserSchema = (await this.get(qr.result.insertId)).rows[0] as UserSchema;

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
    
}