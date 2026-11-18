# AIM Intelligence

Website built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4, deployed on Vercel
(project `sukone-hong-s-projects/aim-intelligence`). Every push deploys automatically.

## Develop

```bash
npm install
npm run dev
```

- http://localhost:3000 is the site
- http://localhost:3000/styleguide is the living style guide (colors, type, buttons, cards)

## Where to design

| Change                      | Edit                                |
| --------------------------- | ----------------------------------- |
| Words, links, nav           | `lib/site.ts`                       |
| Colors (light + dark)       | `app/globals.css` (`:root` tokens)  |
| Fonts                       | `app/layout.tsx` (Geist by default) |
| Page order / which sections | `app/page.tsx`                      |
| A single section's layout   | `components/sections/*.tsx`         |
| Header / footer             | `components/site/*.tsx`             |
| Reusable building blocks    | `components/ui/*.tsx`               |
| Favicon                     | `app/icon.svg`                      |

Color tokens are exposed to Tailwind as `bg-background`, `text-foreground`, `text-muted`,
`bg-surface`, `border-line`, `bg-accent`, `text-accent-foreground`.

## Scripts

| Script              | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Local dev server with hot reload      |
| `npm run build`     | Production build (what Vercel runs)   |
| `npm run lint`      | ESLint (Next.js rules)                |
| `npm run typecheck` | TypeScript check                      |
| `npm run format`    | Prettier, with Tailwind class sorting |
