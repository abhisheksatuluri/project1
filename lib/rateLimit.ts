/**
 * Simple in-memory IP-based rate limiter.
 * Resets on server restart (acceptable for demo).
 * 
 * Limits: 10 requests per minute per IP address.
 */

const WINDOW_MS = 60_000; // 1 minute window
const MAX_REQUESTS = 10; // Max requests per window

interface RateLimitRecord {
    count: number;
    resetAt: number;
}

// In-memory store (resets on cold start)
const ipStore = new Map<string, RateLimitRecord>();

/**
 * Check if an IP is rate limited.
 * @param ip - The IP address to check
 * @returns true if allowed, false if rate limited
 */
export function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = ipStore.get(ip);

    // No record or expired window - allow and create new record
    if (!record || now > record.resetAt) {
        ipStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return true;
    }

    // Within window - check count
    if (record.count >= MAX_REQUESTS) {
        return false; // Rate limited
    }

    // Increment and allow
    record.count++;
    return true;
}

/**
 * Get remaining requests for an IP
 * @param ip - The IP address to check
 * @returns Object with remaining requests and reset time
 */
export function getRateLimitInfo(ip: string): { remaining: number; resetAt: number } {
    const now = Date.now();
    const record = ipStore.get(ip);

    if (!record || now > record.resetAt) {
        return { remaining: MAX_REQUESTS, resetAt: now + WINDOW_MS };
    }

    return {
        remaining: Math.max(0, MAX_REQUESTS - record.count),
        resetAt: record.resetAt,
    };
}

/**
 * Cleanup expired records (optional, for memory efficiency on long-running servers)
 */
export function cleanupExpiredRecords(): void {
    const now = Date.now();
    const entries = Array.from(ipStore.entries());
    for (const [ip, record] of entries) {
        if (now > record.resetAt) {
            ipStore.delete(ip);
        }
    }
}
