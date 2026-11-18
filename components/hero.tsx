/**
 * Headline, set like Pantheon's: DM Sans, white for the name and the key
 * phrases, muted for the words that connect them. "safe" and "under control."
 * get a hand-drawn marker loop around them.
 */

// Two slightly different loose loops, so the marks look drawn by hand. Each
// overshoots its start, like a pen circling a word. Drawn in a 200x100 box
// that stretches to the word.
const LOOPS = [
  "M18 70 C6 44 26 14 88 9 C150 4 196 22 194 52 C192 82 140 95 86 93 C34 91 6 76 10 50 C13 30 40 17 72 12",
  "M14 66 C4 40 34 12 100 8 C166 4 198 26 195 54 C192 84 136 96 80 92 C30 89 3 72 9 46 C14 28 44 15 82 11",
];

function Circled({
  children,
  loop = 0,
  delay,
}: {
  children: React.ReactNode;
  loop?: number;
  delay: string;
}) {
  return (
    <span className="hero-circled">
      {children}
      <svg
        className="hero-loop"
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={LOOPS[loop]}
          pathLength={1}
          style={{ animationDelay: delay }}
        />
      </svg>
    </span>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero-title">
        AIM Intelligence{" "}
        <span className="hero-muted">
          is an applied research lab dedicated to building
        </span>{" "}
        security infrastructure <span className="hero-muted">to keep</span>{" "}
        Artificial Superintelligence <Circled delay="1.5s">safe</Circled> and{" "}
        <Circled loop={1} delay="1.95s">
          under control.
        </Circled>
      </h1>
    </section>
  );
}
