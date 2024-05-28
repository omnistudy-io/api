import { query } from "../db";

// Create the controller
const ReportsController = require('express')();

/**
 * GET /chat-messages
 * @summary Get the number of chat messages over the last 5 days grouped by day.
 * @returns code: number, message: string, data: Object
 */
ReportsController.get("/chat-messages", async (req, res) => {
    // Prepare and execute sql
    const sql = `
        WITH RECURSIVE Last5Days AS (
            SELECT CURDATE() AS day
            UNION ALL
            SELECT day - INTERVAL 1 DAY
            FROM Last5Days
            WHERE day > CURDATE() - INTERVAL 5 DAY
        )
        SELECT Last5Days.day, COALESCE(COUNT(chat_messages.created_at), 0) AS count
        FROM Last5Days
        LEFT JOIN chat_messages
        ON DATE(chat_messages.created_at) = Last5Days.day AND from_user=1 AND user_id=${req.user.id}
        GROUP BY Last5Days.day
        ORDER BY Last5Days.day;
    `;
    const qr = await query(sql);

    // Query or connection error
    if(qr.result === null) 
        return res.status(500).json({ code: 500, message: "Internal server error", data: null });

    // Return the data
    const data = qr.result;
    res.status(200).json({ code: 200, message: "Success", data: data.slice(0, 5) });
});

// Export the controller
export default ReportsController;