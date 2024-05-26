// Import the Invite Model
import { InvitesModel } from "../models/Invites";

// Create the controller
const InvitesController = require('express')();


/**
 * GET /:code
 * @summary Get an invite by its code
 * @param code The invite code
 * @returns code: number, message: string, invite: InviteSchema
 */
InvitesController.get("/:code", async (req, res) => {
    // Validate parameters
    const code = req.params.code;
    if(code == undefined || code == null) {
        res.status(400).json({ code: 400, message: "Invalid code", invite: null });
        return;
    }

    // Get the invite
    const invite = await InvitesModel.getByCode(code);
    res.status(invite.code).json(invite);
});


/**
 * POST /:code/accept
 * @summary Accept an invite by its code
 * @param code The invite code
 * @returns code: number, message: string, token: string
 */
InvitesController.post("/:code/accept", async (req, res) => {
    // Validate parameters
    const code = req.params.code;
    if(code == undefined || code == null) {
        res.status(400).json({ code: 400, message: "Invalid code", token: null });
        return;
    }

    // Validate body
    const userData = req.body;
    if(userData == undefined || userData == null) {
        res.status(400).json({ code: 400, message: "Invalid user data", token: null });
        return;
    }
    // Check all fields present
    const requiredFields = ['first_name', 'last_name', 'email', 'username', 'password'];
    for(const field of requiredFields) {
        if(userData[field] == undefined || userData[field] == null) {
            res.status(400).json({ code: 400, message: `Missing field: ${field}`, token: null });
            return;
        }
    }

    // Accept the invite
    const accept = await InvitesModel.acceptByCode(code, userData);
    res.status(accept.code).json(accept);
});


// Export the controller
export default InvitesController;