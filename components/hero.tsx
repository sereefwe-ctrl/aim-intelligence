/**
 * Headline, set like Pantheon's: DM Sans, white for the name and the key
 * phrases, muted for the words that connect them.
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
        artificial superintelligence safe and under control.
      </h1>
    </section>
  );
}
