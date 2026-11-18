# AIM Intelligence website

Next.js 16 App Router + TypeScript + Tailwind CSS v4. Deployed on Vercel from GitHub.

- Currently a blank page: `#141413` background with interactive grain from
  `components/grain-field.tsx` (live flicker, pointer glow, pixel trail, cross cursor). Cursor bar geometry is pixel-snapped:
  keep `--bar` in `app/globals.css` and `BAR_PX` in the component in step.
  Static fallback grain is `body::after` in `app/globals.css`, hidden via `:root[data-grain="live"]`.
- Header: `components/site-header.tsx` renders the motion logo (`components/aim-logo.tsx`, paths in
  `lib/aim-logo.ts`, motion in the `.aim-logo` rules of `app/globals.css`). Full logo at the top of the
  page, "✛ AIM" once scrolled; phones keep "✛ AIM". Nav links (About, Research, Product, Careers, News)
  sit on the right and fold into a Menu button on phones; they point at `#anchors` until pages exist. The page has extra length (`.scroll-length`) so it scrolls.
- Typeface: Geist Mono everywhere (`next/font/local` from `@fontsource/geist-mono`, `--font-mono`).
  The logo is vector paths, not type.
- Headline: `components/hero.tsx`, styled by the `.hero` rules in `app/globals.css` (white key phrases,
  42% white connecting words; marker circles from `components/marker-circle.tsx`). The backers line
  under it uses `lib/backers.ts` (marks from Simple Icons and Wikimedia Commons) in square badges.
- Header is solid with a fade below, so content scrolls behind it. Nav span is set by `--nav-start` and
  `--nav-span` on `.site-nav`. The scrollbar is hidden (`html { scrollbar-width: none }`).
- Respect `prefers-reduced-motion` for any new animation.
- Before committing: `npm run lint && npm run typecheck && npm run build`, and `npm run format`.
