# AIM Intelligence website

Next.js 16 App Router + TypeScript + Tailwind CSS v4. Deployed on Vercel from GitHub.

- Palette: light only (soft vanilla paper `#f5f0e4`, near-black ink). Colours are tokens on `:root` in
  `app/globals.css` (`--background`, `--ink`/`--ink-strong` as RGB triplets, `--glow`, `--marker`,
  `--ambient-a/b/c`); use them, not literal colours.
- Background: ambient light (`.ambient` in the grain field: three slow-drifting radial glows, colours
  `--ambient-a/b/c`, after attentionx.org) plus interactive grain from `components/grain-field.tsx` (live flicker,
  pointer glow, pixel trail, cross cursor). Cursor bar geometry is pixel-snapped: keep `--bar` in
  `app/globals.css` and `BAR_PX` in the component in step. Static fallback grain is `body::after`,
  hidden via `:root[data-grain="live"]`.
- Type system (all `next/font/local` from @fontsource, set up in `app/layout.tsx`):
  - Inter Tight (`--font-sans`): the voice. Headline at weight 300 (350 on phones), body text.
  - Instrument Serif (`--font-serif`): italic for emphasis (`.hero-accent`, at 1.14em to match the
    sans x-height); upright only in the footer headline and column headings.
  - Geist Mono (`--font-mono`): small tracked uppercase labels (navigation).
  - The logo is vector paths, not type.
- Header: `components/site-header.tsx` renders the motion logo (`components/aim-logo.tsx`, paths in
  `lib/aim-logo.ts`, motion in the `.aim-logo` rules). Full logo at the top of the page, "✛ AIM" once
  scrolled; phones keep "✛ AIM". Nav links (About, Research, Products, Solutions, Careers, News) spread across
  `--nav-span` on the right and fold into a Menu button below 820px; News goes to `/news`; the rest point at
  home-page `#anchors` until their pages exist. The current page's link is `aria-current`.
  The header is clear at the top of the page; once scrolled (`data-scrolled`) a solid band
  (`.site-header::before`, with a 36px fade below it) hides text passing beneath.
- Headline: `components/hero.tsx` (`.hero` rules). White key phrases, 48% connecting words. From
  700px up, `.hero-break` splits it into its three parts. "safe" and "under control." are circled by
  `components/marker-circle.tsx`: the loop is fitted to the glyphs' real ink (canvas measurement),
  drawn beneath the text, and the line holding it gets just enough margin to clear its neighbours.
- Backers line: Samsung, Hyundai, LG Electronics, NAVER, and Mirae Asset Capital. `lib/backers.ts` (Simple Icons; Mirae Asset swoosh from Wikimedia Commons), each mark
  in a square badge, all items centred on one flex row. `scale` sets each mark's size in its badge.
- Trusted by (`components/trusted.tsx`, `lib/trusted.ts`): handwritten note (Nothing You Could Do,
  `--font-hand`) with a tapered pen-stroke arrow (`lib/arrow.ts`, shown whole, no draw-in), then two logo rows drifting in opposite directions (60s linear,
  track = logos x4 sliding -50%, edge fades, no hover effect), after airfoil.studio. Logos are one-
  colour SVGs in `public/trusted/` drawn via CSS masks; height balanced by aspect ratio, `scale`
  trims heavy marks. PSG is a typeset placeholder until the right PSG logo is confirmed.
- News page (`app/news/page.tsx`, `components/news.tsx`): its own route, not on the home page. Large
  light "News" title, then the articles newest first: date, source lead-in + headline, arrow; each row
  links out to the article (after attentionx.org). Dates are the articles' own (arXiv: first version).
- Data / Research / Careers columns (`components/highlights.tsx`, `.highlight` rules): between the
  marquee and the footer, after pantheon.inc. Hairline, small uppercase label, title, one-line
  description, link with arrow (links level at the bottom; destinations are placeholders).
- Footer (`components/site-footer.tsx`), after exa.ai: closing headline in
  upright Instrument Serif ("The question is no longer “What can we do with AI?” It is “Who keeps it
  under control?”", second sentence on its own line), a hairline across the screen, link columns (serif
  headings, sans links; links are placeholders) with three badges stacked on the right (ISO 27001,
  OWASP GenAI Security Project, NVIDIA Inception: one-colour SVGs in `public/certs/` drawn as CSS masks),
  then the © line and "From Seoul 🇰🇷 and San Francisco 🇺🇸
  to the world 🌍". Last, the whole logo edge to edge across the screen, flush with the page bottom
  (after attentionx.org).
- The scrollbar is hidden.
- Respect `prefers-reduced-motion` for any new animation.
- Before committing: `npm run lint && npm run typecheck && npm run build`, and `npm run format`.
