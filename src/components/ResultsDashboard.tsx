import { Download, RotateCcw, ShieldCheck, Target, Wand2 } from "lucide-react";
import { useState } from "react";
import type { ResumeAnalysis } from "@/types/resume";
import { ScoreGauge } from "./ScoreGauge";
import { SuggestionsList } from "./SuggestionsList";
import { TextComparePanel } from "./TextComparePanel";
import { downloadResumePdf } from "@/lib/generatePdf";

interface ResultsDashboardProps {
  analysis: ResumeAnalysis;
  filename: string;
  onReset: () => void;
}

export const ResultsDashboard = ({ analysis, filename, onReset }: ResultsDashboardProps) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const outName = filename.replace(/\.pdf$/i, "") + "-optimized.pdf";
      await downloadResumePdf(analysis.improved_text, outName);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono-tech uppercase tracking-widest text-primary">
              Analysis complete
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
            ATS Intelligence Report
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-mono-tech truncate max-w-md">
            {filename}
          </p>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-slate-100 transition-all"
        >
          <RotateCcw className="h-4 w-4" />
          Analyze another
        </button>
      </div>

      {/* Top row: Score + Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Panel A: Score */}
        <div className="lg:col-span-2 glass rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="flex items-center gap-2 mb-6 self-start">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-xs font-mono-tech uppercase tracking-widest text-slate-400">
              ATS Compatibility
            </span>
          </div>
          <ScoreGauge score={analysis.score} />
          <div className="mt-6 grid grid-cols-3 gap-3 w-full text-center">
            <Stat label="Keywords" value="84%" />
            <Stat label="Format" value="92%" />
            <Stat label="Impact" value="71%" />
          </div>
        </div>

        {/* Panel B: Suggestions */}
        <div className="lg:col-span-3 glass rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-primary" />
              <span className="text-xs font-mono-tech uppercase tracking-widest text-slate-400">
                Actionable AI Improvements
              </span>
            </div>
            <span className="text-xs text-slate-500">{analysis.suggestions.length} items</span>
          </div>
          <SuggestionsList suggestions={analysis.suggestions} />
        </div>
      </div>

      {/* Panel C: Compare */}
      <div className="glass rounded-3xl p-8">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span className="text-xs font-mono-tech uppercase tracking-widest text-slate-400">
            Text Diff & Preview
          </span>
        </div>
        <TextComparePanel original={analysis.original_text} improved={analysis.improved_text} />
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-primary-foreground bg-gradient-primary shadow-glow hover:scale-[1.02] active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-wait"
        >
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
            style={{ background: "var(--gradient-primary)" }}
            aria-hidden
          />
          <Download className="relative h-5 w-5" strokeWidth={2.2} />
          <span className="relative">
            {downloading ? "Generating PDF…" : "Implement Changes & Download"}
          </span>
        </button>
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl bg-white/[0.03] border border-white/10 py-2.5">
    <div className="text-base font-semibold text-slate-100 tabular-nums">{value}</div>
    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono-tech mt-0.5">
      {label}
    </div>
  </div>
);
