/**
 * Loading state with skeleton cards
 */

export default function LoadingState() {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 animate-fade-in-up">
            {/* Loading header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-card border border-border">
                    <svg className="animate-spin h-5 w-5 text-accent" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span className="text-text-secondary">Analyzing tweets...</span>
                </div>
            </div>

            {/* Skeleton cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Profile skeleton */}
                <div className="col-span-full p-6 rounded-2xl bg-card border border-border">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full shimmer" />
                        <div className="flex-1">
                            <div className="h-6 w-32 rounded shimmer mb-2" />
                            <div className="h-4 w-48 rounded shimmer" />
                        </div>
                    </div>
                </div>

                {/* Card skeletons */}
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="p-6 rounded-2xl bg-card border border-border"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <div className="h-5 w-24 rounded shimmer mb-4" />
                        <div className="space-y-2">
                            <div className="h-4 w-full rounded shimmer" />
                            <div className="h-4 w-4/5 rounded shimmer" />
                            <div className="h-4 w-3/5 rounded shimmer" />
                        </div>
                    </div>
                ))}

                {/* Full width skeleton */}
                <div className="col-span-full p-6 rounded-2xl bg-card border border-border">
                    <div className="h-5 w-32 rounded shimmer mb-4" />
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <div className="h-4 w-full rounded shimmer" />
                            <div className="h-4 w-4/5 rounded shimmer" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-full rounded shimmer" />
                            <div className="h-4 w-4/5 rounded shimmer" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-full rounded shimmer" />
                            <div className="h-4 w-4/5 rounded shimmer" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress steps */}
            <div className="mt-8 flex justify-center gap-8 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Fetching tweets</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span>AI analyzing...</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-border" />
                    <span>Building report</span>
                </div>
            </div>
        </div>
    );
}
