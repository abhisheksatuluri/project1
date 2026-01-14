/**
 * Share CTA component - encourage sharing or analyzing another account
 */

"use client";

interface ShareCTAProps {
    username: string;
    onAnalyzeAnother: () => void;
}

export default function ShareCTA({ username, onAnalyzeAnother }: ShareCTAProps) {
    const handleShare = async () => {
        const shareData = {
            title: `X Persona Blueprint - @${username}`,
            text: `Check out the personality blueprint I just generated for @${username}! 🔥`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(
                    `${shareData.text}\n\n${shareData.url}`
                );
                alert("Link copied to clipboard!");
            }
        } catch (error) {
            // User cancelled or error
            console.log("Share cancelled or failed:", error);
        }
    };

    const handleTweet = () => {
        const text = encodeURIComponent(
            `Just decoded @${username}'s X personality with AI 🔥\n\nTheir writing style, themes, beliefs, and content formulas - all analyzed!\n\nTry it yourself:`
        );
        const url = encodeURIComponent(window.location.href);
        window.open(
            `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
            "_blank"
        );
    };

    return (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-purple-500/10 border border-accent/20">
            <div className="text-center">
                <h3 className="text-xl font-bold text-text-primary mb-2">
                    Share This Blueprint 🚀
                </h3>
                <p className="text-text-secondary mb-6">
                    Let others discover their X persona
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {/* Tweet button */}
                    <button
                        onClick={handleTweet}
                        className="
              px-6 py-3 rounded-xl font-semibold
              bg-[#1DA1F2] text-white
              hover:bg-[#1a8cd8] transition-colors
              flex items-center justify-center gap-2
            "
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Post on X
                    </button>

                    {/* Share button */}
                    <button
                        onClick={handleShare}
                        className="
              px-6 py-3 rounded-xl font-semibold
              bg-card text-text-primary border border-border
              hover:bg-card-hover transition-colors
              flex items-center justify-center gap-2
            "
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                        </svg>
                        Share Link
                    </button>

                    {/* Analyze another button */}
                    <button
                        onClick={onAnalyzeAnother}
                        className="
              px-6 py-3 rounded-xl font-semibold
              bg-gradient-to-r from-accent to-blue-400 text-white
              hover:from-blue-400 hover:to-accent
              transition-all duration-300
              flex items-center justify-center gap-2
            "
                    >
                        <span>🔍</span>
                        Analyze Another
                    </button>
                </div>
            </div>
        </div>
    );
}
