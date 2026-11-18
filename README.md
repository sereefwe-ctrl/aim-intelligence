# AIM Intelligence

A blank page: warm charcoal background (`#141413`) with interactive film grain.
Next.js 16 + Tailwind CSS v4, deployed on Vercel from GitHub.

```bash
npm install
npm run dev
```

## The grain

`components/grain-field.tsx` draws, on canvases over the page:

- **Live grain**: pre-rendered noise tiles shown at random offsets ~14 times a second.
- **Pointer glow**: a faint light that follows the pointer, which the grain catches.
- **Pixel trail**: grid-snapped squares shed by the pointer; faster movement sheds more.
  A click or tap releases a ring of squares.
- **Custom cursor**: a rounded square with exclusion blending (mouse/trackpad only).

With reduced motion on, the grain holds still and the trail is off. Without JavaScript,
a static grain texture (`public/textures/grain.webp`) is shown instead.

Tune it with the constants at the top of `components/grain-field.tsx` and the CSS
variables / `.grain-*` rules in `app/globals.css`.
