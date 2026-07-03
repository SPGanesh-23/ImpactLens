"use client";

import { useMemo } from "react";
import { format, subDays, isSameDay } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ImpactGraphProps {
  activities?: any[];
}

export default function ImpactGraph({ activities = [] }: ImpactGraphProps) {
  const data = useMemo(() => {
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      return subDays(new Date(), 6 - i);
    });

    return last7Days.map((date) => {
      // Find all activities for this day
      const dayActivities = activities.filter((act) => 
        act.timestamp && isSameDay(new Date(act.timestamp), date)
      );

      // Sum the impact value
      const totalImpact = dayActivities.reduce((sum, act) => sum + (act.impactValue || 0), 0);

      return {
        day: format(date, "EEE"), // Mon, Tue, Wed...
        carbon: totalImpact
      };
    });
  }, [activities]);

  return (
    <div className="card h-full w-full p-6 md:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-charcoal">
          Your Weekly Impact
        </h2>
        <p className="text-sm text-charcoal/70">
          Estimated Carbon Saved (kg CO₂)
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#737e1b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#737e1b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#706e5b" opacity={0.2} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#221f18", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#221f18", fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#e7e0d5",
                borderRadius: "12px",
                border: "2px solid #221f18",
                boxShadow: "4px 4px 0px #737e1b",
                fontWeight: "bold",
                color: "#221f18",
              }}
              itemStyle={{ color: "#737e1b", fontWeight: "bold" }}
              cursor={{ stroke: "#737e1b", strokeWidth: 2, strokeDasharray: "4 4" }}
            />
            <Area
              type="monotone"
              dataKey="carbon"
              name="Carbon Saved (kg)"
              stroke="#737e1b"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCarbon)"
              activeDot={{ r: 6, fill: "#221f18", stroke: "#737e1b", strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
