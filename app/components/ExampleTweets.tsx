/**
 * Example tweets card - displays AI-generated examples with disclaimer
 */

interface ExampleTweetsProps {
    tweets: string[];
}

export default function ExampleTweets({ tweets }: ExampleTweetsProps) {
    return (
        <div className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
            <h3 className="text-lg font-semibold text-text-primary mb-2 flex items-center gap-2">
                <span className="text-xl">💬</span>
                Example Tweets
            </h3>

            {/* Disclaimer */}
            <div className="mb-4 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-xs text-yellow-400 flex items-center gap-2">
                    <span>⚠️</span>
                    These are AI-generated examples inspired by the writing style. Not real tweets.
                </p>
            </div>

            {/* Example tweets */}
            <div className="space-y-3">
                {tweets.map((tweet, index) => (
                    <div
                        key={index}
                        className="
              p-4 rounded-xl bg-background/50 border border-border
              relative overflow-hidden
            "
                    >
                        {/* Tweet number badge */}
                        <span className="
              absolute top-2 right-2 text-xs 
              px-2 py-0.5 rounded-full
              bg-accent/10 text-accent/70
            ">
                            #{index + 1}
                        </span>

                        {/* Tweet content */}
                        <p className="text-text-primary text-sm leading-relaxed pr-12">
                            &ldquo;{tweet}&rdquo;
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
