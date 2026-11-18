import { Stats } from "@/components/stats";
import { CLIENTS } from "@/lib/clients";

/**
 * Proof section under the headline: the numbers, then the client wall. Logos
 * are drawn in the theme ink (one colour for all, so fifteen brands read as
 * one calm wall) and sized by aspect ratio so wide wordmarks and square marks
 * carry the same visual weight.
 */
export function Proof() {
  return (
    <section className="proof" aria-labelledby="proof-title">
      <div className="proof-head">
        <h2 id="proof-title" className="proof-eyebrow">
          In production
        </h2>
      </div>

      <Stats />

      <div className="proof-head">
        <h3 className="proof-eyebrow">Trusted by</h3>
      </div>

      <ul className="clients">
        {CLIENTS.map((c, i) => {
          const ratio = c.w / c.h;
          return (
            <li
              key={c.name}
              className="client"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span
                role="img"
                aria-label={c.name}
                title={c.name}
                className="client-logo"
                style={
                  {
                    "--logo": `url(${c.file})`,
                    "--ratio": ratio,
                    "--grow": Math.pow(ratio, 0.55).toFixed(3),
                  } as React.CSSProperties
                }
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
