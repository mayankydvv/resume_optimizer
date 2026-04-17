import { Check, Sparkles } from "lucide-react";
import { useState } from "react";

interface SuggestionsListProps {
  suggestions: string[];
}

export const SuggestionsList = ({ suggestions }: SuggestionsListProps) => {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <ul className="space-y-3">
      {suggestions.map((s, i) => {
        const isChecked = checked.has(i);
        return (
          <li
            key={i}
            className="group animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className={`w-full text-left flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                isChecked
                  ? "bg-primary/10 border-primary/40 shadow-soft-glow"
                  : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
              }`}
            >
              <span
                className={`flex-shrink-0 mt-0.5 h-6 w-6 rounded-md border-2 flex items-center justify-center transition-all ${
                  isChecked
                    ? "bg-primary border-primary"
                    : "border-slate-500 group-hover:border-primary/60"
                }`}
              >
                {isChecked && <Check className="h-4 w-4 text-primary-foreground" strokeWidth={3} />}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-primary/70" />
                  <span className="text-xs font-mono-tech uppercase tracking-wider text-primary/80">
                    Improvement {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    isChecked ? "text-slate-200" : "text-slate-300"
                  }`}
                >
                  {s}
                </p>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
