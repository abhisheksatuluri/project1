/**
 * Tweet fetching module using public Nitter RSS feeds.
 * Falls back through multiple instances, then to demo data.
 */

import { RawTweet, ProfileInfo } from "./types";

// List of public Nitter instances to try (in order of preference)
const NITTER_INSTANCES = [
    "https://nitter.privacydev.net",
    "https://nitter.poast.org",
    "https://nitter.lucabased.xyz",
    "https://nitter.moomoo.me",
    "https://nitter.net",
];

// Timeout for fetch requests (in ms)
const FETCH_TIMEOUT = 10_000; // 10 seconds

/**
 * Clean HTML tags and entities from tweet text
 */
function cleanTweetText(text: string): string {
    return text
        // Remove HTML tags
        .replace(/<[^>]*>/g, "")
        // Decode HTML entities
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ")
        // Remove redundant whitespace
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * Parse RSS XML to extract tweets
 */
function parseRSSItems(xml: string): RawTweet[] {
    const tweets: RawTweet[] = [];

    // Simple regex-based XML parsing (no external deps)
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const titleRegex = /<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/;
    const descRegex = /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/;
    const pubDateRegex = /<pubDate>([\s\S]*?)<\/pubDate>/;

    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
        const item = match[1];

        // Try to get content from title or description
        const titleMatch = item.match(titleRegex);
        const descMatch = item.match(descRegex);
        const dateMatch = item.match(pubDateRegex);

        // Prefer description (full content) over title
        const rawText = descMatch?.[1] || titleMatch?.[1] || "";
        const text = cleanTweetText(rawText);

        // Skip empty or very short tweets, and retweets
        if (text.length > 10 && !text.startsWith("RT @")) {
            tweets.push({
                text,
                date: dateMatch?.[1]?.trim(),
            });
        }
    }

    return tweets;
}

/**
 * Extract profile info from RSS channel
 */
function parseProfileFromRSS(xml: string, username: string): ProfileInfo {
    const titleMatch = xml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
        xml.match(/<title>([\s\S]*?)<\/title>/);
    const descMatch = xml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
        xml.match(/<description>([\s\S]*?)<\/description>/);
    const imageMatch = xml.match(/<url>(https:\/\/[^<]*?\.(?:jpg|png|jpeg|webp)[^<]*?)<\/url>/i);

    const displayName = titleMatch
        ? cleanTweetText(titleMatch[1]).replace(/ \/ @.*$/, "").replace(/@\w+$/, "").trim()
        : username;

    return {
        username: username.replace("@", ""),
        displayName: displayName || username,
        avatarUrl: imageMatch?.[1] || `https://unavatar.io/twitter/${username}`,
        bio: descMatch ? cleanTweetText(descMatch[1]).slice(0, 160) : "",
    };
}

/**
 * Fetch tweets from a single Nitter instance
 */
async function fetchFromInstance(
    instance: string,
    username: string
): Promise<{ tweets: RawTweet[]; profile: ProfileInfo } | null> {
    const cleanUsername = username.replace("@", "");
    const url = `${instance}/${cleanUsername}/rss`;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; XPersonaBlueprint/1.0)",
                Accept: "application/rss+xml, application/xml, text/xml",
            },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.log(`Nitter ${instance} returned ${response.status}`);
            return null;
        }

        const xml = await response.text();

        // Check if we got valid RSS
        if (!xml.includes("<rss") && !xml.includes("<channel")) {
            console.log(`Nitter ${instance} did not return valid RSS`);
            return null;
        }

        const tweets = parseRSSItems(xml);
        const profile = parseProfileFromRSS(xml, cleanUsername);

        // Need at least 3 tweets for meaningful analysis
        if (tweets.length < 3) {
            console.log(`Nitter ${instance} returned too few tweets (${tweets.length})`);
            return null;
        }

        return { tweets: tweets.slice(0, 10), profile };
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === "AbortError") {
                console.log(`Nitter ${instance} timed out`);
            } else {
                console.log(`Nitter ${instance} error: ${error.message}`);
            }
        }
        return null;
    }
}

/**
 * Result from tweet fetching
 */
export interface FetchTweetsResult {
    success: boolean;
    tweets: RawTweet[];
    profile: ProfileInfo;
    source: "live" | "demo";
    error?: string;
}

/**
 * Fetch tweets for a username, trying multiple Nitter instances
 */
export async function fetchTweets(username: string): Promise<FetchTweetsResult> {
    const cleanUsername = username.replace("@", "").toLowerCase();

    // Validate username format
    if (!/^[a-zA-Z0-9_]{1,15}$/.test(cleanUsername)) {
        return {
            success: false,
            tweets: [],
            profile: { username: cleanUsername, displayName: "", avatarUrl: "", bio: "" },
            source: "demo",
            error: "Invalid username format",
        };
    }

    // Try each Nitter instance in order
    for (const instance of NITTER_INSTANCES) {
        console.log(`Trying Nitter instance: ${instance}`);
        const result = await fetchFromInstance(instance, cleanUsername);

        if (result) {
            console.log(`Successfully fetched ${result.tweets.length} tweets from ${instance}`);
            return {
                success: true,
                tweets: result.tweets,
                profile: result.profile,
                source: "live",
            };
        }
    }

    // All instances failed
    console.log("All Nitter instances failed, returning demo fallback signal");
    return {
        success: false,
        tweets: [],
        profile: { username: cleanUsername, displayName: cleanUsername, avatarUrl: "", bio: "" },
        source: "demo",
        error: "Could not fetch live tweets",
    };
}
