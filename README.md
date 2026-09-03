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
- `/contact` — form (Resend → Gmail, mailto fallback)
- `/style-guide`, `/privacy`, `/changelog`, `/license`

Contact submissions hit `POST /api/contact` and are emailed to `zakirmatloob149@gmail.com` via [Resend](https://resend.com). Copy `.env.example` to `.env.local`, add your `RESEND_API_KEY`, and restart the dev server. Without a key, the form falls back to the visitor’s mail client.

## Content

Edit `src/lib/data.ts` to change copy, roles, case studies, and journal posts. Images live in `public/images/`.
