// import { useEffect, useState } from "react";
// import { Brain } from "lucide-react";
// import type { AppState } from "@/types/resume";
// import { mockAnalysis } from "@/data/mockAnalysis";
// import { UploadZone } from "@/components/UploadZone";
// import { AnalyzingState } from "@/components/AnalyzingState";
// import { ResultsDashboard } from "@/components/ResultsDashboard";

// const Index = () => {
//   const [state, setState] = useState<AppState>("upload");
//   const [filename, setFilename] = useState<string>("resume.pdf");

//   const handleFile = (file: File) => {
//     setFilename(file.name);
//     setState("analyzing");
//   };

//   useEffect(() => {
//     if (state !== "analyzing") return;
//     const t = setTimeout(() => setState("results"), 3000);
//     return () => clearTimeout(t);
//   }, [state]);

//   return (
//     <main className="relative z-10 min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="px-6 md:px-10 py-6 flex items-center justify-between">
//         <div className="flex items-center gap-2.5">
//           <div className="relative">
//             <div className="absolute inset-0 bg-primary/40 blur-md rounded-lg" />
//             <div className="relative h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-soft-glow">
//               <Brain className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
//             </div>
//           </div>
//           <div className="leading-tight">
//             <div className="text-sm font-semibold text-slate-100 tracking-tight">
//               Résumé<span className="text-primary">.AI</span>
//             </div>
//             <div className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500">
//               ATS Intelligence Engine
//             </div>
//           </div>
//         </div>
//         <nav className="hidden md:flex items-center gap-6 text-xs font-mono-tech text-slate-400">
//           <span className="flex items-center gap-1.5">
//             <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
//             v1.0 · Live
//           </span>
//         </nav>
//       </header>

//       {/* Body */}
//       <section className="flex-1 flex items-center justify-center px-6 md:px-10 py-8 md:py-16">
//         {state === "upload" && (
//           <div className="w-full">
//             <div className="text-center mb-12 animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-slate-300 mb-6">
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
//                 Powered by neural ATS modeling
//               </div>
//               <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-100 mb-4">
//                 Land interviews. <br className="hidden md:block" />
//                 <span className="text-gradient">Beat the algorithm.</span>
//               </h1>
//               <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto">
//                 Drop your resume. Get a precision ATS score, surgical rewrites, and a
//                 recruiter-ready PDF — in seconds.
//               </p>
//             </div>
//             <UploadZone onFile={handleFile} />
//           </div>
//         )}

//         {state === "analyzing" && <AnalyzingState />}

//         {state === "results" && (
//           <ResultsDashboard
//             analysis={mockAnalysis}
//             filename={filename}
//             onReset={() => setState("upload")}
//           />
//         )}
//       </section>

//       <footer className="px-6 md:px-10 py-6 text-center text-xs font-mono-tech text-slate-600">
//         Processed locally · Your resume never leaves your browser
//       </footer>
//     </main>
//   );
// };

// export default Index;











// import { useState } from "react";
// import { Brain } from "lucide-react";
// import type { AppState, ResumeAnalysis } from "@/types/resume";
// import { UploadZone } from "@/components/UploadZone";
// import { AnalyzingState } from "@/components/AnalyzingState";
// import { ResultsDashboard } from "@/components/ResultsDashboard";

// // 1. PDF.js Import & Local Worker Setup (Bypasses the CDN 404 error)
// import * as pdfjsLib from "pdfjs-dist";
// // @ts-ignore - Vite specific import to grab the worker file URL directly from node_modules
// import workerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";
// pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

// // 2. Load the Gemini API Key from Vite's .env file
// const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// const Index = () => {
//   const [state, setState] = useState<AppState>("upload");
//   const [filename, setFilename] = useState<string>("resume.pdf");
//   const [analysisData, setAnalysisData] = useState<ResumeAnalysis | null>(null);

//   const processResume = async (file: File) => {
//     setFilename(file.name);
//     setState("analyzing");

//     try {
//       // Step A: Extract Text from the PDF
//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//       let extractedText = "";
      
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         extractedText += textContent.items.map((item: any) => item.str).join(" ") + "\n";
//       }

//       if (!extractedText.trim()) {
//         throw new Error("Could not extract any text from this PDF. It might be an image-based scan.");
//       }

