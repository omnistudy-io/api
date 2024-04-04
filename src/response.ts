import {
    UsersRows,
    ForumsRows, 
    ForumUsersRows,
    ForumPostsRows
} from "./schema";


/**
 * IModelResponse
 * Generic base interface for all model responses. Specific models will extend this interface with their own 'data' object.
 */
export interface IApiResponse {
    // Can be rows from any table
    rows: ApiResponseDataRows;
    // Can be a succesful or error message
    message: string; // message from app
    sqlMessage: string; // message from mysql
    code: number;
    ok: boolean;
}
// Possible rows in rows object
type ApiResponseDataRows = UsersRows 
    | ForumsRows 
    | ForumUsersRows 
    | ForumPostsRows 
    | any[];


/**
 * Create a new api response object (matched with IApiResponse) with the parameters
 * @param rows The rows returned from the database
 * @param message The app-defined message, ex: "Failed to create forum"
 * @param sqlMessage The message from the database (empty string if none), ex: "Duplicate entry 'tagId' for key 'tag_id'"
 * @param code The HTTP status code, ex: 500
 * @returns A new ApiResponse object
 */
export function ApiResponse(rows: ApiResponseDataRows, message: string, sqlMessage: string, code: number): IApiResponse {
    return {
        rows: rows,
        message: message,
        sqlMessage: sqlMessage,
        code: code,
        ok: code < 400
    };
}

