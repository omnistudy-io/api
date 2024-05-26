// Imports
const sgMail = require('@sendgrid/mail');


export class EmailModel {

    /**
     * Send an invite email to a user
     * @param email The email address to send the invite to
     * @param first_name The first name of the user
     * @param last_name The last name of the user
     * @param code The invite code
     */
    static async sendInviteEmail(email: string, first_name: string, last_name: string, code: string) {
        // Set API key
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        // Prepare the message
        const msgData = {
            from: {
                email: "info@omnistudy.io",
                name: "OmniStudy Team"
            },
            template_id: process.env.SENDGRID_INVITE_TEMPLATE_ID,
            personalizations: [{
                to: { email: email },
                dynamic_template_data: {
                    subject: "You've Been Invited To OmniStudy!",
                    first_name: first_name,
                    last_name: last_name,
                    code: code
                }
            }]
        };

        // Send the email
        return new Promise((resolve, _) => {
            sgMail.send(msgData).then((data) => {
                resolve(data);
            }).catch((err) => {
                resolve(err);
            });
        });
    }

}