function CoinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.25" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v8M10 10c0-.9.9-1.4 2-1.4s2 .5 2 1.4-.8 1.3-2 1.5-2 .6-2 1.5.9 1.5 2 1.5 2-.5 2-1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

type Goal = {
  title: string;
  reward: number;
  difficulty: string;
  glow: string;
  border: string;
  ring: string;
  icon: React.ReactNode;
};

const OLIVE = { glow: "rgba(115, 126, 27, 0.26)", border: "rgba(115, 126, 27, 0.45)", ring: "text-olive" };
const SLATE = { glow: "rgba(107, 125, 137, 0.26)", border: "rgba(107, 125, 137, 0.45)", ring: "text-slate" };
const GOLD = { glow: "rgba(138, 125, 63, 0.28)", border: "rgba(138, 125, 63, 0.48)", ring: "text-gold" };
const CLAY = { glow: "rgba(169, 116, 79, 0.26)", border: "rgba(169, 116, 79, 0.45)", ring: "text-magenta" };

const goals: Goal[] = [
  {
    title: "Bike Commute",
    reward: 50,
    difficulty: "Daily",
    ...OLIVE,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <circle cx="6" cy="17" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="18" cy="17" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6 17l4-7h5l3 7M9 10l-1-3H6M14.5 10L17 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Zero-Waste Meal",
    reward: 30,
    difficulty: "Daily",
    ...SLATE,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <path d="M6 3v7a3 3 0 006 0V3M9 3v18M18 3c-1.5 1-2 3-2 6s.5 4 2 4v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Refill Bottle",
    reward: 15,
    difficulty: "Easy",
    ...GOLD,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <path d="M9 2h6M10 2v3l-2 2v13a2 2 0 002 2h4a2 2 0 002-2V7l-2-2V2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8 13h8" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Meatless Day",
    reward: 40,
    difficulty: "Medium",
    ...CLAY,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <path d="M12 3c-3 4-6 6-6 10a6 6 0 0012 0c0-4-3-6-6-10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 21V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Public Transit",
    reward: 35,
    difficulty: "Daily",
    ...SLATE,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <rect x="5" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 11h14M9 3v8M15 3v8" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="8.5" cy="14" r="1" fill="currentColor" />
        <circle cx="15.5" cy="14" r="1" fill="currentColor" />
        <path d="M8 17l-2 4M16 17l2 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Recycle Run",
    reward: 20,
    difficulty: "Easy",
    ...OLIVE,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <path d="M7 8L5 11l3 1M17 8l2 3-3 1M9 19h6l-2-3M12 5l2 3M12 5l-2 3M9 19l-3-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Save Energy",
    reward: 25,
    difficulty: "Medium",
    ...GOLD,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <path d="M13 2L5 13h6l-1 9 8-11h-6l1-9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Plant Care",
    reward: 10,
    difficulty: "Easy",
    ...CLAY,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
        <path d="M12 21v-8M12 13c0-3 2-5 5-5-.5 3-2 5-5 5zM12 13c0-3-2-5-5-5 .5 3 2 5 5 5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function DailyGoals() {
  return (
    <section id="quests" className="px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="tagline-bar mb-4">Top quests</span>
            <h2 className="section-heading">Pick your daily goals</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-warm">
              Every completed goal drops coins into your wallet. Chase the big
              rewards or rack up easy wins — your day, your strategy.
            </p>
          </div>
          <span className="coin-chip">
            <CoinIcon className="h-4 w-4" />
            Up to +225 today
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {goals.map((goal) => (
            <article
              key={goal.title}
              className="quest-tile group flex flex-col"
              style={
                {
                  "--tile-glow": goal.glow,
                  "--tile-border": goal.border,
                } as React.CSSProperties
              }
            >
              <div className="mb-4 flex items-start justify-between">
                <span className={`${goal.ring}`}>{goal.icon}</span>
                <span className="coin-chip px-2 py-1 text-xs">
                  <CoinIcon className="h-3.5 w-3.5" />+{goal.reward}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-charcoal">
                {goal.title}
              </h3>
              <p className="mt-1 text-xs font-medium tracking-wider text-warm uppercase">
                {goal.difficulty}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-olive opacity-0 transition-opacity group-hover:opacity-100">
                Complete goal
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
