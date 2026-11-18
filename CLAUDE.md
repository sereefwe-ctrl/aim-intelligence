# AIM Intelligence website

Next.js 16 App Router + TypeScript + Tailwind CSS v4. Deployed on Vercel from GitHub.

- Copy lives in `lib/site.ts`; components read from it, so do not hard-code text in components.
- Colors are CSS variables in `app/globals.css` mapped to Tailwind via `@theme inline`. Use token
  classes (`bg-surface`, `text-muted`, `text-faint`, `border-line`, `text-accent`) rather than raw palette colors,
  so the palette stays consistent. The page is dark-only, with film grain from `body::after`.
- Compose class names with `cn()` from `lib/cn.ts`.
- `/styleguide` previews tokens and `components/ui`; update it when adding a UI component.
- Before committing: `npm run lint && npm run typecheck && npm run build`, and `npm run format`.
