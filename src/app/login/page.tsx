import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-olive px-4 py-2 text-center text-xs font-bold tracking-[0.14em] text-paper uppercase">
        Level up the planet · one green quest a day
      </div>
      <main className="arcade-grid flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-olive shadow-[0_6px_16px_rgba(115,126,27,0.3)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-7 w-7 text-paper"
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
          <h1 className="font-display mb-3 text-3xl font-semibold text-charcoal">
            Login coming soon
          </h1>
          <p className="mb-8 leading-relaxed text-warm">
            We&apos;re building the sign-in experience. Soon you&apos;ll log in to
            track quests, bank coins, and unlock badges. For now, explore the game.
          </p>
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
