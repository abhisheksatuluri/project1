/**
 * Chat input area
 */

import { useState, KeyboardEvent, useRef, useEffect } from "react";

interface ChatInputProps {
    onSend: (message: string) => void;
    isLoading: boolean;
    disabled: boolean;
}

export default function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (message.trim() && !isLoading && !disabled) {
            onSend(message.trim());
            setMessage("");
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [message]);

    return (
        <div className="p-4 bg-background/80 backdrop-blur-md border-t border-border sticky bottom-0 z-10">
            <div className="max-w-3xl mx-auto relative flex items-end gap-2">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isLoading}
                    placeholder={disabled ? "Start a new analysis to chat" : "Ask about their writing style..."}
                    className="
            flex-1 bg-card border border-border rounded-xl px-4 py-3
            text-text-primary placeholder:text-text-secondary/50
            outline-none focus:border-accent resize-none
            min-h-[48px] max-h-[120px]
            disabled:opacity-50
          "
                    rows={1}
                />

                <button
                    onClick={handleSend}
                    disabled={!message.trim() || isLoading || disabled}
                    className="
            p-3 rounded-xl bg-accent text-white
            hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
            flex-shrink-0 h-[48px] w-[48px] flex items-center justify-center
          "
                >
                    {isLoading ? (
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
