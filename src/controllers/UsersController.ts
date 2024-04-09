import { UserSchema } from '../schema';
import { UsersModel } from '../models/Users';
import { AuthModel } from '../models/Auth';
import { ApiResponse } from '../response';
import { genSalt, hash } from "bcrypt";

import { UserPlansModel } from '../models/UserPlans';
import { UserProfilesModel } from '../models/UserProfiles';

// Create the controller
const UsersController = require('express')();

/**
 * POST /
 * @summary Create a new user
 * @returns User if successful, error if not
 */
UsersController.post("/", async (req, res) => {
    const { first_name: firstName, last_name: lastName, email, username, password } = req.body;

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


/**
 * GET /username/:username
 * @summary Get a user by username
 */
UsersController.get('/username/:username', async (req, res) => {
    const response = await UsersModel.getByUsername(req.params.username);
    res.status(response.code).json(response);
});

/**
 * DELETE /:id
 * @summary Delete a user by id
 */
UsersController.delete('/:id', async (req, res) => {
    // Validate parameters
    if(isNaN(req.params.id)) {
        res.status(400).json({
            code: 400,
            message: 'Invalid id parameter',
            user: null
        });
        return;
    }

    const response = await UsersModel.delete(req.params.id);
    res.status(response.code).json(response);
});

/**
 * PUT /:id
 * @summary Update a user by id
 *      Updatable fields: first_name, last_name, email, username, phone
 *      To update the users password, see PUT /:id/password
 */
UsersController.put('/:id', async (req, res) => {
    // Validate parameters
    if(isNaN(req.params.id)) {
        res.status(400).json({
            code: 400,
            message: 'Invalid id parameter',
            user: null
        });
        return;
    }

    // Allow only certain fields to be updated
    const updatableFields = ['first_name', 'last_name', 'email', 'username', 'phone'];
    if(Object.keys(req.body).some(key => !updatableFields.includes(key))) {
        res.status(400).json({
            code: 400,
            message: 'Invalid field in request body',
            user: null
        });
        return;
    }

    // Execute the update
    const response = await UsersModel.update(req.params.id, req.body);
    res.status(response.code).json(response);
});

/**
 * PUT /:id/password
 * @summary Update a user's password by id
 */
UsersController.put('/:id/password', async (req, res) => {
    // Validate parameters
    if(isNaN(req.params.id)) {
        res.status(400).json({
            code: 400,
            message: 'Invalid id parameter',
            user: null
        });
        return;
    }
    
    // Make sure no other parameters are setup
    if(Object.keys(req.body).length !== 1 || !req.body.hasOwnProperty('password')) {
        res.status(400).json({
            code: 400,
            message: 'Invalid request body',
            user: null
        });
        return;
    }

    // Generate a salt for the password
    const hash = await AuthModel.hashPassword(req.body.password, 10);
    if(hash == null)
        return { code: 500, message: 'Failed to hash password', user: null };

    // Success
    const response = await UsersModel.update(req.params.id, { password: hash });
    res.status(response.code).json(response);
}); 

/**
 * GET /:id/profile
 * @summary Get a user profile by user id
 */
UsersController.get('/:id/profile', async (req, res) => {
    // Validate parameters
    if(isNaN(req.params.id)) {
        res.status(400).json({
            code: 400,
            message: 'Invalid id parameter',
            user_profile: null
        });
        return;
    }

    const response = await UserProfilesModel.getByUserId(req.params.id);
    res.status(response.code).json(response);
});


/**
 * PUT /:id/profile
 * @summary Update a user profile by user id
 */
UsersController.put("/:id/profile", async (req, res) => {
    // Validate parameters
    if(isNaN(req.params.id)) {
        res.status(400).json({ code: 400, message: 'Invalid id parameter', user: null });
        return;
    }

    // Allowed fields
    const updatableFields = ["address1", "address2", "city", "state", "country", "zip", "school", "year", "image_url", "bio", "birth_month", "birth_date", "birth_year", "age"];
    if(Object.keys(req.body).some(key => !updatableFields.includes(key))) {
        res.status(400).json({ code: 400, message: 'Invalid field in request', user_profile: null });
        return;
    }

    // Update profile
    const response = await UserProfilesModel.updateByUserId(req.params.id, req.body);
    res.status(response.code).json(response);
});


/**
 * GET /:id/plan
 * @summary Get a user plan by user id
 */
UsersController.get('/:id/plan', async (req, res) => {  
    // Validate parameters
    if(isNaN(req.params.id)) {
        res.status(400).json({
            code: 400,
            message: 'Invalid id parameter',
            user_plan: null
        });
        return;
    }

    const response = await UserPlansModel.getByUserId(req.params.id);
    res.status(response.code).json(response);
});


/**
 * PUT /:id/plan
 * @summary Update a user plan by user id
 */
UsersController.put('/:id/plan', async (req, res) => {
    // Validate parameters
    if(isNaN(req.params.id)) {
        res.status(400).json({ code: 400, message: 'Invalid id parameter', user_plan: null });
        return;
    }

    // Allowed fields
    const updatableFields = ["active", "renew_date", "total_spent"];
    if(Object.keys(req.body).some(key => !updatableFields.includes(key))) {
        res.status(400).json({ code: 400, message: 'Invalid field in request', user_plan: null });
        return;
    }

    // Update plan
    const response = await UserPlansModel.update(req.params.id, req.body);
    res.status(response.code).json(response);
});

export default UsersController;