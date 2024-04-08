import { UserSchema } from '../schema';
import { query, QueryResponse } from '../db';
import { ApiResponse } from '../response';
import { compare } from "bcrypt";
import { decode, verify, sign as jwtSign } from "jsonwebtoken";

// Create the controller
const AuthController = require('express')();

AuthController.post("/login", async (req, res) => {
    // Parse the request body
    const { email, password } = req.body;

    // Execute query and get results
    const qr: QueryResponse = await query(`SELECT * FROM users WHERE email = '${email}' or username = '${email}'`);
    if(qr.result.length == 0)
        return res.status(200).json(ApiResponse([], "Login failed", "User not found", 404));

    const user: UserSchema = qr.result[0];
    const passwordHash = user.password;

    // Compare the password with the hash
    const result = await compare(password, passwordHash);
    // Send response
    if(result) {
        // Create a token
        const data = {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.name
        }
        const token = jwtSign(data, 'testing');
        res.status(200).json(ApiResponse([token], "Login successful", qr.message, 200));
    }
    else {
        res.status(200).json(ApiResponse([], "Login failed", "", 401));
    }
});

// Register a new user - same as UsersController.post("/") [POST /users]
AuthController.post("/register", async (req, res) => {});

// Validate a user token
AuthController.get("/validate/:token", async (req, res) => {
    // Decode the token
    const token = req.params.token;
    const decoded = decode(token);

    if(decoded) {
        const verified = verify(token, 'testing');
        // Token exists and is verified
        if(verified) {
            res.status(200).json({
                message: "Token is valid",
                user: decoded,
                ok: true,
            });
        }
        // Token is decoded
        else {
            res.status(401).json({
                message: "Token is invalid",
                ok: false,
            });
        }
    }
    // Token cannot be decoded as a JWT token
    else {
        res.status(404).json({
            message: "Token is invalid",
            ok: false,
        });
    }
});

export default AuthController;