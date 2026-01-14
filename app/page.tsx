/**
 * Main page - X Persona Blueprint
 * Single page app with input → loading → results flow
 */

"use client";

import { useState } from "react";
import Header from "./components/Header";
import UsernameInput from "./components/UsernameInput";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import ResultsSection from "./components/ResultsSection";
import { AnalyzeResponse } from "@/lib/types";

type AppState = "idle" | "loading" | "success" | "error";

export default function Home() {
    const [state, setState] = useState<AppState>("idle");
    const [results, setResults] = useState<AnalyzeResponse | null>(null);
    const [error, setError] = useState<string>("");
    const [currentUsername, setCurrentUsername] = useState<string>("");

    const handleAnalyze = async (username: string) => {
        setState("loading");
        setError("");
        setCurrentUsername(username);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Analysis failed");
            }

            setResults(data as AnalyzeResponse);
            setState("success");

            // Scroll to results
            setTimeout(() => {
                window.scrollTo({ top: 300, behavior: "smooth" });
            }, 100);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
            setState("error");
        }
    };

    const handleRetry = () => {
        if (currentUsername) {
            handleAnalyze(currentUsername);
        } else {
            setState("idle");
        }
    };

    const handleAnalyzeAnother = () => {
        setState("idle");
        setResults(null);
        setError("");
        setCurrentUsername("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <main className="min-h-screen flex flex-col">
            <Header />

            {/* Hero section - always visible */}
            <section className="py-12 sm:py-20 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
                        <span className="gradient-text">Decode</span> any X account
                        <br />
                        <span className="text-text-secondary">in seconds</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg sm:text-xl text-text-secondary mb-10 max-w-xl mx-auto">
                        Get a detailed personality & writing blueprint. Discover their tone,
                        themes, beliefs, and content formulas.
                    </p>

                    {/* Input */}
                    <UsernameInput
                        onSubmit={handleAnalyze}
                        isLoading={state === "loading"}
                    />
                </div>
            </section>

            {/* Dynamic content area */}
            <section className="flex-1 pb-20">
                {state === "loading" && <LoadingState />}

                {state === "error" && (
                    <ErrorState message={error} onRetry={handleRetry} />
                )}

                {state === "success" && results && (
                    <ResultsSection data={results} onAnalyzeAnother={handleAnalyzeAnother} />
                )}

                {/* Idle state - show features */}
                {state === "idle" && (
                    <div className="max-w-4xl mx-auto px-4 animate-fade-in-up">
                        {/* Features grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                            {[
                                {
                                    icon: "✍️",
                                    title: "Writing Style",
                                    desc: "Tone, length, emoji usage & formatting habits",
                                },
                                {
                                    icon: "🎯",
                                    title: "Core Themes",
                                    desc: "Recurring topics and content pillars",
                                },
                                {
                                    icon: "🧬",
                                    title: "Tweet Formulas",
                                    desc: "Structural patterns that drive engagement",
                                },
                            ].map((feature, i) => (
                                <div
                                    key={i}
                                    className="p-5 rounded-2xl bg-card border border-border text-center hover:border-accent/30 transition-colors"
                                >
                                    <span className="text-3xl mb-3 block">{feature.icon}</span>
                                    <h3 className="font-semibold text-text-primary mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary">{feature.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-12 text-center">
                            <p className="text-sm text-text-secondary mb-4">
                                Works with any public X account
                            </p>
                            <div className="flex items-center justify-center gap-6 text-text-secondary/50 text-xs">
                                <span>🔒 No login required</span>
                                <span>⚡ Instant analysis</span>
                                <span>🤖 AI-powered</span>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="py-6 px-4 border-t border-border">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm text-text-secondary">
                        Built with ❤️ • AI-powered analysis • Not affiliated with X
                    </p>
                </div>
            </footer>
        </main>
    );
}
