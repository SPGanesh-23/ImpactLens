function CoinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.25" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v8M10 10c0-.9.9-1.4 2-1.4s2 .5 2 1.4-.8 1.3-2 1.5-2 .6-2 1.5.9 1.5 2 1.5 2-.5 2-1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

type Badge = {
  name: string;
  threshold: number;
  unlocked: boolean;
  color: string;
  glow: string;
  icon: React.ReactNode;
};

const badges: Badge[] = [
  {
    name: "Seedling",
    threshold: 100,
    unlocked: true,
    color: "rgba(115, 126, 27, 0.6)",
    glow: "rgba(115, 126, 27, 0.28)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 text-olive" aria-hidden="true">
        <path d="M12 20v-7M12 13c0-2.5 1.6-4 4-4-.3 2.5-1.6 4-4 4zM12 13c0-2.5-1.6-4-4-4 .3 2.5 1.6 4 4 4z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Sprout",
    threshold: 500,
    unlocked: true,
    color: "rgba(107, 125, 137, 0.6)",
    glow: "rgba(107, 125, 137, 0.28)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 text-slate" aria-hidden="true">
        <path d="M12 21v-9M12 12c-1-3-4-4-6-3 .5 3 3 4 6 3zM12 12c1-3 4-4 6-3-.5 3-3 4-6 3zM12 8c0-2 1.5-3.5 3-4-.3 2-1.5 3.5-3 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Forest Guardian",
    threshold: 1500,
    unlocked: false,
    color: "rgba(138, 125, 63, 0.6)",
    glow: "rgba(138, 125, 63, 0.3)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 text-gold" aria-hidden="true">
        <path d="M12 3l7 4v5c0 4.5-3 8.5-7 9-4-.5-7-4.5-7-9V7l7-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 8v7M9.5 11.5L12 9l2.5 2.5M9.5 14L12 11.5l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Earth Champion",
    threshold: 5000,
    unlocked: false,
    color: "rgba(169, 116, 79, 0.6)",
    glow: "rgba(169, 116, 79, 0.28)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 text-magenta" aria-hidden="true">
        <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 3c-1.5 2-1.5 8 0 10M12 3c1.5 2 1.5 8 0 10M7 8h10" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
        <path d="M8.5 13l-1 8L12 18.5 16.5 21l-1-8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Badges() {
  const currentCoins = 1240;

  return (
    <section id="badges" className="px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <span className="tagline-bar mb-4">Rewards</span>
          <h2 className="section-heading">
            Cash your coins in for <span className="text-magenta">badges</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-warm">
            Reach a coin milestone and the next badge unlocks automatically. Every
            tier is proof of a streak of real, planet-positive days.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {badges.map((badge) => {
            const progress = Math.min(100, Math.round((currentCoins / badge.threshold) * 100));
            return (
              <article
                key={badge.name}
                className="card flex flex-col items-center text-center"
              >
                <div
                  className={`badge-ring mb-4 h-20 w-20 ${badge.unlocked ? "" : "badge-locked"}`}
                  style={{ ["--ring-color" as string]: badge.color, ["--ring-glow" as string]: badge.glow }}
                >
                  {badge.unlocked ? (
                    badge.icon
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-warm" aria-hidden="true">
                      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal">
                  {badge.name}
                </h3>
                <span className="coin-chip mt-2 px-2.5 py-1 text-xs">
                  <CoinIcon className="h-3.5 w-3.5" />
                  {badge.threshold.toLocaleString()}
                </span>

                {badge.unlocked ? (
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold tracking-wider text-olive uppercase">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                      <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Unlocked
                  </span>
                ) : (
                  <div className="mt-4 w-full">
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="mt-1.5 text-xs text-warm">
                      {(badge.threshold - currentCoins).toLocaleString()} coins to go
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
