/**
 * Individual chat message bubble
 */

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
    const isUser = role === "user";

    return (
        <div className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`
        max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed
        ${isUser
                    ? "bg-accent text-white rounded-tr-none"
                    : "bg-card border border-border text-text-primary rounded-tl-none"
                }
      `}>
                {/* Label */}
                <p className={`text-xs mb-1 font-semibold ${isUser ? "text-white/70" : "text-accent"}`}>
                    {isUser ? "You" : "AI Assistant"}
                </p>

                {/* Content - preserving whitespace for paragraphs */}
                <div className="whitespace-pre-wrap">{content}</div>
            </div>
        </div>
    );
}
