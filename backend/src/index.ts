import "dotenv/config";
import express from "express";
import Groq from "groq-sdk";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { basePrompt as nodeBasePrompt } from "./defaults/node";
import { basePrompt as reactBasePrompt } from "./defaults/react";
// import cors from "cors";

// Initialize Groq client
const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY as string 
});

const app = express();
// app.use(cors());
app.use(express.json());

app.post("/template", async (req, res) => {
    try {
        // Create Groq chat completion for template selection
        const response = await groq.chat.completions.create({
            messages: [{
                role: "system",
                content:"Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra",
              },
              {
                role: 'user', 
                content: req.body.prompt
            }],
            model: 'llama3-8b-8192',
            max_tokens: 200,
        });

        // Extract the text response
        const answer = response.choices[0]?.message?.content?.trim();

        if (answer === "react") {
            res.json({
                prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                uiPrompts: [reactBasePrompt]
            });
            return;
        }

        if (answer === "node") {
            res.json({
                prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                uiPrompts: [nodeBasePrompt]
            });
            return;
        }

        res.status(403).json({message: "You can't access this"});
    } catch (error) {
        console.error("Template route error:", error);
        res.status(500).json({message: "Internal server error"});
    }
});

app.post("/chat", async (req, res) => {
    try {

        // Create Groq chat completion for chat route
        const response = await groq.chat.completions.create({
            messages: [{
                role: "system",
                content:getSystemPrompt()
            },
              {
                role: 'user', 
                content: req.body.prompt
            }],
            model: 'llama3-8b-8192',
            max_tokens: 10000,
        });

        // Extract the text response
        const responseText = response.choices[0]?.message?.content || "";

        console.log(response);
        res.json({
            response: responseText
        });
    } catch (error) {
        console.error("Chat route error:", error);
        res.status(500).json({message: "Internal server error"});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});