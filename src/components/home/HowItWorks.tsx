const steps = [
  {
    number: "01",
    title: "Track your day",
    description:
      "Check off sustainable actions as you live them — biking, cutting waste, saving energy, going meatless. It all becomes your daily summary.",
    accent: "text-olive",
    ring: "rgba(115, 126, 27, 0.55)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Earn coins",
    description:
      "Every goal you complete instantly drops coins into your wallet. Harder quests pay more — build streaks to multiply your daily haul.",
    accent: "text-gold",
    ring: "rgba(138, 125, 63, 0.55)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 8v8M10 10c0-.9.9-1.4 2-1.4s2 .5 2 1.4-.8 1.3-2 1.5-2 .6-2 1.5.9 1.5 2 1.5 2-.5 2-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Unlock badges",
    description:
      "Hit a coin milestone and a new badge unlocks. Show off your rank, keep the streak alive, and prove your impact is more than talk.",
    accent: "text-magenta",
    ring: "rgba(169, 116, 79, 0.55)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 13l-1.5 8L12 18.5 16.5 21 15 13" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M10 9l1.3 1.3L14 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="tagline-bar mb-4">The game loop</span>
          <h2 className="section-heading">Track. Earn. Unlock.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-warm">
            Three moves. One satisfying loop that makes saving the planet feel
            like leveling up.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {index < steps.length - 1 && (
                <div
                  className="neon-divider absolute top-8 left-[calc(50%+3rem)] hidden w-[calc(100%-6rem)] md:block"
                  aria-hidden="true"
                />
              )}
              <div
                className={`badge-ring mx-auto mb-4 h-16 w-16 ${step.accent}`}
                style={{ ["--ring-color" as string]: step.ring, ["--ring-glow" as string]: step.ring }}
              >
                {step.icon}
              </div>
              <span className="mb-2 block text-sm font-bold tracking-widest text-warm">
                {step.number}
              </span>
              <h3 className="font-display mb-3 text-2xl font-semibold text-charcoal">
                {step.title}
              </h3>
              <p className="leading-relaxed text-warm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
