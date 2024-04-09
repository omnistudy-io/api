import { UserProfileSchema } from "../schema";
import { UserProfilesModel } from "../models/UserProfiles";

// Create the controller
const UserProfilesController = require('express')();

/**
 * GET /
 * @summary Get a user profile by id or user_id. Cannot get all user profiles.
 */
UserProfilesController.get("/", async (req, res) => {
    // Find by user_id
    const userId = req.params.id;
    if(isNaN(userId)) {
        res.status(400).json({ code: 400, message: 'Invalid user_id parameter', user: null });
        return;
    }

    const response = await UserProfilesModel.getByUserId(userId);
    res.status(response.code).json(response);
    return;
});


/**
 * PUT /
 * @summary Update a user profile by id or user_id
 *      Updatable fields: address1, address2, city, state, country, zip, school, 
 *                  year, image_url, bio, birth_month, birth_date, birth_year
 */
UserProfilesController.put("/", async (req, res) => {
    // Allowed fields
    const updatableFields = ["address1", "address2", "city", "state", "country", "zip", "school", "year", "image_url", "bio", "birth_month", "birth_date", "birth_year"];
    if(Object.keys(req.body).some(key => !updatableFields.includes(key))) {
        res.status(400).json({ code: 400, message: 'Invalid field in request', user_profile: null });
        return;
    }

    // Update by user_id
    if(req.query.user_id) {
        if(isNaN(req.query.user_id)) {
            res.status(400).json({ code: 400, message: 'Invalid user_id parameter', user: null });
            return;
        }

        const response = await UserProfilesModel.updateByUserId(req.query.user_id, req.body);
        res.status(response.code).json(response);
        return;
    }

    // Invalid query
    res.status(400).json({ code: 400, message: 'Invalid query', user: null });
});

export default UserProfilesController;