import { UsersModel } from '../models/Users';
import { UserSchema } from '../schema';
import { query, QueryResponse } from '../db';
import { ApiResponse } from '../response';
import { compare, genSalt, hash } from "bcrypt";
import { decode, verify, sign as jwtSign } from "jsonwebtoken";
import { AuthModel } from '../models/Auth';

// Create the controller
const AuthController = require('express')();

AuthController.post("/login", async (req, res) => {
    // Parse the request body
    const { email, password } = req.body;
    console.log(email, password);

    // Execute query and get results
    const qr: QueryResponse = await query(`SELECT * FROM users WHERE email = '${email}' or username = '${email}'`);
    if(qr.result === null || qr.result.length === 0) 
        return res.status(200).json(ApiResponse([], "Login failed", qr.message, 500));
    if(qr.result.length == 0)
        return res.status(200).json(ApiResponse([], "Login failed", "User not found", 404));

    const user: UserSchema = qr.result[0];
    console.log(user);
    const passwordHash = user.password;

    // Compare the password with the hash
    const result = await compare(password, passwordHash);
    console.log(result);
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
AuthController.post("/register", async (req, res) => {
    // Parse the request body
    const { firstName, lastName, email, username, password } = req.body;

    // Check if username or email already exists
    const emailExists = await UsersModel.existsWithEmail(email);
    const usernameExists = await UsersModel.existsWithUsername(username);
    if(emailExists) {
        res.status(200).json(ApiResponse([], 'email', 'User with that email already exists', 409));
        return;
    }
    else if(usernameExists) {
        res.status(200).json(ApiResponse([], 'username', 'User with that username already exists', 409));
        return;
    }

    // Generate a salt for the password
    const hash = await AuthModel.hashPassword(password, 10);
    if(hash === null) 
        res.status(500).json(ApiResponse([], 'Failed to hash password', 'Internal server error', 500));
    // Create the user and send the response
    const response = await UsersModel.create(firstName, lastName, email, username, hash);
    const user: UserSchema = response.rows[0];

    // Create a JWT token
    const data = {
        id: user.id,
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
        name: `${firstName} ${lastName}`,
        api_key: user.api_key
    }
    const token = jwtSign(data, 'testing');
    res.status(200).json(ApiResponse([token], "Register successful", response.message, 200));
});

// Validate a user token
AuthController.get("/validate/:token", async (req, res) => {
    // Decode the token
    const token = req.params.token;
    const decoded = decode(token);

    if(decoded) {
        let verified = false;
        try {
            verified = verify(token, 'testing');
        } catch(e) {}
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