/**
 * Profile snapshot card - displays writing style overview
 */

import { ProfileSnapshot as ProfileSnapshotType } from "@/lib/types";

interface ProfileSnapshotProps {
    data: ProfileSnapshotType;
}

export default function ProfileSnapshot({ data }: ProfileSnapshotProps) {
    const items = [
        { label: "Writing Tone", value: data.tone, icon: "🎭" },
        { label: "Typical Length", value: data.typicalLength, icon: "📏" },
        { label: "Emoji Usage", value: data.emojiUsage, icon: "😀" },
        { label: "Formatting", value: data.formattingHabits, icon: "📝" },
    ];

    return (
        <div className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span className="text-xl">✍️</span>
                Profile Snapshot
            </h3>

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">{item.icon}</span>
                            <span className="text-sm font-medium text-text-secondary">
                                {item.label}
                            </span>
                        </div>
                        <p className="text-text-primary text-sm leading-relaxed">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
