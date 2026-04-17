import { useState } from "react";
import { FileCode2, Sparkles } from "lucide-react";

interface TextComparePanelProps {
  original: string;
  improved: string;
}

type Tab = "original" | "optimized";

export const TextComparePanel = ({ original, improved }: TextComparePanelProps) => {
  const [tab, setTab] = useState<Tab>("optimized");

  const tabs: { id: Tab; label: string; icon: typeof FileCode2 }[] = [
    { id: "original", label: "Original Text", icon: FileCode2 },
    { id: "optimized", label: "AI Optimized Preview", icon: Sparkles },
  ];

  const text = tab === "original" ? original : improved;
  const lines = text.split("\n");

  return (
    <div>
      {/* Segmented control */}
      <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 mb-4">
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active
                  ? "text-primary-foreground"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {active && (
                <span className="absolute inset-0 rounded-full bg-gradient-primary shadow-soft-glow" />
              )}
              <Icon className="relative h-4 w-4" />
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Code block */}
      <div className="rounded-2xl bg-[hsl(222_50%_5%)]/80 border border-white/10 overflow-hidden">
        {/* Editor chrome */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive/70" />
            <span className="h-3 w-3 rounded-full bg-warning/70" />
            <span className="h-3 w-3 rounded-full bg-primary/70" />
          </div>
          <span className="text-xs font-mono-tech text-slate-500">
            resume.{tab === "optimized" ? "optimized" : "original"}.txt
          </span>
          <span className="text-xs font-mono-tech text-slate-500">
            {lines.length} lines
          </span>
        </div>

        <div className="max-h-[420px] overflow-auto">
          <pre className="font-mono-tech text-[13px] leading-relaxed">
            {lines.map((line, i) => (
              <div
                key={i}
                className="flex hover:bg-white/[0.02] px-4 py-0.5"
              >
                <span className="select-none text-slate-600 w-10 flex-shrink-0 text-right pr-4">
                  {i + 1}
                </span>
                <span
                  className={
                    tab === "optimized"
                      ? "text-slate-200"
                      : "text-slate-400"
                  }
                >
                  {line || "\u00A0"}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};
