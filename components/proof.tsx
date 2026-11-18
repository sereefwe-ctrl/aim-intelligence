import { Stats } from "@/components/stats";

/** Proof section under the headline: the numbers. */
export function Proof() {
  return (
    <section className="proof" aria-labelledby="proof-title">
      <div className="proof-head">
        <h2 id="proof-title" className="proof-eyebrow">
          In production
        </h2>
      </div>

      <Stats />
    </section>
  );
}
