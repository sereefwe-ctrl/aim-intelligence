import { TRUSTED_ROWS } from "@/lib/trusted";

/** Logo height (px at the desktop size) for an aspect ratio: wide wordmarks a
 * little shorter, compact marks a little taller, so all carry the same weight. */
function logoHeight(ratio: number) {
  return Math.min(44, Math.max(22, 27 * Math.pow(ratio / 5, -0.3)));
}

/**
 * "trusted by": a handwritten note with a hand-drawn arrow, over two rows of
 * logos drifting in opposite directions (after airfoil.studio). Each track
 * holds its logos four times and slides by half its length, so the loop is
 * seamless on any screen width. Hovering a row pauses it.
 */
export function Trusted() {
  return (
    <section className="trusted" aria-labelledby="trusted-title">
      <div className="trusted-note" aria-hidden="true">
        <span className="trusted-hand">trusted by</span>
        <svg className="trusted-arrow" viewBox="0 0 64 92" fill="none">
          <path
            className="trusted-arrow-line"
            pathLength={1}
            d="M6 5c9 1.5 20.5 6.8 28.4 16.6C43.6 33 47 48.5 46.2 63.7c-.3 5.6-1 11.2-2 16.4"
          />
          <path
            className="trusted-arrow-head"
            pathLength={1}
            d="M33.5 70.5c3.6 3.9 6.9 7.6 10.3 11.4 3.7-4.4 7.6-8.3 11.8-11.6"
          />
        </svg>
      </div>
      <h2 id="trusted-title" className="sr-only">
        Trusted by
      </h2>

      <div className="marquee">
        {TRUSTED_ROWS.map((row, r) => (
          <div
            key={r}
            className="marquee-row"
            data-reverse={r % 2 || undefined}
          >
            <ul className="marquee-track">
              {[0, 1, 2, 3].flatMap((copy) =>
                row.map((logo) => {
                  const ratio = logo.w / logo.h;
                  const h =
                    logoHeight(ratio) * ("scale" in logo ? logo.scale : 1);
                  return (
                    <li
                      key={`${copy}-${logo.name}`}
                      className="marquee-item"
                      aria-hidden={copy > 0 || undefined}
                    >
                      <span
                        role="img"
                        aria-label={logo.name}
                        className="marquee-logo"
                        style={
                          {
                            "--logo": `url(${logo.src})`,
                            "--k": (h / 27).toFixed(3),
                            aspectRatio: ratio.toFixed(3),
                          } as React.CSSProperties
                        }
                      />
                    </li>
                  );
                }),
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
