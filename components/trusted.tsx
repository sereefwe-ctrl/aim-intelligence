import { ARROW } from "@/lib/arrow";
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
 * seamless on any screen width. The pointer has no effect on it.
 */
export function Trusted() {
  return (
    <section className="trusted" aria-labelledby="trusted-title">
      <div className="trusted-note" aria-hidden="true">
        <span className="trusted-hand">trusted by</span>
        <svg className="trusted-arrow" viewBox="0 0 120 120">
          <defs>
            {ARROW.map((s, i) => (
              <mask
                key={i}
                id={`trusted-arrow-${i}`}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="120"
                height="120"
              >
                <path
                  className={`trusted-arrow-pen trusted-arrow-pen-${i}`}
                  d={s.centre}
                  pathLength={1}
                />
              </mask>
            ))}
          </defs>
          {ARROW.map((s, i) => (
            <path
              key={i}
              className="trusted-arrow-ink"
              d={s.fill}
              mask={`url(#trusted-arrow-${i})`}
            />
          ))}
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
