import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a0a",
                card: "#141414",
                "card-hover": "#1a1a1a",
                border: "#262626",
                "text-primary": "#fafafa",
                "text-secondary": "#a1a1a1",
                accent: "#3b82f6",
                "accent-glow": "rgba(59, 130, 246, 0.2)",
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            animation: {
                "fade-in-up": "fadeInUp 0.5s ease-out forwards",
                shimmer: "shimmer 2s infinite",
                "pulse-glow": "pulseGlow 2s infinite",
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                pulseGlow: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
                    "50%": { boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
