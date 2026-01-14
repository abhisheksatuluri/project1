/**
 * Username input component with validation and submit button
 */

"use client";

import { useState, FormEvent } from "react";

interface UsernameInputProps {
    onSubmit: (username: string) => void;
    isLoading: boolean;
}

export default function UsernameInput({ onSubmit, isLoading }: UsernameInputProps) {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    // Validate username on input
    const validateUsername = (value: string): boolean => {
        const clean = value.replace("@", "").trim();
        if (!clean) {
            setError("");
            return false;
        }
        if (!/^[a-zA-Z0-9_]{1,15}$/.test(clean)) {
            setError("Only letters, numbers, and underscores (max 15 chars)");
            return false;
        }
        setError("");
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        validateUsername(value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const clean = username.replace("@", "").trim();
        if (validateUsername(clean) && clean) {
            onSubmit(clean);
        }
    };

    const isValidForSubmit = username.replace("@", "").trim() && !error;

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="relative">
                {/* Input container */}
                <div className={`
          flex items-center gap-2 p-1.5 rounded-2xl bg-card border 
          ${error ? "border-red-500/50" : "border-border"}
          focus-within:border-accent transition-all duration-300
          ${!error && isValidForSubmit ? "glow-effect" : ""}
        `}>
                    {/* @ symbol */}
                    <span className="pl-4 text-text-secondary text-lg font-medium">@</span>

                    {/* Input field */}
                    <input
                        type="text"
                        value={username}
                        onChange={handleChange}
                        placeholder="username"
                        disabled={isLoading}
                        className="
              flex-1 bg-transparent text-text-primary text-lg
              placeholder:text-text-secondary/50
              outline-none border-none py-3
              disabled:opacity-50
            "
                        autoComplete="off"
                        spellCheck="false"
                    />

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isLoading || !isValidForSubmit}
                        className="
              px-6 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-accent to-blue-400
              hover:from-blue-400 hover:to-accent
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
              flex items-center gap-2
            "
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                                <span className="hidden sm:inline">Analyzing...</span>
                            </>
                        ) : (
                            <>
                                <span>Analyze</span>
                                <span className="hidden sm:inline">→</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Error message */}
                {error && (
                    <p className="mt-2 text-sm text-red-400 text-center">{error}</p>
                )}
            </div>

            {/* Suggestions */}
            <p className="mt-4 text-sm text-text-secondary text-center">
                Try{" "}
                <button
                    type="button"
                    onClick={() => { setUsername("tibo_maker"); setError(""); }}
                    className="text-accent hover:underline"
                    disabled={isLoading}
                >
                    @tibo_maker
                </button>{" "}
                or{" "}
                <button
                    type="button"
                    onClick={() => { setUsername("levelsio"); setError(""); }}
                    className="text-accent hover:underline"
                    disabled={isLoading}
                >
                    @levelsio
                </button>
            </p>
        </form>
    );
}
