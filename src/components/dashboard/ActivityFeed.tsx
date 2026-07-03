"use client";

import { formatDistanceToNow } from "date-fns";

const CATEGORY_ICONS: Record<string, string> = {
  Transport: "🚲",
  Waste: "♻️",
  Energy: "⚡",
  Water: "💧",
  Food: "🥗",
};

const CATEGORY_COLORS: Record<string, string> = {
  Transport: "bg-blue-100 text-blue-700 border-blue-200",
  Waste: "bg-green-100 text-green-700 border-green-200",
  Energy: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Water: "bg-cyan-100 text-cyan-700 border-cyan-200",
  Food: "bg-orange-100 text-orange-700 border-orange-200",
};

export default function ActivityFeed({ activities }: { activities: any[] }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-4xl mb-4 opacity-50">🌱</div>
        <h3 className="font-display font-bold text-xl text-charcoal mb-2">No activities yet!</h3>
        <p className="text-charcoal/70">Start logging your sustainable actions to see them here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Recent Activity</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {activities.map((activity) => {
          const icon = CATEGORY_ICONS[activity.category] || "🌟";
          // We will stick to the earthy tones or just use inline styles if needed, but since we are using Tailwind, let's just use the earthy palette where possible.
          // Let's actually use the earthy style from page.tsx: `quest-tile`
          
          return (
            <div key={activity.id} className="quest-tile bg-white hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#2B2B2B] transition-all cursor-default">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-charcoal bg-warm shadow-[2px_2px_0px_#2B2B2B] text-2xl">
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal">{activity.category}</h3>
                    <p className="text-xs uppercase tracking-wider text-charcoal/60 font-bold mb-1">
                      {activity.timestamp ? formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true }) : "Just now"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-bold text-olive bg-olive/10 px-2 py-1 rounded-full border border-olive/30">
                  +{activity.impactValue || 0} 🟡
                </div>
              </div>
              <p className="text-sm text-charcoal/80 bg-paper/50 p-3 rounded-lg border border-charcoal/10">
                "{activity.originalText}"
              </p>
              {activity.tangibleImpact && (
                <div className="mt-3 bg-olive/10 border-2 border-olive/30 p-3 rounded-xl shadow-[inset_2px_2px_0px_rgba(0,0,0,0.05)]">
                  <p className="text-sm font-bold text-olive">
                    🍃 {activity.tangibleImpact}
                  </p>
                </div>
              )}
              {activity.description && !activity.tangibleImpact && (
                <p className="text-xs text-charcoal/60 mt-3 italic">
                  ✨ {activity.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
