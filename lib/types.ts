/**
 * TypeScript type definitions for X Persona Blueprint
 */

// Profile information extracted from tweets
export interface ProfileInfo {
    username: string;
    displayName: string;
    avatarUrl: string;
    bio: string;
}

// Writing style snapshot
export interface ProfileSnapshot {
    tone: string;
    typicalLength: string;
    emojiUsage: string;
    formattingHabits: string;
}

// What the account promotes vs avoids
export interface BeliefSystem {
    pushes: string[];
    avoids: string[];
}

// Why the tweets resonate with audience
export interface WhyItWorks {
    hooks: string;
    psychology: string;
    audienceAlignment: string;
}

// Complete analysis result from AI
export interface AnalysisResult {
    profileSnapshot: ProfileSnapshot;
    coreThemes: string[];
    beliefSystem: BeliefSystem;
    tweetFormulas: string[];
    whyItWorks: WhyItWorks;
    exampleTweets: string[];
}

// Full API response structure
export interface AnalyzeResponse {
    profile: ProfileInfo;
    analysis: AnalysisResult;
    meta: {
        tweetCount: number;
        generatedAt: string;
        disclaimer: string;
        isDemoMode: boolean;
    };
}

// API error response
export interface ErrorResponse {
    error: string;
    code?: string;
}

// Raw tweet data from fetch
export interface RawTweet {
    text: string;
    date?: string;
}

// Demo data structure (pre-generated analysis)
export interface DemoAccount {
    profile: ProfileInfo;
    tweets: RawTweet[];
    analysis: AnalysisResult;
}
