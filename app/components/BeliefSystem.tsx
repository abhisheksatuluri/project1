/**
 * Belief system card - displays what account pushes vs avoids
 */

import { BeliefSystem as BeliefSystemType } from "@/lib/types";

interface BeliefSystemProps {
    data: BeliefSystemType;
}

export default function BeliefSystem({ data }: BeliefSystemProps) {
    return (
        <div className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span className="text-xl">💭</span>
                Belief System
            </h3>

            <div className="space-y-4">
                {/* What they push */}
                <div>
                    <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-2">
                        <span>✓</span> Consistently Pushes
                    </h4>
                    <ul className="space-y-1.5">
                        {data.pushes.map((item, index) => (
                            <li
                                key={index}
                                className="text-sm text-text-primary flex items-start gap-2"
                            >
                                <span className="text-green-400/50 mt-1">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* What they avoid */}
                <div>
                    <h4 className="text-sm font-medium text-red-400 mb-2 flex items-center gap-2">
                        <span>✗</span> Avoids / Disagrees With
                    </h4>
                    <ul className="space-y-1.5">
                        {data.avoids.map((item, index) => (
                            <li
                                key={index}
                                className="text-sm text-text-primary flex items-start gap-2"
                            >
                                <span className="text-red-400/50 mt-1">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
