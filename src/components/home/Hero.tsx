import Link from "next/link";

function CoinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.2" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7v10M9.5 9.2c0-1 1.1-1.6 2.5-1.6s2.5.5 2.5 1.6-1 1.5-2.5 1.7c-1.5.2-2.5.7-2.5 1.8s1.1 1.7 2.5 1.7 2.5-.6 2.5-1.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const completedToday = [
  { label: "Biked to work", coins: 50, color: "text-olive" },
  { label: "Zero-waste lunch", coins: 30, color: "text-slate" },
  { label: "Reusable bottle refill", coins: 15, color: "text-gold" },
  { label: "Line-dried laundry", coins: 25, color: "text-warm" },
];

function SummaryCard() {
  const earnedToday = completedToday.reduce((sum, a) => sum + a.coins, 0);
  const nextBadgeAt = 300;
  const balance = 1240;
  const progress = Math.min(100, Math.round((earnedToday / 200) * 100));

  return (
    <div className="relative">
      <div className="bg-olive/10 absolute -inset-6 rounded-[2rem] blur-2xl" aria-hidden="true" />
      <div className="card relative">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-warm uppercase">
              Today&apos;s Summary
            </p>
            <p className="font-display text-lg font-semibold text-charcoal">Thursday</p>
          </div>
          <span className="coin-chip text-sm">
            <CoinIcon className="h-4 w-4" />
            {balance.toLocaleString()}
          </span>
        </div>

        <div className="mb-5 rounded-2xl border border-olive/25 bg-olive/5 p-4 text-center">
          <p className="text-xs font-semibold tracking-wider text-warm uppercase">
            Coins earned today
          </p>
          <p className="font-display mt-1 flex items-center justify-center gap-2 text-4xl font-bold text-olive">
            <CoinIcon className="h-7 w-7" />+{earnedToday}
          </p>
        </div>

        <ul className="mb-5 space-y-2.5">
          {completedToday.map((action) => (
            <li
              key={action.label}
              className="flex items-center justify-between rounded-lg border border-warm/20 bg-white/40 px-3 py-2"
            >
              <span className="flex items-center gap-2 text-sm text-charcoal">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-olive" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.18" />
                  <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {action.label}
              </span>
              <span className={`text-sm font-bold ${action.color}`}>+{action.coins}</span>
            </li>
          ))}
        </ul>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-warm">Next badge · Sprout</span>
            <span className="font-semibold text-olive-dark">{earnedToday}/{nextBadgeAt} today</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="arcade-grid px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <span className="tagline-bar mb-6">Your day · Gamified</span>
          <h1 className="font-display mb-6 text-4xl leading-tight font-semibold text-charcoal md:text-5xl lg:text-6xl">
            Turn every green choice into{" "}
            <span className="text-olive">coins &amp; badges.</span>
          </h1>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-warm">
            ImpactLens wraps your whole day of sustainable living into one summary.
            Finish a goal, earn coins. Stack enough coins, unlock a badge. Real
            climate action — with the satisfaction of a game.
          </p>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/login" className="btn-primary" id="get-started">
              Start today&apos;s quests
            </Link>
            <a href="#how-it-works" className="btn-outline">
              See how it works
            </a>
          </div>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="font-display text-2xl font-bold text-olive">12</p>
              <p className="text-xs tracking-wider text-warm uppercase">Day streak</p>
            </div>
            <div className="w-px bg-warm/20" aria-hidden="true" />
            <div>
              <p className="font-display text-2xl font-bold text-slate">Lvl 7</p>
              <p className="text-xs tracking-wider text-warm uppercase">Eco rank</p>
            </div>
            <div className="w-px bg-warm/20" aria-hidden="true" />
            <div>
              <p className="font-display text-2xl font-bold text-magenta">9</p>
              <p className="text-xs tracking-wider text-warm uppercase">Badges won</p>
            </div>
          </div>
        </div>
        <SummaryCard />
      </div>
    </section>
  );
}
