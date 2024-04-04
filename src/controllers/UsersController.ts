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
    const { firstName, lastName, email, password } = req.body;

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
            const response = await UsersModel.create(firstName, lastName, email, hash);
            res.status(response.code).json(response);
        });
    });
});

/**
 * GET /
 * @summary Get all users
 * @returns User[] if successful, error if not
 */
UsersController.get("/", async (req, res) => {
    const response = await UsersModel.get();
    res.status(response.code).json(response);
});

UsersController.get('/:id', async (req, res) => {
    const response = await UsersModel.get(req.params.id);
    res.status(response.code).json(response);
});


export default UsersController;