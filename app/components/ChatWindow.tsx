/**
 * Chat window container handling state and API calls
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { AnalyzeResponse } from "@/lib/types";
import { ChatMessage as ChatMessageType } from "@/lib/chatWithAI";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
    data: AnalyzeResponse;
}

export default function ChatWindow({ data }: ChatWindowProps) {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial welcome message
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    role: "assistant",
                    content: `Hello! I've analyzed @${data.profile.username}'s persona. Ask me anything about their writing style, beliefs, or how to write like them.`,
                },
            ]);
        }
    }, [data.profile.username, messages.length]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSend = async (content: string) => {
        const newMessages: ChatMessageType[] = [
            ...messages,
            { role: "user", content },
        ];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: data.profile.username,
                    persona: data.analysis,
                    messages: newMessages,
                }),
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error || "Failed to get response");
            }

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: json.reply },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: error instanceof Error ? `Error: ${error.message}` : "Sorry, I had trouble connecting to the AI."
                },
            ]);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] max-w-3xl mx-auto w-full">
            {/* Header */}
            <div className="p-4 border-b border-border bg-background/80 backdrop-blur sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <img
                        src={data.profile.avatarUrl}
                        alt={data.profile.username}
                        className="w-10 h-10 rounded-full border border-border"
                    />
                    <div>
                        <h2 className="font-semibold text-text-primary">
                            Chatting about @{data.profile.username}
                        </h2>
                        <p className="text-xs text-text-secondary">
                            AI assistant • Trained on public Tweets
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, i) => (
                    <ChatMessage key={i} role={msg.role} content={msg.content} />
                ))}

                {isLoading && (
                    <div className="flex w-full mb-4 justify-start animate-pulse">
                        <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-tl-none">
                            <span className="text-xs text-text-secondary">Thinking...</span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <ChatInput
                onSend={handleSend}
                isLoading={isLoading}
                disabled={false}
            />
        </div>
    );
}
