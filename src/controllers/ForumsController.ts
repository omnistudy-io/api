import { ForumsModel } from "../models/Forums";
import { IApiResponse, ApiResponse } from "../response";

// Create the controller
const ForumsController = require('express')();

ForumsController.get("/", async (req, res) => {
    const response = await ForumsModel.get();
    res.status(response.code).json(response);
});

ForumsController.get("/:id", async (req, res) => {
    const response = await ForumsModel.get(Number(req.params.id));
    res.status(response.code).json(response);
});

ForumsController.post("/", async (req, res) => {
    // Parameter destructuring
    const { userId, name, tagId, thumbnailUrl } = req.body;

    // Parameter error checking
    if(userId === undefined || userId === 0)
        return ApiResponse([], 'Invalid user id', '', 400);
    if(typeof name != "string" || name.length === 0) 
        return ApiResponse([], 'Invalid forum name', '', 400);
    if(typeof tagId != "string" || tagId.length === 0) 
        return ApiResponse([], 'Invalid forum tag id', '', 400);

    // Create the new forum
    const response = await ForumsModel.new(userId, name, tagId, thumbnailUrl);
    res.status(response.code).json(response);
});

export default ForumsController;
