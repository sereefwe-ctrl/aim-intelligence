import { MarkerCircle } from "@/components/marker-circle";
import { BACKERS } from "@/lib/backers";

/**
 * Headline: white for the name and the key phrases, muted for the words that
 * connect them, with "safe" and "under control." circled in marker. The
 * circles draw in after the header logo's intro (0.7s wait + 0.63s motion).
 * Below it, the backers line: each name led by its mark in a square badge.
 */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero-title">
        AIM Intelligence{" "}
        <span className="hero-muted">
          is an applied research lab dedicated to building
        </span>{" "}
        security infrastructure <span className="hero-muted">to keep</span>{" "}
        Artificial Superintelligence{" "}
        <MarkerCircle seed={7} delay={1400} duration={620}>
          safe
        </MarkerCircle>{" "}
        and{" "}
        <MarkerCircle seed={23} delay={2080} duration={780}>
          under control.
        </MarkerCircle>
      </h1>

      <p className="backers">
        Backed by{" "}
        {BACKERS.map((b, i) => (
          <span key={b.name}>
            <span className="backer">
              <span className="backer-mark" aria-hidden="true">
                <svg viewBox={b.viewBox}>
                  <path d={b.d} fill="currentColor" />
                </svg>
              </span>
              <span className="backer-name">{b.name}</span>
            </span>
            {i < BACKERS.length - 2
              ? ", "
              : i === BACKERS.length - 2
                ? ", and "
                : "."}
          </span>
        ))}
      </p>
    </section>
  );
}
