import { Cpu } from "lucide-react";
import { useEffect, useState } from "react";

const phases = [
  "Parsing document structure…",
  "Extracting keywords & entities…",
  "Scoring against ATS rubric…",
  "Drafting optimized rewrites…",
];

export const AnalyzingState = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % phases.length), 750);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto glass rounded-[2rem] p-12 text-center animate-fade-in-up">
      <div className="relative mx-auto h-32 w-32 mb-8">
        {/* Outer pulsating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-ring" />
        <div className="absolute inset-2 rounded-full border border-primary/20" />
        {/* Spinning gradient arc */}
        <svg className="absolute inset-0 animate-spin-slow" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="arc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="url(#arc)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="120 200"
          />
        </svg>
        {/* Core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <Cpu className="h-7 w-7 text-primary-foreground" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold text-slate-100 mb-3">
        AI is reverse-engineering your resume for{" "}
        <span className="text-gradient">ATS success</span>…
      </h2>
      <p className="text-sm font-mono-tech text-primary/90 min-h-[1.5rem]">{phases[phase]}</p>

      <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <div className="h-full w-1/3 rounded-full bg-gradient-primary animate-shimmer" />
      </div>
    </div>
  );
};
