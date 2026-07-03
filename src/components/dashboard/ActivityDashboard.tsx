"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ActivityLogger from "./ActivityLogger";
import ActivityFeed from "./ActivityFeed";

export default function ActivityDashboard({ initialActivities }: { initialActivities: any[] }) {
  const [activities, setActivities] = useState<any[]>(initialActivities);
  const router = useRouter();

  const handleActivityLogged = (newActivity: any) => {
    setActivities((prev) => [newActivity, ...prev]);
    router.refresh(); // Tells Next.js to re-fetch the server data (coins, streak, graph)
  };

  return (
    <div className="flex flex-col gap-8">
      <ActivityLogger onActivityLogged={handleActivityLogged} />
      <ActivityFeed activities={activities} />
    </div>
  );
}
