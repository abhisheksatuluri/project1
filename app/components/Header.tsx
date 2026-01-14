/**
 * Header component with logo and tagline
 */

export default function Header() {
    return (
        <header className="w-full py-6 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg glow-effect">
                        X
                    </div>
                    <div>
                        <h1 className="text-lg sm:text-xl font-bold text-text-primary">
                            Persona Blueprint
                        </h1>
                        <p className="text-xs text-text-secondary hidden sm:block">
                            Decode any X account
                        </p>
                    </div>
                </div>

                {/* Badge */}
                <div className="px-3 py-1.5 rounded-full bg-card border border-border text-xs text-text-secondary">
                    AI-Powered
                </div>
            </div>
        </header>
    );
}
