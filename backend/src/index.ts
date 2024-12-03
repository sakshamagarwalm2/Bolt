/// <reference types="node" />
require("dotenv").config();

import Groq from "groq-sdk";
import { ChatCompletionCreateParams, ChatCompletion } from "groq-sdk/resources/chat/completions";
import { getSystemPrompt } from "./prompts";

// Create a type for the message object
type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

// Initialize Groq client with explicit type
const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY as string 
});

export async function main(): Promise<void> {
  try {
    // STREAM: Add stream option to enable streaming response
    const stream = await getGroqChatCompletionStream();
    
    // STREAM: Collect the streamed content
    let fullContent = '';
    
    // STREAM: Iterate through the streamed chunks
    for await (const chunk of stream) {
      // STREAM: Check if the chunk contains a content delta
      const contentDelta = chunk.choices[0]?.delta?.content;
      if (contentDelta) {
        // STREAM: Print each chunk in real-time
        process.stdout.write(contentDelta);
        
        // STREAM: Accumulate the full content
        fullContent += contentDelta;
      }
    }
    
    // STREAM: Add a newline after streaming is complete
    console.log('\n');
    
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

export async function getGroqChatCompletionStream() {
  // Define messages with explicit typing
  const messages: Message[] = [
    // SYSTEM: Add system prompt using imported function
    {
        role: "system",
        content: getSystemPrompt(),
      },
    {
      role: "user",
      content: "what is 2+2",
    },
  ];

  // STREAM: Create chat completion with streaming enabled
  return groq.chat.completions.create({
    messages,
    model: "llama3-8b-8192",
    // max_tokens:1000,
    temperature:0.7,
    stream: true,
    
  });
}

// Immediately invoke the main function
main().catch(console.error);

