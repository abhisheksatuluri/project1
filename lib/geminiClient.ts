/**
 * Gemini AI Client using direct REST API calls.
 * This bypasses the SDK to have full control over the API version.
 */

// Model fallback list - try these in order
const MODEL_PREFERENCE = [
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-pro",
];

// API endpoints to try (v1 first, then v1beta)
const API_VERSIONS = ["v1", "v1beta"];

interface GeminiResponse {
    candidates?: Array<{
        content?: {
            parts?: Array<{ text?: string }>;
        };
    }>;
    error?: {
        code: number;
        message: string;
        status: string;
    };
}

/**
 * Call Gemini API directly via REST
 */
async function callGeminiREST(
    apiKey: string,
    modelName: string,
    apiVersion: string,
    prompt: string,
    timeoutMs: number
): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent?key=${apiKey}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                },
            }),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data: GeminiResponse = await response.json();

        if (!response.ok || data.error) {
            const errorMsg = data.error?.message || `HTTP ${response.status}`;
            throw new Error(`[${response.status}] ${errorMsg}`);
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            throw new Error("Empty response from Gemini");
        }

        return text;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

/**
 * Generate content with automatic model and API version fallback.
 */
export async function generateContentSafe(
    prompt: string,
    timeoutMs = 20000
): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined");
    }

    const errors: string[] = [];

    // Try each API version
    for (const apiVersion of API_VERSIONS) {
        // Try each model
        for (const modelName of MODEL_PREFERENCE) {
            try {
                console.log(`Trying Gemini: ${apiVersion}/${modelName}`);
                const result = await callGeminiREST(
                    apiKey,
                    modelName,
                    apiVersion,
                    prompt,
                    timeoutMs
                );
                console.log(`Success with ${apiVersion}/${modelName}`);
                return result;
            } catch (error) {
                const msg = error instanceof Error ? error.message : String(error);
                console.warn(`Failed ${apiVersion}/${modelName}: ${msg}`);
                errors.push(`${apiVersion}/${modelName}: ${msg}`);

                // If it's a 404 or model not found, try next
                if (msg.includes("404") || msg.includes("not found") || msg.includes("not supported")) {
                    continue;
                }

                // For auth errors (401/403), no point trying other models
                if (msg.includes("401") || msg.includes("403") || msg.includes("API key")) {
                    throw new Error(`API Key Error: ${msg}`);
                }

                // For other errors, continue to next model
                continue;
            }
        }
    }

    // All combinations failed
    throw new Error(
        `All Gemini models failed. Errors:\n${errors.slice(-3).join("\n")}`
    );
}

// Legacy export for compatibility
export function getGeminiModel() {
    throw new Error("getGeminiModel is deprecated - use generateContentSafe instead");
}
