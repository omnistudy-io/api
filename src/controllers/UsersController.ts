import { UserSchema } from '../schema';
import { UsersModel } from '../models/Users';
import { ApiResponse } from '../response';
import { genSalt, hash } from "bcrypt";

// Create the controller
const UsersController = require('express')();

/**
 * POST /
 * @summary Create a new user
 * @returns User if successful, error if not
 */
UsersController.post("/", async (req, res) => {
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
    const saltRounds = 10;
    genSalt(saltRounds, async (err, salt) => {
        // Handle error
        if(err) 
            res.status(500).json(ApiResponse([], 'Failed to generate password salt', err.message, 500));
        // Hash the password given the salt
        hash(password, salt, async (err, hash) => {
            if(err)
                res.status(500).json(ApiResponse([], 'Failed to hash password', err.message, 500));

            // Create the user and send the response
            const response = await UsersModel.create(firstName, lastName, email, username, hash);
            res.status(response.code).json(response);
        });
    });
});


/**
 * GET /
 * @summary Get all users
 */
UsersController.get("/", async (req, res) => {
    const response = await UsersModel.getAll();
    res.status(response.code).json(response);
});


/**
 * GET /:id
 * @summary Get a user by id
 */
UsersController.get('/:id', async (req, res) => {
    // Validate parameters
    if(isNaN(req.params.id)) {
        res.status(400).json({
            code: 400,
            message: 'Invalid id parameter',
            user: null
        });
        return;
    }

    const response = await UsersModel.getById(req.params.id);
    res.status(response.code).json(response);
});


export default UsersController;