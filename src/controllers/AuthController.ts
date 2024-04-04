import { query, QueryResponse } from '../db';
import { ApiResponse } from '../response';
import { compare } from "bcrypt";

// Create the controller
const AuthController = require('express')();

AuthController.post("/login", async (req, res) => {
    // Parse the request body
    const { email, password } = req.body;

    // Execute query and get results
    const qr: QueryResponse = await query(`SELECT * FROM users WHERE email = '${email}'`);
    const user = qr.result[0];
    const passwordHash = user.password;

    // Compare the password with the hash
    const result = await compare(password, passwordHash);
    // Send response
    if(result) 
        res.status(200).json(ApiResponse([user], "Login successful", qr.message, 200));
    else
        res.status(200).json(ApiResponse([], "Login failed", "", 401));
});

// Register a new user - same as UsersController.post("/") [POST /users]
AuthController.post("/register", async (req, res) => {});

// Validate a user token
AuthController.get("/validate/:token", async (req, res) => {
    const token = req.params.token;
    const qr: QueryResponse = await query(`SELECT * FROM users WHERE token = '${token}'`);
    const user = qr.result[0];

    console.log("Validating token", token, user);

    if(user) 
        res.status(200).json(ApiResponse([user], "Token is valid", qr.message, 200));
    else
        res.status(200).json(ApiResponse([], "Token is invalid", "", 401));
});

export default AuthController;