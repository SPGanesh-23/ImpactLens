import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-20">
      <div className="bg-olive mx-auto max-w-6xl rounded-3xl px-8 py-16 text-center md:px-16">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-paper/30 px-3 py-1 text-xs font-bold tracking-[0.1em] text-paper uppercase">
          Ready to play?
        </span>
        <h2 className="font-display mb-4 text-3xl font-semibold text-paper md:text-4xl">
          Your planet-saving streak starts today.
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-lg text-paper/85">
          Complete your first quest, bank your first coins, and claim your Seedling
          badge before the day ends.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-lg bg-paper px-8 py-3.5 text-base font-semibold text-olive transition-colors hover:bg-paper-light"
        >
          Start earning coins
        </Link>
      </div>
    </section>
  );
}
