import Link from "next/link";

function CoinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.18" />
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

const navLinks = [
  { label: "Quests", href: "#quests" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Badges", href: "#badges" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-olive px-4 py-1.5 text-center text-[0.7rem] font-bold tracking-[0.14em] text-paper uppercase">
        Level up the planet · one green quest a day
      </div>
      <nav className="border-b border-warm/20 bg-paper/85 px-4 py-3.5 backdrop-blur-md md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-olive shadow-[0_4px_12px_rgba(115,126,27,0.3)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-paper"
                aria-hidden="true"
              >
                <path
                  d="M12 21c5-2 8-6 8-11V5l-8-2-8 2v5c0 5 3 9 8 11z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8c-2 1.5-3 3.5-3 6M12 8c2 1.5 3 3.5 3 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="font-display text-xl font-semibold text-charcoal">
              Impact<span className="text-olive">Lens</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-warm transition-colors hover:text-olive"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="coin-chip hidden text-sm sm:inline-flex">
              <CoinIcon className="h-4 w-4" />
              1,240
            </span>
            <Link href="/login" className="btn-outline">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
