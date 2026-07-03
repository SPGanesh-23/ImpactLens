import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ImpactGraph from "@/components/dashboard/ImpactGraph";
import ActivityDashboard from "@/components/dashboard/ActivityDashboard";
import TopNav from "@/components/navigation/TopNav";
import { getFirebaseAdminFirestore } from "@/lib/firebase-admin";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const firestore = getFirebaseAdminFirestore();
  const usersRef = firestore.collection("users");
  const snapshot = await usersRef.where("email", "==", session.user?.email).limit(1).get();
  
  let activities: any[] = [];
  let coins = 0;
  let streak = 0;
  let ecoRank = "Seedling";

  if (!snapshot.empty) {
    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    coins = userData.coins || 0;
    streak = userData.streak || 0;
    ecoRank = userData.ecoRank || "Seedling";

    const activitiesSnapshot = await userDoc.ref.collection("activities").orderBy("timestamp", "desc").limit(50).get();
    activities = activitiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <TopNav session={session} coins={coins} />

      <main className="arcade-grid flex-1 py-8">
        <div className="mx-auto max-w-5xl px-4 space-y-8">
          
          {/* Welcome & Stats Banner */}
          <section className="card flex flex-col gap-6 md:flex-row md:items-center md:justify-between p-6 md:p-8 rounded-2xl shadow-[8px_8px_0px_#737E1B]">
            <div>
              <h1 className="font-display text-3xl font-bold mb-1 text-charcoal">
                Welcome back, {session.user?.name?.split(" ")[0] || "Eco Warrior"}!
              </h1>
              <p className="text-charcoal/80">Your daily quests are ready.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-charcoal bg-paper/50 p-4 min-w-[100px]">
                <span className="text-2xl mb-1">🔥</span>
                <span className="font-display font-bold text-xl text-charcoal">{streak}</span>
                <span className="text-xs uppercase tracking-wider text-charcoal/80">Day Streak</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-charcoal bg-paper/50 p-4 min-w-[100px]">
                <span className="text-2xl mb-1">🌱</span>
                <span className="font-display font-bold text-xl text-charcoal">{ecoRank}</span>
                <span className="text-xs uppercase tracking-wider text-charcoal/80">Rank</span>
              </div>
            </div>
          </section>

          {/* Impact Graph Section */}
          <section>
            <ImpactGraph activities={activities} />
          </section>

          <section>
            <ActivityDashboard initialActivities={activities.slice(0, 10)} />
          </section>

        </div>
      </main>
    </div>
  );
}
