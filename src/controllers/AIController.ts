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
 * @returns code: number, message: string, response: string
 */
AIController.post("/chat", async (req, res) => {
    const { doc_paths, question } = req.body;
    const aiBase = process.env.AI_BASE_URL;

    // Validate the parameters
    if(doc_paths === undefined || question === undefined) 
        return res.send({ code: 400, message: "Missing parameters" });
    
    // Make the request
    axios.post(`${aiBase}/gpt`, { doc_paths, question }).then((result) => {
        return res.send({ code: 200, message: "Chat created", response: result.data.data.answer });
    }).catch((err) => {
        return res.send({ code: 500, message: "Error creating chat", response: null });
    });
});


/**
 * POST /qgen
 * @summary Generate questions from context
 * @param doc_paths {string[]} Absolute URLs to documents
 * @param num_questions {number} Number of questions to generate
 * @param question_types {string[]} Types of questions to generate
 * @return code: number, message: string, questions: string[]
 */
AIController.post("/qgen", async (req, res) => {
    const { doc_paths, num_questions, question_types } = req.body;
    const aiBase = process.env.AI_BASE_URL;

    // Validate the parameters are present
    if(doc_paths === undefined || num_questions === undefined || question_types === undefined) 
        return res.send({ code: 400, message: "Missing parameters" });
    // Verify doc paths is an array of strings
    if(!Array.isArray(doc_paths) || doc_paths.some((path: any) => typeof path !== "string") || doc_paths.length === 0)
        return res.send({ code: 400, message: "Invalid document paths" });
    // Verfiy num_questions is a number
    if(isNaN(num_questions) || num_questions < 1)
        return res.send({ code: 400, message: "Invalid number of questions" });
    // Verify question_types is an array of strings
    if(!Array.isArray(question_types) || question_types.some((type: any) => typeof type !== "string") || question_types.length === 0)
        return res.send({ code: 400, message: "Invalid question types" });
    // Verify question types are valid
    if(!question_types.every((type: string) => ["SHORT", "MCQ", "TOF", "FITB"].includes(type)))
        return res.send({ code: 400, message: "Invalid question types" });

    // Make the request
    axios.post(`${aiBase}/qgen`, { doc_paths, num_questions, question_types }).then((result) => {
        console.log(result);
        console.log(result.data.data.answer);
        return res.send({ code: 200, message: "Questions generated", questions: result.data.data });
    }).catch((err) => {
        return res.send({ code: 500, message: "Error generating questions", questions: [] });
    });
})

// Type definitions
type AIVideos = {
    title: string;
    link: string;
    publisher: string;
}

// Export the controller
export default AIController;