# Molcloud · Cloud Engineer Portfolio

A sleek, single-page portfolio that highlights cloud, automation, and DevOps work from Roelof Mol. Built with modern React tooling so it loads fast, works offline once cached, and is effortless to deploy to any static host.

## ✨ Highlights
- Serverless-friendly static bundle generated with Vite 6.
- Responsive sections (Hero, Experience, Skills, Certifications, Projects, etc.).
- Subtle animations and a terminal-style welcome panel for extra personality.
- Clean component structure that is easy to extend when new achievements need a spotlight.

## 🧱 Tech Stack
- React 19 with functional components and hooks
- TypeScript for safer props and editor tooling
- Tailwind CSS compiled locally via PostCSS (no CDN/runtime dependency)
- Vite for dev server + production builds

## 🚀 Getting Started
> Prerequisite: Node.js 18+ (or the latest LTS release)

```bash
git clone https://github.com/roely15mol/Molcloud.git
cd Molcloud
npm install
npm run dev
```

The dev server prints a localhost URL (defaults to `http://localhost:3000`). Hot Module Replacement keeps edits instant.

### Available Scripts
| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `npm run dev`  | Start Vite in development mode with HMR.      |
| `npm run build`| Produce the optimized static bundle in `dist`.|
| `npm run preview` | Serve the production build locally.        |

## 🗂 Project Structure

```
Molcloud/
├─ components/        // Content sections (Hero, Projects, Skills, ...)
├─ hooks/             // Reusable logic like the typing effect
├─ App.tsx            // Composes the full page layout
├─ GuiApp.tsx         // Terminal-style UI variant
├─ TerminalApp.tsx    // Command-palette style intro
├─ index.tsx          // App entry + ReactDOM render
├─ vite.config.ts     // Vite + path alias configuration
└─ tsconfig.json
```

## 🛫 Deployment
1. Run `npm run build`.
2. Deploy the generated `dist/` folder to **GitHub Pages**, **Azure Static Web Apps**, **Netlify**, **Vercel**, or any S3/CloudFront bucket. No server code is required.

## 🔐 Security Hardening
- **Local assets only:** Tailwind and the boot audio tone now ship inside the bundle; no remote execution is required at runtime.
- **Content Security Policy:** `index.html` defines a restrictive CSP limiting external origins to analytics and Credly embeds.
- **Referrer policy:** All requests strip referrer data to avoid leaking visitor navigation.
- **Recommended response headers:** When hosting behind Azure Static Web Apps, Vercel, CloudFront, etc., add:
	- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
	- `X-Content-Type-Options: nosniff`
	- `X-Frame-Options: DENY`
	- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
	Add these via your CDN’s security/header settings so every response inherits the policy.

## 🛠 Customization Tips
- Update `components/*.tsx` to tailor copy, experience items, or CTA links.
- Add new sections by creating a component and wiring it into `App.tsx`.
- Adjust colors/typography directly within the component styles or by introducing a global stylesheet if you prefer central control.

## 🤝 Feedback
Found a typo, want a new section, or just enjoyed the site? Open an issue or drop a note—improvements are always welcome.
