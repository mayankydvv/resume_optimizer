// // @ts-ignore – html2pdf.js has no bundled types
// import html2pdf from "html2pdf.js";

// /**
//  * Builds a clean, ATS-friendly HTML resume from the improved plain text
//  * and triggers an immediate browser PDF download.
//  */
// export async function downloadResumePdf(improvedText: string, filename = "optimized-resume.pdf") {
//   const html = buildResumeHtml(improvedText);

//   const container = document.createElement("div");
//   container.innerHTML = html;
//   container.style.position = "fixed";
//   container.style.left = "-10000px";
//   container.style.top = "0";
//   document.body.appendChild(container);

//   try {
//     await html2pdf()
//       .from(container.firstElementChild as HTMLElement)
//       .set({
//         margin: [12, 14, 14, 14], // mm
//         filename,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
//         jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//         pagebreak: { mode: ["avoid-all", "css", "legacy"] },
//       })
//       .save();
//   } finally {
//     document.body.removeChild(container);
//   }
// }

// function escapeHtml(s: string) {
//   return s
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;");
// }

// function buildResumeHtml(text: string): string {
//   const rawLines = text.split("\n");
//   const blocks: string[] = [];

//   // First line = name, second = title
//   const name = rawLines[0]?.trim() || "Resume";
//   const title = rawLines[1]?.trim() || "";
//   const contact = rawLines[2]?.trim() || "";

//   let body = "";
//   let inList = false;

//   for (let i = 3; i < rawLines.length; i++) {
//     const line = rawLines[i];
//     const trimmed = line.trim();

//     if (!trimmed) {
//       if (inList) {
//         body += "</ul>";
//         inList = false;
//       }
//       body += "<div class='spacer'></div>";
//       continue;
//     }

//     // Section heading: ALL CAPS line (no lowercase letters)
//     if (/^[A-Z0-9 &/().,-]+$/.test(trimmed) && trimmed.length > 2 && !trimmed.startsWith("-")) {
//       if (inList) {
//         body += "</ul>";
//         inList = false;
//       }
//       body += `<h2>${escapeHtml(trimmed)}</h2>`;
//       continue;
//     }

//     // Bullet
//     if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
//       if (!inList) {
//         body += "<ul>";
//         inList = true;
//       }
//       body += `<li>${escapeHtml(trimmed.replace(/^[-•]\s*/, ""))}</li>`;
//       continue;
//     }

//     if (inList) {
//       body += "</ul>";
//       inList = false;
//     }

//     // Job/role line containing " — "
//     if (trimmed.includes("—") || trimmed.includes(" - ")) {
//       body += `<h3>${escapeHtml(trimmed)}</h3>`;
//     } else {
//       body += `<p>${escapeHtml(trimmed)}</p>`;
//     }
//   }
//   if (inList) body += "</ul>";

//   blocks.push(`
//     <div class="resume">
//       <header>
//         <h1>${escapeHtml(name)}</h1>
//         ${title ? `<div class="title">${escapeHtml(title)}</div>` : ""}
//         ${contact ? `<div class="contact">${escapeHtml(contact)}</div>` : ""}
//       </header>
//       <main>${body}</main>
//     </div>
//   `);

//   return `
//     <div style="background:#ffffff;color:#0f172a;font-family:'Inter','Helvetica Neue',Arial,sans-serif;padding:24px 28px;width:794px;box-sizing:border-box;">
//       <style>
//         .resume { font-size: 11pt; line-height: 1.5; color:#0f172a; }
//         .resume header { border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 14px; }
//         .resume h1 { font-size: 22pt; font-weight: 700; margin: 0; letter-spacing: -0.01em; color:#0f172a; }
//         .resume .title { font-size: 12pt; color:#475569; margin-top: 2px; font-weight: 500; }
//         .resume .contact { font-size: 9.5pt; color:#475569; margin-top: 6px; }
//         .resume h2 { font-size: 10.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color:#0f172a; margin: 16px 0 6px; padding-bottom: 3px; border-bottom: 1px solid #cbd5e1; }
//         .resume h3 { font-size: 11pt; font-weight: 600; margin: 10px 0 2px; color:#0f172a; }
//         .resume p { margin: 4px 0; }
//         .resume ul { margin: 4px 0 6px 18px; padding: 0; }
//         .resume li { margin: 2px 0; padding-left: 2px; }
//         .resume .spacer { height: 4px; }
//       </style>
//       ${blocks.join("")}
//     </div>
//   `;
// }




import { jsPDF } from "jspdf";

export async function downloadResumePdf(improvedText: string, filename = "optimized-resume.pdf") {
  // Create a standard A4 PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxLineWidth = pageWidth - margin * 2;
  let cursorY = 20;

  const lines = improvedText.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Handle empty lines (spacing)
    if (!line) {
      cursorY += 4;
      continue;
    }

    // Auto-add a new page if we reach the bottom
    if (cursorY > 280) {
      doc.addPage();
      cursorY = 20;
    }

    // Smart Styling Logic based on text patterns
    if (i === 0) {
      // Line 1 is usually the Name
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      cursorY += 2;
    } else if (line === line.toUpperCase() && line.length > 3 && !line.startsWith("-")) {
      // ALL CAPS lines are usually Section Headers (EXPERIENCE, SKILLS)
      cursorY += 6;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
    } else if (line.includes("—") || line.includes(" - ")) {
      // Lines with dashes are usually Job Titles / Dates
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
    } else {
      // Normal body text and bullet points
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
    }

    // Wrap text so it doesn't run off the right side of the page
    const splitText = doc.splitTextToSize(line, maxLineWidth);
    doc.text(splitText, margin, cursorY);
    
    // Move the cursor down for the next line
    cursorY += splitText.length * 5.5; 
  }

  // Trigger the download
  doc.save(filename);
}