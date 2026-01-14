/**
 * Tweet formulas card - displays structural patterns
 */

interface TweetFormulasProps {
    formulas: string[];
}

export default function TweetFormulas({ formulas }: TweetFormulasProps) {
    return (
        <div className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span className="text-xl">🧬</span>
                Tweet Formulas
            </h3>

            <ol className="space-y-3">
                {formulas.map((formula, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <span className="
              flex-shrink-0 w-6 h-6 rounded-full 
              bg-accent/10 text-accent text-xs font-bold
              flex items-center justify-center
            ">
                            {index + 1}
                        </span>
                        <span className="text-sm text-text-primary leading-relaxed">
                            {formula}
                        </span>
                    </li>
                ))}
            </ol>
        </div>
    );
}
