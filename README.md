# AIM Intelligence

The AIM Intelligence website: a soft vanilla page with live film grain, the motion logo, the headline
with hand-drawn marker circles, the "trusted by" logo marquee, a News page and the footer.
Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, deployed on Vercel from GitHub.

## Run it

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Pages reload as you edit.

Before sharing a change, check it:

```bash
npm run lint && npm run typecheck && npm run build
npm run format
```

## Where things are

| What                                        | Files                                                                         |
| ------------------------------------------- | ----------------------------------------------------------------------------- |
| Home page / News page                       | `app/page.tsx`, `app/news/page.tsx`                                           |
| Fonts, page title                           | `app/layout.tsx`                                                              |
| All styling (colours are tokens at the top) | `app/globals.css`                                                             |
| Loading screen                              | `components/intro-loader.tsx`                                                 |
| Header and motion logo                      | `components/site-header.tsx`, `components/aim-logo.tsx`, `lib/aim-logo.ts`    |
| Headline, marker circles, backers line      | `components/hero.tsx`, `components/marker-circle.tsx`, `lib/backers.ts`       |
| "trusted by" note and logo rows             | `components/trusted.tsx`, `lib/trusted.ts`, `lib/arrow.ts`, `public/trusted/` |
| Benchmark / Research / Careers columns      | `components/highlights.tsx`                                                   |
| News articles                               | `components/news.tsx`                                                         |
| Footer, links, badges                       | `components/site-footer.tsx`, `public/certs/`                                 |
| Grain, pointer trail, cross cursor          | `components/grain-field.tsx`                                                  |

`CLAUDE.md` describes every part of the design in more detail (sizes, timings, references).

Common edits:

- **Text**: the words live in the component files above (for example the headline in
  `components/hero.tsx`, the footer quote in `components/site-footer.tsx`).
- **News**: add an entry to the `NEWS` list at the top of `components/news.tsx`.
- **Logos in the marquee**: add a one-colour SVG to `public/trusted/` and list it in `lib/trusted.ts`.
- **Colours**: change the tokens on `:root` in `app/globals.css` rather than writing colours inline.

## The grain

`components/grain-field.tsx` draws, on canvases over the page:

- **Live grain**: pre-rendered noise tiles shown at random offsets ~14 times a second.
- **Pointer glow**: a faint light that follows the pointer, which the grain catches.
- **Pixel trail**: grid-snapped squares shed by the pointer; faster movement sheds more.
  A click or tap releases a ring of squares.
- **Cross cursor**: the AIM cross (four bars, open centre) with exclusion blending,
  mouse/trackpad only. Press: the bars converge and it turns 45° into an ×. Release:
  the bars kick out and spring back as it completes a quarter turn. Over links and
  buttons the bars spread.

With reduced motion on, the grain holds still and the trail is off. Without JavaScript,
a static grain texture (`public/textures/grain.webp`) is shown instead.

Tune it with the constants at the top of `components/grain-field.tsx` and the CSS
variables / `.grain-*` rules in `app/globals.css`.

## Motion

Every animation respects the system's reduced-motion setting: the loading screen is skipped, the
marker circles appear already drawn and the logo rows stop.
