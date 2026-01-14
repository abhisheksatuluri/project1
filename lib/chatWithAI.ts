import { AnalysisResult } from "./types";
import { generateContentSafe } from "./geminiClient";

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export interface ChatRequest {
    username: string;
    persona: AnalysisResult;
    messages: ChatMessage[];
}

/**
 * specialized prompt for the chat assistant
 */
function buildChatPrompt(username: string, persona: AnalysisResult, messages: ChatMessage[]): string {
    const personaContext = JSON.stringify(persona, null, 2);
    const recentMessages = messages.slice(-5);

    let conversationHistory = "";
    for (const msg of recentMessages) {
        conversationHistory += `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}\n`;
    }

    return `You are a helpful AI assistant. You have been provided with a "Persona Blueprint" analysis of the X (Twitter) account @${username}.

YOUR GOAL:
- Answer the user's questions about the writing style, beliefs, and themes of @${username}.
- Use the Persona Blueprint below as your source of truth.
- Help the user understand how to write like this person, or explain why their content works.

CRITICAL RULES:
1. You are NOT @${username}. You are an AI assistant analyzing them.
2. NEVER say "I am ${username}" or "My beliefs are...".
3. ALWAYS say "The analysis suggests...", "Their style is...", etc.
4. If the user asks you to write a tweet, clearly label it as an example.
5. Base your answers ONLY on the provided Persona Blueprint.
6. Be concise.

PERSONA BLUEPRINT:
${personaContext}

CONVERSATION HISTORY:
${conversationHistory}

User's latest input is the last message above.
Respond as the Assistant.

IMPORTANT:
Respond ONLY with the assistant's reply text.
Do not include JSON, markdown blocks, or explanations outside the reply.`;
}

/**
 * Chat with AI using Gemini
 */
export async function chatWithAI(
    request: ChatRequest,
    _apiKey?: string // Ignored as geminiClient uses safe wrapper with env var
): Promise<string> {
    const { username, persona, messages } = request;

    const fullPrompt = buildChatPrompt(username, persona, messages);

    try {
        const reply = await generateContentSafe(fullPrompt);
        return reply.trim();
    } catch (error) {
        console.error("Chat Gemini error:", error);
        if (error instanceof Error && error.message.includes("Timeout")) {
            throw new Error("Response timed out");
        }
        throw error;
    }
}
