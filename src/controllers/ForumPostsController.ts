import { ForumPostsModel } from "../models/ForumPosts";
import { ApiResponse } from "../response";

// Create the controller
const ForumPostsController = require('express')();

// Create a new post
ForumPostsController.post("/", async (req, res) => {
    // Parse body parameters
    const { userId, forumId, title, content } = req.body;

    // Parameter error checking
    if(userId === undefined || userId === 0)
        res.status(400).json(ApiResponse([], 'User id is required', '', 400));
    if(forumId === undefined || forumId === 0)
        res.status(400).json(ApiResponse([], 'Forum id is required', '', 400));
    if(title.length === 0) 
        res.status(400).json(ApiResponse([], 'Post title is required', '', 400));
    if(content.length === 0) 
        res.status(400).json(ApiResponse([], 'Post content is required', '', 400));

    // Create the new post
    const result = await ForumPostsModel.new(userId, forumId, title, content);
    res.status(result.code).json(result);
});

export default ForumPostsController;
