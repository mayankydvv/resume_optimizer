import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileText, Sparkles } from "lucide-react";

interface UploadZoneProps {
  onFile: (file: File) => void;
}

export const UploadZone = ({ onFile }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        setError("Only .pdf files are supported.");
        return;
      }
      setError(null);
      onFile(file);
    },
    [onFile]
  );

  return (
    <div className="relative w-full max-w-3xl mx-auto animate-fade-in-up">
      {/* Glow halo */}
      <div
        className={`absolute -inset-1 rounded-[2rem] blur-2xl transition-opacity duration-500 ${
          isDragging ? "opacity-80" : "opacity-30"
        }`}
        style={{ background: "var(--gradient-primary)" }}
        aria-hidden
      />

      <label
        htmlFor="resume-upload"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`relative glass rounded-[2rem] p-12 md:p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? "scale-[1.02] border-primary/60 shadow-glow"
            : "hover:scale-[1.01] hover:border-primary/30 hover:shadow-soft-glow"
        }`}
      >
        <input
          ref={inputRef}
          id="resume-upload"
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse-ring" />
          <div className="relative h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <UploadCloud className="h-10 w-10 text-primary-foreground" strokeWidth={1.5} />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-100 mb-3">
          Optimize Your Career
        </h2>
        <p className="text-base md:text-lg text-slate-300/90 max-w-md mb-1">
          Drag &amp; drop your <span className="text-primary font-medium">PDF resume</span>
        </p>
        <p className="text-sm text-slate-400/80 mb-8">or click anywhere to browse files</p>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <FileText className="h-3.5 w-3.5 opacity-70" /> PDF only
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="h-3.5 w-3.5 opacity-70 text-primary" /> ATS-optimized output
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            100% private
          </span>
        </div>

        {error && (
          <p className="mt-6 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-full px-4 py-2">
            {error}
          </p>
        )}
      </label>
    </div>
  );
};
