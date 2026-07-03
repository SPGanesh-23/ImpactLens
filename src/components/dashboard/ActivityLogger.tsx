"use client";

import { useState } from "react";

export default function ActivityLogger({ onActivityLogged }: { onActivityLogged?: (activity: any) => void }) {
  const [activityText, setActivityText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activity: activityText }),
      });

      if (!response.ok) {
        throw new Error("Failed to log activity");
      }

      const data = await response.json();
      setActivityText("");
      if (onActivityLogged) {
        onActivityLogged(data);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card flex flex-col gap-4 shadow-[8px_8px_0px_#737E1B] border-2 border-charcoal bg-paper/90 backdrop-blur-sm p-6 rounded-2xl mb-8">
      <h2 className="font-display text-2xl font-bold text-charcoal">Log an Activity</h2>
      <p className="text-charcoal/80 text-sm">Tell us what sustainable action you took today. Our AI will categorize it and estimate the impact!</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="w-full rounded-xl border-2 border-charcoal bg-white/50 p-4 text-charcoal focus:outline-none focus:ring-0 focus:border-olive transition-colors placeholder:text-charcoal/50 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.05)] resize-none"
          placeholder="e.g., 'I biked to work instead of driving' or 'I started a compost bin today'"
          rows={3}
          value={activityText}
          onChange={(e) => setActivityText(e.target.value)}
          disabled={isLoading}
        />
        {error && <p className="text-red-600 font-bold text-sm bg-red-100 p-2 rounded border border-red-300">{error}</p>}
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !activityText.trim()}
            className="btn-primary"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-paper" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Log Activity 🌟"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
