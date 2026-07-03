import Link from "next/link";
import { Session } from "next-auth";
import ProfileDropdown from "./ProfileDropdown";

interface TopNavProps {
  session: Session;
  coins: number;
}

export default function TopNav({ session, coins }: TopNavProps) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b-2 border-charcoal bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href="/dashboard" className="font-display text-xl font-black text-charcoal">
            Impact<span className="text-olive">Lens</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-4 font-bold text-charcoal">
              <Link href="/dashboard" className="hover:text-olive transition-colors">Dashboard</Link>
              <Link href="/leaderboard" className="hover:text-olive transition-colors">Leaderboard</Link>
              <Link href="/impact" className="hover:text-olive transition-colors">Impact</Link>
            </nav>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 rounded-full border-2 border-charcoal bg-warm px-3 py-1 font-bold text-charcoal shadow-[2px_2px_0px_#2B2B2B]">
                <span className="text-olive">🟡</span> {coins}
              </div>
              
              {session.user && <ProfileDropdown user={session.user} />}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden sticky top-16 z-40 flex items-center justify-around border-b-2 border-charcoal bg-paper/95 p-3 text-sm font-bold text-charcoal backdrop-blur-sm">
        <Link href="/dashboard" className="hover:text-olive transition-colors">Dashboard</Link>
        <Link href="/leaderboard" className="hover:text-olive transition-colors">Leaderboard</Link>
        <Link href="/impact" className="hover:text-olive transition-colors">Impact</Link>
      </nav>
    </>
  );
}
