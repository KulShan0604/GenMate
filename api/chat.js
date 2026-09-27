import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { message, mode = "chat", history = [] } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Message cannot be empty."
            });
        }

        const prompts = {
            chat: "You are GenMate, a helpful and friendly AI productivity assistant. Answer the user's question clearly and accurately.",

            summarize: "You are GenMate's summarization assistant. Summarize the user's text clearly and concisely while preserving the important information.",

            rewrite: "You are GenMate's writing assistant. Rewrite the user's text to make it clearer, more polished, and natural while preserving its original meaning.",

            brainstorm: "You are GenMate's brainstorming assistant. Generate useful, practical, and creative ideas based on the user's request."
        };

        const systemInstruction =
            prompts[mode] || prompts.chat;

        const contents = [
            ...history,
            {
                role: "user",
                parts: [{ text: message }]
            }
        ];

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents,
            config: {
                systemInstruction
            }
        });

        return res.status(200).json({
            response: response.text
        });

    } catch (error) {
        console.error("GenMate API Error:", error);

        return res.status(500).json({
            error: "Something went wrong while generating the response."
        });
    }
}
