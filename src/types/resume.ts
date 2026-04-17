export interface ResumeAnalysis {
  score: number;
  suggestions: string[];
  improved_text: string;
  original_text: string;
}

export type AppState = "upload" | "analyzing" | "results";
