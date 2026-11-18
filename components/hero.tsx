import { MarkerCircle } from "@/components/marker-circle";

/**
 * Headline: white for the name and the key phrases, muted for the words that
 * connect them, with "safe" and "under control." circled in marker. The
 * circles draw in after the header logo's intro (0.7s wait + 0.63s motion).
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
    </section>
  );
}
