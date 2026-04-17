# 📄 Resume Optimizer

An AI-powered resume optimization web application built with React, TypeScript, and Vite. Upload your resume, paste a job description, and get tailored suggestions to help your resume stand out and pass ATS (Applicant Tracking System) screening.

---

## ✨ Features

- **Resume Upload & Parsing** — Upload your resume in PDF format using PDF.js
- **AI-Powered Optimization** — Analyzes your resume against a job description and suggests improvements
- **PDF Export** — Download your optimized resume as a PDF using jsPDF / html2pdf.js
- **Responsive UI** — Clean, modern interface built with shadcn/ui and Tailwind CSS
- **Dark Mode Support** — Theme toggling via next-themes
- **Form Validation** — Robust input handling with React Hook Form and Zod

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui (Radix UI) |
| Routing | React Router DOM v6 |
| Forms | React Hook Form + Zod |
| PDF Parsing | pdfjs-dist |
| PDF Export | jsPDF, html2pdf.js |
| Data Fetching | TanStack React Query |
| Charts | Recharts |
| Testing | Vitest + Testing Library |
| Package Manager | Bun / npm |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ or [Bun](https://bun.sh/)
- An Anthropic API key (or your preferred AI provider key)

### Installation

```bash
# Clone the repository
git clone https://github.com/mayankydvv/resume_optimizer.git
cd resume_optimizer

# Install dependencies (using npm)
npm install

# Or using Bun
bun install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

> **Note:** Never commit your `.env` file. It is already included in `.gitignore`.

### Running the App

```bash
# Start the development server
npm run dev

# Or with Bun
bun dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |

---

## 📁 Project Structure

```
resume_optimizer/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components (shadcn/ui)
│   ├── pages/          # Route-level page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and helpers
│   └── main.tsx        # App entry point
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) with `@testing-library/react` for unit and component testing.

```bash
npm run test
```

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is open source. See the repository for license details.

---

## 👤 Author

**Mayank Yadav** — [@mayankydvv](https://github.com/mayankydvv)
