/**
 * Error state component with friendly message
 */

interface ErrorStateProps {
    message: string;
    onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="w-full max-w-md mx-auto px-4 animate-fade-in-up">
            <div className="p-8 rounded-2xl bg-card border border-red-500/30 text-center">
                {/* Error icon */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                {/* Error message */}
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                    Something went wrong
                </h3>
                <p className="text-text-secondary mb-6">{message}</p>

                {/* Retry button */}
                <button
                    onClick={onRetry}
                    className="
            px-6 py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-accent to-blue-400
            hover:from-blue-400 hover:to-accent
            transition-all duration-300
          "
                >
                    Try Again
                </button>

                {/* Suggestion */}
                <p className="mt-4 text-sm text-text-secondary">
                    Or try a different username like{" "}
                    <span className="text-accent">@tibo_maker</span>
                </p>
            </div>
        </div>
    );
}
