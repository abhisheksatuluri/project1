/**
 * POST /api/analyze
 * Main API endpoint for analyzing X accounts.
 * Now uses Google Gemini via lib/analyzeWithAI.ts
 */

import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getRateLimitInfo } from "@/lib/rateLimit";
import { fetchTweets } from "@/lib/fetchTweets";
import { analyzeWithAI } from "@/lib/analyzeWithAI";
import { getDemoData, getRandomDemoData } from "@/lib/demoData";
import { AnalyzeResponse, ErrorResponse } from "@/lib/types";

// Username validation regex (Twitter rules: 1-15 chars, alphanumeric + underscore)
const USERNAME_REGEX = /^[a-zA-Z0-9_]{1,15}$/;

function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    const realIP = request.headers.get("x-real-ip");
    return realIP || "127.0.0.1";
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const rawUsername = body.username;

        // Validate username
        if (!rawUsername || typeof rawUsername !== "string") {
            return NextResponse.json<ErrorResponse>(
                { error: "Username is required", code: "MISSING_USERNAME" },
                { status: 400 }
            );
        }

        const username = rawUsername.replace("@", "").trim().toLowerCase();

        if (!USERNAME_REGEX.test(username)) {
            return NextResponse.json<ErrorResponse>(
                { error: "Invalid username format.", code: "INVALID_USERNAME" },
                { status: 400 }
            );
        }

        // Rate limit
        const clientIP = getClientIP(request);
        if (!checkRateLimit(clientIP)) {
            const info = getRateLimitInfo(clientIP);
            const resetIn = Math.ceil((info.resetAt - Date.now()) / 1000);
            return NextResponse.json<ErrorResponse>(
                { error: `Too many requests. Retry in ${resetIn}s.`, code: "RATE_LIMITED" },
                {
                    status: 429,
                    headers: { "Retry-After": String(resetIn) }
                }
            );
        }

        // Check configuration
        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY missing");
            // Fallback to demo mode if not configured, or return error?
            // The prompt requested friendly errors but ideally we should have the key.
            // Let's proceed. If fetch fails or AI fails, we handle it.
        }

        // Fetch tweets
        console.log(`Analyzing @${username}...`);
        const fetchResult = await fetchTweets(username);

        let isDemoMode = false;
        let profile = fetchResult.profile;
        let tweets = fetchResult.tweets;
        let analysis;

        // Fetch failed -> Demo Fallback
        if (!fetchResult.success || tweets.length === 0) {
            console.log("Live fetch failed, using demo data...");
            const demoData = getDemoData(username) || getRandomDemoData();
            isDemoMode = true;
            profile = demoData.profile;
            tweets = demoData.tweets;
            analysis = demoData.analysis;

            if (!getDemoData(username)) {
                profile = { ...profile, displayName: `Demo: ${profile.displayName}` };
            }
        }

        // AI Analysis (if not already from demo)
        if (!analysis) {
            console.log(`Running Gemini analysis on ${tweets.length} tweets...`);
            const aiResult = await analyzeWithAI(username, tweets);

            if (!aiResult.success || !aiResult.analysis) {
                console.log("AI failed, falling back to demo...");
                const demoData = getDemoData(username);
                if (demoData) {
                    isDemoMode = true;
                    analysis = demoData.analysis;
                } else {
                    return NextResponse.json<ErrorResponse>(
                        { error: aiResult.error || "Analysis failed.", code: "AI_ERROR" },
                        { status: 503 }
                    );
                }
            } else {
                analysis = aiResult.analysis;
            }
        }

        const response: AnalyzeResponse = {
            profile: {
                username: profile.username,
                displayName: profile.displayName,
                avatarUrl: profile.avatarUrl || `https://unavatar.io/twitter/${username}`,
                bio: profile.bio,
            },
            analysis: analysis,
            meta: {
                tweetCount: tweets.length,
                generatedAt: new Date().toISOString(),
                disclaimer: "AI-generated analysis based on public content only.",
                isDemoMode: isDemoMode,
            },
        };

        return NextResponse.json<AnalyzeResponse>(response);

    } catch (error) {
        console.error("Unexpected error /api/analyze:", error);
        return NextResponse.json<ErrorResponse>(
            { error: "An unexpected error occurred.", code: "INTERNAL_ERROR" },
            { status: 500 }
        );
    }
}
