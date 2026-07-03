"use client";

import { useState } from "react";

interface CategoryStats {
  [key: string]: {
    count: number;
    coins: number;
    icon: string;
    color: string;
  };
}

interface ImpactDashboardClientProps {
  categoryStats: CategoryStats;
}

export default function ImpactDashboardClient({ categoryStats }: ImpactDashboardClientProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSummaries, setAiSummaries] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImpacts = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch("/api/impact-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats: categoryStats })
      });

      if (!response.ok) {
        throw new Error("Failed to generate AI impact summaries");
      }

      const data = await response.json();
      setAiSummaries(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Button */}
      <section className="card flex flex-col p-6 md:p-8 rounded-2xl shadow-[8px_8px_0px_#737E1B] bg-white text-center">
        <h1 className="font-display text-4xl font-black mb-2 text-charcoal tracking-tight">
          Your Global Impact 🌍
        </h1>
        <p className="text-charcoal/80 mb-6">A breakdown of how your actions are helping nature across different categories.</p>
        
        <div>
          <button 
            onClick={handleGenerateImpacts}
            disabled={isGenerating}
            className="btn-primary text-lg px-8 py-3 w-full md:w-auto inline-flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5 text-paper" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating Real-Life Impact...
              </>
            ) : (
              "✨ Calculate My Real-Life Impact ✨"
            )}
          </button>
        </div>
        {error && <p className="text-red-600 mt-4 font-bold">{error}</p>}
      </section>

      {/* Grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(categoryStats).map(([catName, stats]) => (
          <div key={catName} className={`card flex flex-col p-6 rounded-2xl shadow-[6px_6px_0px_#2B2B2B] border-2 border-charcoal ${stats.color}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl bg-white p-3 rounded-xl shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)]">
                {stats.icon}
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">{catName}</h3>
                <p className="text-sm font-bold opacity-75">{stats.count} actions</p>
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t-2 border-current/20 flex justify-between items-center font-bold">
              <span>Total Impact</span>
              <span className="text-xl">+{stats.coins} 🟡</span>
            </div>

            {/* AI Summary Reveal */}
            {aiSummaries && aiSummaries[catName] && (
              <div className="mt-4 bg-white/50 border border-current/20 rounded-xl p-4 text-sm font-bold shadow-[inset_2px_2px_0px_rgba(0,0,0,0.05)] animate-in fade-in slide-in-from-bottom-2 duration-500">
                🌱 {aiSummaries[catName]}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
