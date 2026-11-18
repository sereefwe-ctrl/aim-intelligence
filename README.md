# AIM Intelligence

A blank page: warm charcoal background (`#141413`) with interactive film grain and the AIM INTELLIGENCE
motion logo in the header.
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
- **Cross cursor**: the AIM cross (four bars, open centre) with exclusion blending,
  mouse/trackpad only. Press: the bars converge and it turns 45° into an ×. Release:
  the bars kick out and spring back as it completes a quarter turn. Over links and
  buttons the bars spread.

With reduced motion on, the grain holds still and the trail is off. Without JavaScript,
a static grain texture (`public/textures/grain.webp`) is shown instead.

Tune it with the constants at the top of `components/grain-field.tsx` and the CSS
variables / `.grain-*` rules in `app/globals.css`.

## The header logo

`components/site-header.tsx` shows the logo in a sticky header. It opens as "✛ AIM", then INTELLIGENCE
slides out from behind the M while the cross turns 180° clockwise. Scrolling down collapses it back to
"✛ AIM"; returning to the top expands it again. Timing follows Anthropic's header logo: 633ms on
`cubic-bezier(0.77, 0, 0.175, 1)`, letters fading over one half of the motion. Phones keep "✛ AIM".
