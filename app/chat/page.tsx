/**
 * Chat page
 * Retrieves persona from sessionStorage and renders ChatWindow.
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnalyzeResponse } from "@/lib/types";
import ChatWindow from "@/app/components/ChatWindow";
import Header from "@/app/components/Header";

export default function ChatPage() {
    const [data, setData] = useState<AnalyzeResponse | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Retrieve data from session storage
        const stored = sessionStorage.getItem("currentPersona");
        if (stored) {
            try {
                setData(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse persona data", e);
            }
        } else {
            // No data found, redirect to home
            router.push("/");
        }
    }, [router]);

    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mb-4"></div>
                <p className="text-text-secondary">Loading chat...</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Header />
            <div className="flex-1 w-full">
                <ChatWindow data={data} />
            </div>
        </main>
    );
}
