import type { ResumeAnalysis } from "@/types/resume";

export const mockAnalysis: ResumeAnalysis = {
  score: 81,
  suggestions: [
    "Replace passive verbs with strong action words like 'Spearheaded', 'Architected', and 'Optimized' to match ATS keyword density.",
    "Quantify achievements with metrics — e.g., 'Reduced API latency by 42%' instead of 'Improved API performance'.",
    "Add a dedicated 'Core Competencies' section with 8–12 ATS-friendly keywords aligned to senior frontend roles (React, TypeScript, System Design).",
  ],
  original_text: `JANE DOE
Software Engineer
jane.doe@email.com  |  +1 555 123 4567  |  linkedin.com/in/janedoe

EXPERIENCE
Frontend Developer — Acme Corp (2021 - Present)
- Worked on the company's main web application.
- Helped improve performance of several pages.
- Was responsible for code reviews and mentoring juniors.
- Collaborated with designers on new features.

Junior Developer — Startup Inc (2019 - 2021)
- Built UI components for the dashboard.
- Fixed bugs reported by QA.
- Took part in sprint planning meetings.

EDUCATION
B.Sc. Computer Science — State University (2015 - 2019)

SKILLS
JavaScript, React, HTML, CSS, Git`,
  improved_text: `JANE DOE
Senior Frontend Engineer
jane.doe@email.com  |  +1 555 123 4567  |  linkedin.com/in/janedoe

CORE COMPETENCIES
React • TypeScript • Next.js • System Design • Performance Optimization
Design Systems • Web Accessibility (WCAG) • CI/CD • Testing (Vitest, Playwright)

EXPERIENCE
Senior Frontend Engineer — Acme Corp (2021 - Present)
- Architected a modular design system adopted across 14 product teams, reducing UI delivery time by 38%.
- Optimized critical rendering path, cutting Largest Contentful Paint from 3.4s to 1.1s (-67%) on the flagship dashboard.
- Spearheaded migration to TypeScript across a 220k LOC codebase, eliminating 91% of runtime type errors in 6 months.
- Mentored 7 engineers through structured code reviews and pairing, with 4 promoted to mid/senior roles.

Frontend Developer — Startup Inc (2019 - 2021)
- Engineered 40+ reusable React components powering the analytics dashboard used by 12k daily active users.
- Resolved 180+ production defects with an average turnaround of 36 hours, improving NPS by 22 points.
- Drove adoption of automated visual regression testing, reducing UI regressions reaching production by 74%.

EDUCATION
B.Sc. Computer Science — State University (2015 - 2019)

TECHNICAL SKILLS
Languages: TypeScript, JavaScript (ES2023), HTML5, CSS3
Frameworks: React 18, Next.js 14, Vite, Tailwind CSS, Radix UI
Tooling: Git, GitHub Actions, Docker, Vercel, Storybook, Vitest, Playwright`,
};