//       // Step B: Send the raw text to the direct Gemini API
//       const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           systemInstruction: {
//             parts: [{ 
//               text: `You are an expert ATS resume analyzer. Analyze the text and return ONLY a JSON object exactly matching this structure: {"score": number, "suggestions": string[], "improved_text": string}. The score should be 0-100. Provide 3 specific, actionable suggestions. The improved_text should be a fully rewritten, ATS-optimized version of the resume.` 
//             }]
//           },
//           contents: [{
//             role: "user",
//             parts: [{ text: `Here is the resume text to analyze:\n\n${extractedText}` }]
//           }],
//           generationConfig: {
//             // This forces Gemini to respond with strictly valid JSON
//             responseMimeType: "application/json",
//             temperature: 0.7
//           }
//         })
//       });

//       if (!response.ok) {
//         const errData = await response.json().catch(() => ({}));
//         throw new Error(`Gemini API failed: ${response.status} - ${errData.error?.message || 'Unknown Error'}`);
//       }
      
//       const data = await response.json();
      
//       // Step C: Parse Gemini's specific response structure
//       const aiContent = data.candidates[0].content.parts[0].text;
//       const aiResult = JSON.parse(aiContent);

//       // Step D: Update the UI state with the real data
//       setAnalysisData({
//         score: aiResult.score,
//         suggestions: aiResult.suggestions,
//         improved_text: aiResult.improved_text,
//         original_text: extractedText,
//       });

//       setState("results");

//     } catch (error: any) {
//       console.error("Failed to process resume:", error);
//       alert(`Analysis Failed: ${error.message}`);
//       setState("upload"); // Reset UI on failure so the user isn't stuck loading
//     }
//   };

//   return (
//     <main className="relative z-10 min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="px-6 md:px-10 py-6 flex items-center justify-between">
//         <div className="flex items-center gap-2.5">
//           <div className="relative">
//             <div className="absolute inset-0 bg-primary/40 blur-md rounded-lg" />
//             <div className="relative h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-soft-glow">
//               <Brain className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
//             </div>
//           </div>
//           <div className="leading-tight">
//             <div className="text-sm font-semibold text-slate-100 tracking-tight">
//               Résumé<span className="text-primary">.AI</span>
//             </div>
//             <div className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500">
//               ATS Intelligence Engine
//             </div>
//           </div>
//         </div>
//         <nav className="hidden md:flex items-center gap-6 text-xs font-mono-tech text-slate-400">
//           <span className="flex items-center gap-1.5">
//             <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
//             v1.0 · Live
//           </span>
//         </nav>
//       </header>

//       {/* Body */}
//       <section className="flex-1 flex items-center justify-center px-6 md:px-10 py-8 md:py-16">
//         {state === "upload" && (
//           <div className="w-full">
//             <div className="text-center mb-12 animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-slate-300 mb-6">
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
//                 {/* Powered by neural ATS modeling */}
//               </div>
//               <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-100 mb-4">
//                 Land interviews. <br className="hidden md:block" />
//                 <span className="text-gradient">Beat the algorithm.</span>
//               </h1>
//               <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto">
//                 Drop your resume. Get a precision ATS score, surgical rewrites, and a
//                 recruiter-ready PDF — in seconds.
//               </p>
//             </div>
//             <UploadZone onFile={processResume} />
//           </div>
//         )}

//         {state === "analyzing" && <AnalyzingState />}

//         {state === "results" && analysisData && (
//           <ResultsDashboard
//             analysis={analysisData}
//             filename={filename}
//             onReset={() => setState("upload")}
//           />
//         )}
//       </section>

//       <footer className="px-6 md:px-10 py-6 text-center text-xs font-mono-tech text-slate-600">
//         {/* Processed locally · Your resume never leaves your browser */}
//       </footer>
//     </main>
//   );
// };

// export default Index;

















import { useState } from "react";
import { Brain } from "lucide-react";
import type { AppState, ResumeAnalysis } from "@/types/resume";
import { UploadZone } from "@/components/UploadZone";
import { AnalyzingState } from "@/components/AnalyzingState";
import { ResultsDashboard } from "@/components/ResultsDashboard";

