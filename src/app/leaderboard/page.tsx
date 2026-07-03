import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import TopNav from "@/components/navigation/TopNav";
import { getFirebaseAdminFirestore } from "@/lib/firebase-admin";

export const revalidate = 0; // Ensure fresh data on load

export default async function LeaderboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const firestore = getFirebaseAdminFirestore();
  const usersRef = firestore.collection("users");
  
  // Fetch current user to get their coins for the TopNav
  const currentUserSnapshot = await usersRef.where("email", "==", session.user?.email).limit(1).get();
  let currentUserCoins = 0;
  if (!currentUserSnapshot.empty) {
    currentUserCoins = currentUserSnapshot.docs[0].data().coins || 0;
  }

  // Fetch top 50 users
  const topUsersSnapshot = await usersRef.orderBy("coins", "desc").limit(50).get();
  const leaderboard = topUsersSnapshot.docs.map((doc, index) => ({
    id: doc.id,
    rank: index + 1,
    ...doc.data()
  })) as any[];

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <TopNav session={session} coins={currentUserCoins} />

      <main className="arcade-grid flex-1 py-8">
        <div className="mx-auto max-w-4xl px-4 space-y-8">
          
          <section className="card flex flex-col p-6 md:p-8 rounded-2xl shadow-[8px_8px_0px_#737E1B] bg-white text-center">
            <h1 className="font-display text-4xl font-black mb-2 text-charcoal tracking-tight">
              Global Leaderboard 🏆
            </h1>
            <p className="text-charcoal/80">See how your impact compares to the rest of the community.</p>
          </section>

          <section className="card p-4 md:p-8 rounded-2xl shadow-[8px_8px_0px_#737E1B] bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-charcoal/20 text-charcoal/60 font-bold uppercase tracking-wider text-sm">
                    <th className="p-4 w-16 text-center">Rank</th>
                    <th className="p-4">Eco Warrior</th>
                    <th className="p-4 hidden md:table-cell">Status</th>
                    <th className="p-4 text-right">Coins</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user) => {
                    const isCurrentUser = user.email === session.user?.email;
                    let rankBadge = user.rank;
                    if (user.rank === 1) rankBadge = "🥇";
                    if (user.rank === 2) rankBadge = "🥈";
                    if (user.rank === 3) rankBadge = "🥉";

                    return (
                      <tr 
                        key={user.id} 
                        className={`
                          border-b border-charcoal/10 hover:bg-warm/30 transition-colors
                          ${isCurrentUser ? 'bg-olive/10 font-bold border-l-4 border-l-olive' : ''}
                        `}
                      >
                        <td className="p-4 text-center font-display text-xl text-charcoal font-black">
                          {rankBadge}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {user.image ? (
                              <Image 
                                src={user.image} 
                                alt={user.name} 
                                width={40} 
                                height={40} 
                                className="rounded-full border-2 border-charcoal shadow-[2px_2px_0px_#2B2B2B]"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-charcoal bg-warm font-bold text-charcoal shadow-[2px_2px_0px_#2B2B2B]">
                                {user.name?.charAt(0) || "U"}
                              </div>
                            )}
                            <span className="text-charcoal truncate max-w-[150px] md:max-w-none">
                              {user.name} {isCurrentUser && "(You)"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <span className="bg-paper border border-charcoal px-3 py-1 rounded-full text-xs font-bold text-charcoal">
                            {user.ecoRank || "Seedling"}
                          </span>
                        </td>
                        <td className="p-4 text-right font-bold text-olive text-lg">
                          {user.coins || 0} 🟡
                        </td>
                      </tr>
                    );
                  })}
                  {leaderboard.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-charcoal/60">
                        No eco warriors found yet. Be the first!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
