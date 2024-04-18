require('dotenv').config();
import { AuthModel } from "./models/Auth";

/**
 * Authentication middleware.
 * Steps:
 *  1. Check for the authorization header
 *  2. Decode the token
 *  3. Validate the user against the db
 *       If the user is valid, call next(), else return 401
 * 
 * @param req The request object
 * @param res The response object
 * @param next The next function
 * @returns code: 401, message: string || next()
 */
export default async function auth(req, res, next) {

    // Skip authentication in dev environment
    if(process.env.ENVIRONMENT === "dev")
        return next();

    // Check for the authorization header
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if(authHeader === undefined || authHeader === null) {
        return res.status(401).json({ code: 401, message: "Authentication header missing" });
    }
    
    // Decode the token
    const token = authHeader.replace("Bearer ", "");
    const decoded = await AuthModel.decodeToken(token);
    if(!decoded.data) {
        return res.status(401).json({ code: 401, message: "Invalid authentication" });
    }
    else {
        req.user = decoded.data;
        // Validate the user against the db
        const valid = await AuthModel.validateUser(req.user.id, req.user.api_key);
        if(!valid) {
            return res.status(401).json({ code: 401, message: "Invalid authentication" });
        }
        else {
            next();
        }
    }
}