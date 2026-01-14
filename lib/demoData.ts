/**
 * Demo data for fallback when live tweet fetching fails.
 * Contains pre-generated analysis for popular accounts.
 */

import { DemoAccount } from "./types";

export const demoAccounts: Record<string, DemoAccount> = {
    tibo_maker: {
        profile: {
            username: "tibo_maker",
            displayName: "Tibo",
            avatarUrl: "https://pbs.twimg.com/profile_images/1372524342898081793/LKS5xWNA_400x400.jpg",
            bio: "Building in public 🚀 Founder of Tweethunter & Taplio. Sharing the journey.",
        },
        tweets: [
            { text: "I quit my $200K job to build side projects. 2 years later, I make more than I ever did. Here's what I learned:" },
            { text: "The best marketing strategy? Build something people actually want. Revolutionary, I know." },
            { text: "Shipped 3 features in 48 hours this week. Not because I'm fast. Because I cut scope ruthlessly." },
            { text: "Your audience doesn't want tips. They want proof. Show your numbers. Show your failures. Show your wins." },
            { text: "Stop building features nobody asked for. Start talking to users. It's that simple." },
            { text: "Hot take: Most 'failed' startups didn't fail. They just gave up too early." },
            { text: "The algorithm doesn't hate you. Your content is just boring. Fix that first." },
            { text: "Building in public isn't about transparency. It's about accountability to yourself." },
            { text: "Raised $0. No co-founder. Just shipped for 2 years straight. You don't need permission to build." },
            { text: "The best time to start was yesterday. The second best time is after you finish reading this tweet." },
        ],
        analysis: {
            profileSnapshot: {
                tone: "Casual, punchy, founder-mode energy. Direct and no-nonsense with occasional humor.",
                typicalLength: "Short to medium (50-200 characters). Single tweets, rarely threads.",
                emojiUsage: "Minimal and strategic. Occasional 🚀 for launches, rarely overuses.",
                formattingHabits: "Clean single tweets. Uses line breaks for emphasis. No hashtags. Rare images.",
            },
            coreThemes: [
                "Building in public",
                "Indie hacking & bootstrapping",
                "Content creation & audience growth",
                "Shipping fast & cutting scope",
                "Founder mindset & resilience",
            ],
            beliefSystem: {
                pushes: [
                    "Ship fast, iterate faster",
                    "Transparency builds trust",
                    "Solo founders can win big",
                    "Talk to users, not investors",
                    "Revenue over vanity metrics",
                ],
                avoids: [
                    "VC hype and fundraising culture",
                    "Over-engineering and perfectionism",
                    "Feature bloat without validation",
                    "Excuses and victim mentality",
                ],
            },
            tweetFormulas: [
                "Hook with bold claim → Evidence/Story → Insight",
                "Contrarian take → 'Here's why' breakdown",
                "Before/After transformation story",
                "List of lessons learned (numbered)",
                "Simple truth stated bluntly",
            ],
            whyItWorks: {
                hooks: "Opens with bold claims, surprising numbers, or relatable frustrations. First line demands attention.",
                psychology: "Combines FOMO (success stories) with hope (you can do it too) and relatability (I struggled too).",
                audienceAlignment: "Speaks directly to indie hackers, solopreneurs, and builders who want freedom over funding.",
            },
            exampleTweets: [
                "Everyone's chasing viral tweets. I'm chasing repeat customers. One pays the bills. The other feeds the ego.",
                "Built my first product in a weekend. Took 6 months to get 10 users. Most people quit at month 2. Don't be most people.",
                "The secret to growing on X? There is no secret. Post daily. Reply to others. Be useful. Do it for a year. You'll be surprised.",
            ],
        },
    },

    levelsio: {
        profile: {
            username: "levelsio",
            displayName: "Pieter Levels",
            avatarUrl: "https://pbs.twimg.com/profile_images/1589756412078555136/YlXMBzhp_400x400.jpg",
            bio: "Making $3M+/year from startups. Nomad List, Remote OK, PhotoAI, InteriorAI. 12 startups in 12 months. No VC.",
        },
        tweets: [
            { text: "Just crossed $300K MRR across all my startups. Still a solo developer. No employees. No meetings. Just shipping." },
            { text: "The best business model: charge money for things. Revolutionary." },
            { text: "AI wrappers are printing money. I don't care if VCs think it's not defensible. My bank account disagrees." },
            { text: "Silicon Valley: 50 person team, $10M raised, pivoting for 3 years. Me: solo, no funding, profitable month 1." },
            { text: "Stop asking for permission. Stop asking for advice. Just ship something and see what happens." },
            { text: "Working from Bali today. Tokyo next week. The laptop lifestyle is real if you build real products." },
            { text: "The trick to staying motivated? Ship something new every month. Momentum compounds." },
            { text: "Every startup guru: 'You need a co-founder.' Me: *laughs in $3M ARR*" },
            { text: "My tech stack: vanilla JavaScript, SQLite, one VPS. Total cost: $20/month. Revenue: $250K/month." },
            { text: "Most founders overcomplicate everything. The best products do one thing really well." },
        ],
        analysis: {
            profileSnapshot: {
                tone: "Provocative, confident, minimalist. Often sarcastic with a humble-brag undertone.",
                typicalLength: "Very short (under 100 characters). Punchy one-liners dominate.",
                emojiUsage: "Almost never. Lets the words do the work. Occasional 🚀 for launches only.",
                formattingHabits: "Single-line tweets. No threads. No hashtags. Occasionally shares screenshots of revenue.",
            },
            coreThemes: [
                "Solo entrepreneurship",
                "AI product development",
                "Digital nomad lifestyle",
                "Anti-VC bootstrapping",
                "Radical simplicity in tech",
            ],
            beliefSystem: {
                pushes: [
                    "Ship alone, move fast",
                    "Simple tech beats complex stacks",
                    "Revenue is the only metric that matters",
                    "Location independence is achievable",
                    "AI is a massive opportunity right now",
                ],
                avoids: [
                    "Venture capital and traditional startup culture",
                    "Hiring and team management",
                    "Complex infrastructure and over-engineering",
                    "Long planning cycles without shipping",
                ],
            },
            tweetFormulas: [
                "Flex revenue/milestone → Minimal context",
                "Hot take → No explanation needed",
                "Comparison (them vs me) → Implicit flex",
                "Simplicity statement → Tech minimalism",
                "Lifestyle update → Proof of freedom",
            ],
            whyItWorks: {
                hooks: "Leads with impressive numbers or contrarian takes that demand engagement (agreement or debate).",
                psychology: "Triggers aspiration (I want that life), controversy (that's wrong!), and curiosity (how does he do it?).",
                audienceAlignment: "Resonates with developers dreaming of indie success, remote workers, and VC-skeptics.",
            },
            exampleTweets: [
                "Your startup doesn't need a CTO, CFO, or COO. It needs customers. Get those first.",
                "I built PhotoAI in 2 weeks. It makes $50K/month. Your 6-month roadmap is the problem, not the solution.",
                "Meetings are where productivity goes to die. I haven't had one in 3 years. Revenue is up 400%.",
            ],
        },
    },
};

/**
 * Get demo data for a username, or return a random demo if not found
 */
export function getDemoData(username: string): DemoAccount | null {
    const normalized = username.toLowerCase().replace("@", "");
    return demoAccounts[normalized] || null;
}

/**
 * Get a random demo account for complete fallback
 */
export function getRandomDemoData(): DemoAccount {
    const keys = Object.keys(demoAccounts);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return demoAccounts[randomKey];
}
