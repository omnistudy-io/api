import axios from "axios";
import { AIModel } from "../models/AI";
const youtubesearchapi = require("youtube-search-api");

// Create the controller
const AIController = require('express')();

/**
 * POST /videos
 * @summary Get helpful videos
 * @returns code: number, message: string, videos: AIVideos[]
 */
AIController.post("/videos", async (req, res) => {
    // Parse body and env vars
    const aiBase = process.env.AI_BASE_URL;
    console.log(aiBase);

    const assignmentId = req.body.assignmentId;
    const description = req.body.description;

    // Validate the parameters
    if(assignmentId === undefined || description === undefined) 
        return res.send({ code: 400, message: "Missing parameters", videos: [] });
    if(isNaN(assignmentId))
        return res.send({ code: 400, message: "Invalid assignment ID", videos: [] });
    if(description === "")
        return res.send({ code: 400, message: "Description empty", videos: [] });

    // Find the videos
    const videos = await youtubesearchapi.GetListByKeyword(description, false, 3);
    if(videos.error) return res.send({ code: 500, message: "Error fetching videos", videos: [] });

    // Return the videos
    return res.send({ code: 200, message: "Videos found", videos: videos.items });
});


/**
 * POST /chat
 * @summary Ask a new chat to the AI server
 */
AIController.post("/chat", async (req, res) => {
    const { doc_paths, question } = req.body;
    const aiBase = process.env.AI_BASE_URL;

    // Validate the parameters
    if(doc_paths === undefined || question === undefined) 
        return res.send({ code: 400, message: "Missing parameters" });

    console.log(doc_paths, question);
    
    // Make the request
    axios.post(`${aiBase}/gpt`, { doc_paths, question }).then((result) => {
        return res.send({ code: 200, message: "Chat created", response: result.data.data.answer });
    }).catch((err) => {
        return res.send({ code: 500, message: "Error creating chat", response: null });
    });
});

// Type definitions
type AIVideos = {
    title: string;
    link: string;
    publisher: string;
}

// Export the controller
export default AIController;