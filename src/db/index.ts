const mysql = require('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: "db",
    user: "root",
    password: "testing",
    database: "omnistudy",
    port: "3306",
    waitForConnections: true,
    connectionLimit: 20,
    maxIdle: 20, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

export async function query(sql): Promise<QueryResponse> {
    // Get a pooled connection, execute the query, release the connection, then resolve results
    try {
        const conn = await pool.getConnection();
    
        // Wrap the query in a promise
        return new Promise(async (resolve, _) => {
            // Attempt the query
            try {
                const result = await conn.query(sql);
                conn.release();

                const queryResponse = QueryResponse("Query successful", result.slice(0, result.length - 1)[0]);
                return resolve(queryResponse);
            }
            // Catch any SQL errors
            catch(err) {
                conn.release();

                const queryResponse = QueryResponse(err.message, null);
                return resolve(queryResponse);
            }
        });
    }
    // Likely a connection error
    catch (err) {
        console.error(err);
        console.log(err.stack);
        return {
            message: "Connection error",
            result: null
        } as QueryResponse;
    }
}

function QueryResponse(message: string, result: Array<Object>): QueryResponse {
    return {
        message: message,
        result: result
    };
}

export interface QueryResponse {
    message: string;
    result: any;
}