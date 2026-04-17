import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge = ({ score }: ScoreGaugeProps) => {
  const [animated, setAnimated] = useState(0);
  const isGood = score >= 70;
  const color = isGood ? "hsl(var(--primary))" : "hsl(var(--warning))";
  const glow = isGood ? "hsl(var(--primary) / 0.5)" : "hsl(var(--warning) / 0.5)";

  // Semi-circle gauge: arc length 220deg
  const radius = 80;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference - (animated / 100) * circumference;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(t);
  }, [score]);

  const label = score >= 85 ? "Excellent" : score >= 70 ? "Strong" : score >= 50 ? "Needs Work" : "Critical";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg width="240" height="160" viewBox="0 0 200 130" className="overflow-visible">
          <defs>
            <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Track */}
          <path
            d="M 20 110 A 80 80 0 0 1 180 110"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Tick marks */}
          {Array.from({ length: 11 }).map((_, i) => {
            const angle = Math.PI - (i / 10) * Math.PI;
            const x1 = 100 + Math.cos(angle) * 92;
            const y1 = 110 - Math.sin(angle) * 92;
            const x2 = 100 + Math.cos(angle) * 100;
            const y2 = 110 - Math.sin(angle) * 100;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="1"
                opacity={i % 5 === 0 ? 0.6 : 0.25}
              />
            );
          })}

          {/* Active arc */}
          <path
            d="M 20 110 A 80 80 0 0 1 180 110"
            fill="none"
            stroke="url(#gauge-grad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
              filter: `drop-shadow(0 0 8px ${glow})`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <div className="text-6xl font-bold tracking-tight tabular-nums" style={{ color }}>
            {Math.round(animated)}
          </div>
          <div className="text-xs font-mono-tech text-slate-400 -mt-1">/ 100 ATS</div>
        </div>
      </div>

      <div
        className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border"
        style={{
          color,
          borderColor: `${color.slice(0, -1)} / 0.3)`.replace("hsl(", "hsl("),
          background: `${color.slice(0, -1)} / 0.08)`.replace("hsl(", "hsl("),
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: color }} />
        {label}
      </div>
    </div>
  );
};
