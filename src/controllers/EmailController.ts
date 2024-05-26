import { EmailModel } from "../models/Email";

// Create the controller
const EmailController = require('express')();

EmailController.post("/invite", async (req, res) => {
    // Parse body
    const { email, first_name, last_name, code } = req.body;
    // Validate existence
    if(email == undefined || first_name == null || last_name == null || code == null) {
        res.status(400).json({ code: 400, message: "Missing one or more required fields.", response: null });
        return;
    }

    // Send the invite email
    const response = await EmailModel.sendInviteEmail(email, first_name, last_name, code);
    res.status(200).json(response);
});

// Export the controller
export default EmailController;