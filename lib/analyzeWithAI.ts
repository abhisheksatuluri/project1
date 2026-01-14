/**
 * AI Analysis module using Google Gemini.
 * Uses gemini-1.5-flash for tweet analysis.
 */

import { RawTweet, AnalysisResult } from "./types";
import { generateContentSafe } from "./geminiClient";

// Configuration
const MAX_RETRIES = 2;

/**
 * System prompt context
 */
const SYSTEM_CONTEXT = `You are an expert social media analyst specializing in X (Twitter) content strategy. Your task is to analyze a set of public tweets and produce a structured personality and writing style blueprint.

CRITICAL CONSTRAINTS:
1. You do NOT impersonate the account owner under any circumstances.
2. Your analysis is based SOLELY on publicly available content.
3. Example tweets you generate must be clearly inspired by the style, NOT copied.
4. Be concise, insightful, and actionable in your analysis.`;

/**
 * Build the user prompt with tweets
 */
function buildUserPrompt(username: string, tweets: RawTweet[]): string {
    const tweetsFormatted = tweets
        .map((t, i) => `${i + 1}. "${t.text}"`)
        .join("\n");

    return `${SYSTEM_CONTEXT}

Analyze the following ${tweets.length} tweets from @${username}:

---
${tweetsFormatted}
---

Produce a JSON response with EXACTLY this structure:

{
  "profileSnapshot": {
    "tone": "<1-2 sentence description of voice and style>",
    "typicalLength": "<short/medium/long with character estimate>",
    "emojiUsage": "<none/minimal/moderate/heavy with examples>",
    "formattingHabits": "<description of threads, images, hashtags, line breaks usage>"
  },
  "coreThemes": ["<topic 1>", "<topic 2>", "<topic 3>", "<topic 4>", "<topic 5>"],
  "beliefSystem": {
    "pushes": ["<core belief 1>", "<core belief 2>", "<core belief 3>"],
    "avoids": ["<thing avoided 1>", "<thing avoided 2>"]
  },
  "tweetFormulas": ["<structural pattern 1>", "<structural pattern 2>", "<structural pattern 3>"],
  "whyItWorks": {
    "hooks": "<how they grab attention in openings>",
    "psychology": "<psychological triggers and persuasion tactics>",
    "audienceAlignment": "<who resonates with this and why>"
  },
  "exampleTweets": [
    "<AI-GENERATED EXAMPLE 1 in their style>",
    "<AI-GENERATED EXAMPLE 2 in their style>",
    "<AI-GENERATED EXAMPLE 3 in their style>"
  ]
}

IMPORTANT:
Respond ONLY with valid JSON.
Do not include markdown.
Do not include explanations.
Do not include code fences.`;
}

/**
 * Parse AI response to extract JSON
 */
function parseAIResponse(text: string): AnalysisResult | null {
    try {
        // Remove any potential code fences or markdown
        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsed = JSON.parse(cleanText);
        if (validateAnalysisResult(parsed)) {
            return parsed;
        }
    } catch (e) {
        console.warn("JSON parse failed, trying regex extraction", e);
        // Try to extract JSON object if the above failed
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                const parsed = JSON.parse(jsonMatch[0]);
                if (validateAnalysisResult(parsed)) {
                    return parsed;
                }
            } catch {
                // failed again
            }
        }
    }
    return null;
}

/**
 * Validate that the response has all required fields
 */
function validateAnalysisResult(obj: unknown): obj is AnalysisResult {
    if (!obj || typeof obj !== "object") return false;

    const result = obj as Record<string, unknown>;

    return (
        result.profileSnapshot !== undefined &&
        Array.isArray(result.coreThemes) &&
        result.beliefSystem !== undefined &&
        Array.isArray(result.tweetFormulas) &&
        result.whyItWorks !== undefined &&
        Array.isArray(result.exampleTweets)
    );
}

/**
 * Result from AI analysis
 */
export interface AnalyzeWithAIResult {
    success: boolean;
    analysis: AnalysisResult | null;
    error?: string;
}

/**
 * Analyze tweets using Google Gemini
 */
export async function analyzeWithAI(
    username: string,
    tweets: RawTweet[]
): Promise<AnalyzeWithAIResult> {
    if (tweets.length < 3) {
        return {
            success: false,
            analysis: null,
            error: "Not enough tweets to analyze (minimum 3 required)",
        };
    }

    const prompt = buildUserPrompt(username, tweets);
    let lastError: string = "";

    // Retry logic for transient failures
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            console.log(`Gemini analysis attempt ${attempt}/${MAX_RETRIES}`);
            const responseText = await generateContentSafe(prompt);

            const analysis = parseAIResponse(responseText);

            if (analysis) {
                console.log("Gemini analysis successful");
                return { success: true, analysis };
            } else {
                console.error("Failed to parse Gemini response:", responseText.slice(0, 500));
                lastError = "Failed to parse AI response";
            }
        } catch (error) {
            if (error instanceof Error) {
                lastError = error.message;
                console.error(`Gemini analysis error: ${error.message}`);

                // Wait briefly before retry if not last attempt
                if (attempt < MAX_RETRIES) {
                    await new Promise((r) => setTimeout(r, 2000));
                }
            }
        }
    }

    return {
        success: false,
        analysis: null,
        error: lastError || "AI analysis failed after retries",
    };
}
