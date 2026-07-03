import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TopNav from "@/components/navigation/TopNav";
import { getFirebaseAdminFirestore } from "@/lib/firebase-admin";
import ImpactDashboardClient from "@/components/dashboard/ImpactDashboardClient";

export const revalidate = 0;

export default async function ImpactPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const firestore = getFirebaseAdminFirestore();
  const usersRef = firestore.collection("users");
  
  const currentUserSnapshot = await usersRef.where("email", "==", session.user?.email).limit(1).get();
  
  let coins = 0;
  let activities: any[] = [];
  
  if (!currentUserSnapshot.empty) {
    const userDoc = currentUserSnapshot.docs[0];
    coins = userDoc.data().coins || 0;
    
    // Fetch all activities to aggregate them
    const activitiesSnapshot = await userDoc.ref.collection("activities").get();
    activities = activitiesSnapshot.docs.map(doc => doc.data());
  }

  // Aggregate stats by category
  const categoryStats = {
    Transport: { count: 0, coins: 0, icon: "🚲", color: "bg-blue-100 text-blue-800 border-blue-300" },
    Waste: { count: 0, coins: 0, icon: "♻️", color: "bg-green-100 text-green-800 border-green-300" },
    Energy: { count: 0, coins: 0, icon: "⚡", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
    Water: { count: 0, coins: 0, icon: "💧", color: "bg-cyan-100 text-cyan-800 border-cyan-300" },
    Food: { count: 0, coins: 0, icon: "🥗", color: "bg-orange-100 text-orange-800 border-orange-300" }
  };

  activities.forEach(act => {
    const cat = act.category as keyof typeof categoryStats;
    if (categoryStats[cat]) {
      categoryStats[cat].count += 1;
      categoryStats[cat].coins += (act.impactValue || 0);
    }
  });

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <TopNav session={session} coins={coins} />

      <main className="arcade-grid flex-1 py-8">
        <div className="mx-auto max-w-4xl px-4 space-y-8">
          <ImpactDashboardClient categoryStats={categoryStats} />
        </div>
      </main>
    </div>
  );
}
