export default function Footer() {
  return (
    <footer className="border-t border-warm/20 px-4 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold text-charcoal">
            Impact<span className="text-olive">Lens</span>
          </p>
          <p className="mt-1 text-sm text-warm">
            Play your planet forward · Team 5 (Lumen)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="tagline-bar">SDG 12</span>
          <span className="tagline-bar">SDG 13</span>
        </div>
        <p className="text-center text-sm text-warm md:text-right">
          &copy; {new Date().getFullYear()} ImpactLens. For planet &amp; people.
        </p>
      </div>
    </footer>
  );
}
