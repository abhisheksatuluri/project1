/**
 * Results section - orchestrates all result cards with animations
 */

"use client";

import { AnalyzeResponse } from "@/lib/types";
import ProfileSnapshot from "./ProfileSnapshot";
import CoreThemes from "./CoreThemes";
import BeliefSystem from "./BeliefSystem";
import TweetFormulas from "./TweetFormulas";
import WhyItWorks from "./WhyItWorks";
import ExampleTweets from "./ExampleTweets";
import ShareCTA from "./ShareCTA";

interface ResultsSectionProps {
    data: AnalyzeResponse;
    onAnalyzeAnother: () => void;
}

export default function ResultsSection({ data, onAnalyzeAnother }: ResultsSectionProps) {
    const { profile, analysis, meta } = data;

    return (
        <div className="w-full max-w-4xl mx-auto px-4 space-y-4">
            {/* Demo mode banner */}
            {meta.isDemoMode && (
                <div className="px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center animate-fade-in-up">
                    <p className="text-sm text-yellow-400">
                        ⚠️ Live data unavailable. Showing demo analysis for demonstration purposes.
                    </p>
                </div>
            )}

            {/* Profile header */}
            <div className="p-6 rounded-2xl bg-card border border-border animate-fade-in-up">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative">
                        <img
                            src={profile.avatarUrl}
                            alt={profile.displayName}
                            className="w-16 h-16 rounded-full border-2 border-border object-cover"
                            onError={(e) => {
                                // Fallback if avatar fails to load
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${profile.username}&background=3b82f6&color=fff`;
                            }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-text-primary">
                            {profile.displayName}
                        </h2>
                        <p className="text-text-secondary">@{profile.username}</p>
                        {profile.bio && (
                            <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                                {profile.bio}
                            </p>
                        )}
                    </div>

                    {/* Stats badge */}
                    <div className="hidden sm:block px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-sm">
                        {meta.tweetCount} tweets analyzed
                    </div>
                </div>
            </div>

            {/* Main grid - 2 columns on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="animate-fade-in-up animate-delay-100">
                    <ProfileSnapshot data={analysis.profileSnapshot} />
                </div>
                <div className="animate-fade-in-up animate-delay-200">
                    <CoreThemes themes={analysis.coreThemes} />
                </div>
                <div className="animate-fade-in-up animate-delay-300">
                    <BeliefSystem data={analysis.beliefSystem} />
                </div>
                <div className="animate-fade-in-up animate-delay-400">
                    <TweetFormulas formulas={analysis.tweetFormulas} />
                </div>
            </div>

            {/* Full-width sections */}
            <div className="animate-fade-in-up animate-delay-500">
                <WhyItWorks data={analysis.whyItWorks} />
            </div>

            <div className="animate-fade-in-up animate-delay-500">
                <ExampleTweets tweets={analysis.exampleTweets} />
            </div>

            {/* Share CTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up animate-delay-500">
                <ShareCTA username={profile.username} onAnalyzeAnother={onAnalyzeAnother} />

                {/* Chat Entry Point */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                        Chat with this Persona 💬
                    </h3>
                    <p className="text-text-secondary mb-6 text-sm">
                        Ask questions about their style, get writing tips, or iterate on ideas.
                    </p>
                    <button
                        onClick={() => {
                            // Save data to session storage for chat page
                            sessionStorage.setItem("currentPersona", JSON.stringify(data));
                            window.location.href = "/chat";
                        }}
                        className="
              px-6 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-purple-500 to-pink-500
              hover:from-pink-500 hover:to-purple-500
              transition-all duration-300 w-full sm:w-auto
              flex items-center justify-center gap-2
            "
                    >
                        Start Conversation →
                    </button>
                </div>
            </div>

            {/* Footer disclaimer */}
            <div className="text-center py-6 animate-fade-in-up animate-delay-500">
                <p className="text-xs text-text-secondary">
                    {meta.disclaimer}
                </p>
                <p className="text-xs text-text-secondary/50 mt-1">
                    Generated at {new Date(meta.generatedAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
}
