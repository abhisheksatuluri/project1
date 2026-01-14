/**
 * Why It Works card - explains hooks, psychology, audience alignment
 */

import { WhyItWorks as WhyItWorksType } from "@/lib/types";

interface WhyItWorksProps {
    data: WhyItWorksType;
}

export default function WhyItWorks({ data }: WhyItWorksProps) {
    const sections = [
        {
            title: "Hooks",
            content: data.hooks,
            icon: "🪝",
            gradient: "from-purple-500/20 to-purple-500/5",
        },
        {
            title: "Psychology",
            content: data.psychology,
            icon: "🧠",
            gradient: "from-pink-500/20 to-pink-500/5",
        },
        {
            title: "Audience Alignment",
            content: data.audienceAlignment,
            icon: "🎯",
            gradient: "from-blue-500/20 to-blue-500/5",
        },
    ];

    return (
        <div className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span className="text-xl">⚡</span>
                Why Their Tweets Work
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className={`
              p-4 rounded-xl bg-gradient-to-br ${section.gradient}
              border border-border/50
            `}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{section.icon}</span>
                            <h4 className="text-sm font-semibold text-text-primary">
                                {section.title}
                            </h4>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            {section.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
