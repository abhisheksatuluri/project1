/**
 * POST /api/chat
 * Endpoint for conversational AI integration using Gemini.
 */

import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getRateLimitInfo } from "@/lib/rateLimit";
import { chatWithAI, ChatRequest } from "@/lib/chatWithAI";

function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    const realIP = request.headers.get("x-real-ip");
    return realIP || "127.0.0.1";
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as ChatRequest;

        if (!body.username || !body.persona || !body.messages) {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        // Rate limit
        const clientIP = getClientIP(request);
        if (!checkRateLimit(clientIP)) {
            const info = getRateLimitInfo(clientIP);
            const resetIn = Math.ceil((info.resetAt - Date.now()) / 1000);
            return NextResponse.json(
                { error: `Too many requests. Retry in ${resetIn}s.` },
                { status: 429 }
            );
        }

        // Check API Key
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Server configuration error: Missing Gemini API Key" },
                { status: 500 }
            );
        }

        // Call AI
        const reply = await chatWithAI(body);

        return NextResponse.json({ reply });

    } catch (error) {
        console.error("Chat route error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to process chat request" },
            { status: 500 }
        );
    }
}