// 1. PDF.js Import & Local Worker Setup (Bypasses CDN 404 errors)
import * as pdfjsLib from "pdfjs-dist";
// @ts-ignore - Vite specific import to grab the worker file URL directly
import workerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

// 2. Load the Gemini API Key from Vite's .env file
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Index = () => {
  const [state, setState] = useState<AppState>("upload");
  const [filename, setFilename] = useState<string>("resume.pdf");
  const [analysisData, setAnalysisData] = useState<ResumeAnalysis | null>(null);

  const processResume = async (file: File) => {
    setFilename(file.name);
    setState("analyzing");

    try {
      // --- STEP A: EXTRACT AND SANITIZE PDF TEXT ---
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let extractedText = "";
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((item: any) => item.str).join(" ") + "\n";
      }

      // Strip invisible control characters that PDFs hide (preserves normal text and newlines)
      extractedText = extractedText.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, "");

      if (!extractedText.trim()) {
        throw new Error("Could not extract any text from this PDF. It might be an image-based scan.");
      }

      // --- STEP B: SEND DIRECTLY TO GEMINI API ---
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ 
              text: `You are an expert ATS resume analyzer. Analyze the text and return ONLY a valid JSON object exactly matching this structure: {"score": number, "suggestions": string[], "improved_text": string}. The score should be 0-100. Provide 3 specific, actionable suggestions. The improved_text should be a fully rewritten, ATS-optimized version of the resume. CRITICAL: Ensure all line breaks in improved_text are properly escaped as \\n and do not include raw unescaped control characters.` 
            }]
          },
          contents: [{
            role: "user",
            parts: [{ text: `Here is the resume text to analyze:\n\n${extractedText}` }]
          }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7
          }
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(`Gemini API failed: ${response.status} - ${errData.error?.message || 'Unknown Error'}`);
      }
      
      const data = await response.json();
      
      // --- STEP C: CLEAN AND PARSE THE AI RESPONSE ---
      let aiContent = data.candidates[0].content.parts[0].text;
      
      // Strip markdown code blocks if Gemini accidentally wrapped the JSON
      aiContent = aiContent.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      
      // Strip any remaining bad control characters from the response
      aiContent = aiContent.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]+/g, "");
      
      const aiResult = JSON.parse(aiContent);

      // --- STEP D: UPDATE UI WITH REAL DATA ---
      setAnalysisData({
        score: aiResult.score,
        suggestions: aiResult.suggestions,
        improved_text: aiResult.improved_text,
        original_text: extractedText,
      });

      setState("results");

    } catch (error: any) {
      console.error("Failed to process resume:", error);
      alert(`Analysis Failed: ${error.message}`);
      setState("upload"); // Reset UI on failure
    }
  };

  return (
    <main className="relative z-10 min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/40 blur-md rounded-lg" />
            <div className="relative h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-soft-glow">
              <Brain className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
            </div>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-100 tracking-tight">
              Résumé<span className="text-primary">.AI</span>
            </div>
            <div className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-500">
              ATS Intelligence Engine
            </div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono-tech text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            v1.0 · Live
          </span>
        </nav>
      </header>

      {/* Body */}
      <section className="flex-1 flex items-center justify-center px-6 md:px-10 py-8 md:py-16">
        {state === "upload" && (
          <div className="w-full">
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-slate-300 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {/* Powered by neural ATS modeling */}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-100 mb-4">
                Land interviews. <br className="hidden md:block" />
                <span className="text-gradient">Beat the algorithm.</span>
              </h1>
              <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto">
                Drop your resume. Get a precision ATS score, surgical rewrites, and a
                recruiter-ready PDF — in seconds.
              </p>
            </div>
            <UploadZone onFile={processResume} />
          </div>
        )}

        {state === "analyzing" && <AnalyzingState />}

        {state === "results" && analysisData && (
          <ResultsDashboard
            analysis={analysisData}
            filename={filename}
            onReset={() => setState("upload")}
          />
        )}
      </section>

      <footer className="px-6 md:px-10 py-6 text-center text-xs font-mono-tech text-slate-600">
        {/* Processed locally · Your resume never leaves your browser */}
      </footer>
    </main>
  );
};

export default Index;