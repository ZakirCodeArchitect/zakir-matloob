# Zakir Matloob — Personal Site

A 2026 personal site for **Zakir Matloob**: software engineer, AI engineer, and SAP-adjacent consultant. The work on this site is real — FFC, Metavision IT, Har Aik Global, HA EngagePro, Malta rentals, legal RAG, IdeaFlow, Sonic Lipsync.

The visual language is deliberate: saturated orange as a signal, black as a stage, cream as rest. Large condensed type, technical grids, analog grain, and motion that respects `prefers-reduced-motion`.

## Stack

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS v4
- Motion for React
- Lenis smooth scroll
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:43127](http://localhost:43127).

```bash
npm run build
npm start
```

## Pages

- `/` — full narrative: hero, proof, partnership, case studies, experience, journal, contact
- `/work` and `/work/[slug]` — case studies
- `/journal` and `/journal/[slug]` — writing
- `/about` — path, services, stack
- `/contact` — form (local API + mailto fallback)
- `/style-guide`, `/privacy`, `/changelog`, `/license`

Contact submissions hit `POST /api/contact`. There is no third-party mail provider in this repo, so the form validates and acknowledges locally, then falls back to your mail client if needed.

## Content

Edit `src/lib/data.ts` to change copy, roles, case studies, and journal posts. Images live in `public/images/`.
