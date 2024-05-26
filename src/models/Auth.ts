import { IApiResponse, ApiResponse } from "../response";
import { compare, genSalt, hash } from "bcrypt";
import { decode, verify } from "jsonwebtoken";
import { query } from "../db";

export class AuthModel {

    static async hashPassword(password: string, saltRounds: number) {
        const promise = new Promise<string | null>((resolve, _) => {
            // Generate a salt for the password
            genSalt(saltRounds, async (err, salt) => {
                console.log('Salt generated');
                // Handle error
                if(err) 
                    resolve(null);

                // Hash the password given the salt
                hash(password, salt, async (err, hash) => {
                    console.log(hash);
                    if(err)
                        resolve(null);

                    resolve(hash);
                });
            });
        });
        return promise;
    }

    static async decodeToken(token: string) {
        // Decode the token
        const decoded = decode(token);

        if(decoded) {
            let verified = false;
            try {
                verified = verify(token, process.env.JWT_SECRET || "testing");
            } catch(e) {}
            // Token exists and is verified
            if(verified) {
                return { code: 200, message: "Token is valid", data: decoded };
            }
            // Token is decoded but not verified
            else {
                return { code: 401, message: "Token is invalid", data: null };
            }
        }
        // Token cannot be decoded as a JWT token
        else {
            return { code: 400, message: "Token is invalid", data: null };
        }
    }

    static async validateUser(userId: number, apiKey: string) {
        // Validate the user against the db
        const user = await query(`SELECT * FROM users WHERE id = ${userId} AND api_key = '${apiKey}'`);
        if(user.result == null) {
            return false;
        }
        if(user.result.length === 0) {
            return false;
        }
        return true;
    }
}