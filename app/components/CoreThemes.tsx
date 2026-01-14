/**
 * Core themes card - displays recurring topics
 */

interface CoreThemesProps {
    themes: string[];
}

export default function CoreThemes({ themes }: CoreThemesProps) {
    return (
        <div className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span className="text-xl">🎯</span>
                Core Themes
            </h3>

            <div className="flex flex-wrap gap-2">
                {themes.map((theme, index) => (
                    <span
                        key={index}
                        className="
              px-3 py-1.5 rounded-lg text-sm
              bg-accent/10 text-accent border border-accent/20
              hover:bg-accent/20 transition-colors
            "
                    >
                        {theme}
                    </span>
                ))}
            </div>
        </div>
    );
}
