/**
 * Decorative wireframe radar chart: the visual signature of the hero.
 * Values are illustrative only.
 */
const C = 300;
const R = 210;
const values = [0.86, 0.62, 0.93, 0.55, 0.78, 0.68];
const echo = [0.52, 0.8, 0.6, 0.74, 0.45, 0.88];

function point(i: number, r: number) {
  const a = (Math.PI * 2 * i) / values.length - Math.PI / 2;
  return [C + Math.cos(a) * r, C + Math.sin(a) * r] as const;
}

const poly = (vals: readonly number[]) =>
  vals
    .map((v, i) =>
      point(i, v * R)
        .map((n) => n.toFixed(1))
        .join(","),
    )
    .join(" ");

export function Radar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" fill="none" className={className} aria-hidden>
      <g
        className="animate-spin-slow"
        style={{ transformOrigin: "300px 300px" }}
      >
        <ellipse
          cx={C}
          cy={C}
          rx={R + 30}
          ry={R + 30}
          stroke="var(--faint)"
          strokeDasharray="2 6"
        />
        <ellipse
          cx={C}
          cy={C}
          rx={R + 30}
          ry={R - 60}
          stroke="var(--faint)"
          strokeDasharray="2 6"
          transform="rotate(-28 300 300)"
        />
        <ellipse
          cx={C}
          cy={C}
          rx={R - 40}
          ry={R + 10}
          stroke="var(--line)"
          strokeDasharray="1 5"
          transform="rotate(40 300 300)"
        />
      </g>

      {values.map((v, i) => {
        const [x, y] = point(i, R + 20);
        const [lx, ly] = point(i, R + 48);
        return (
          <g key={i}>
            <line x1={C} y1={C} x2={x} y2={y} stroke="var(--line)" />
            <text
              x={lx}
              y={ly}
              fill="var(--muted)"
              fontSize="13"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-mono"
            >
              {Math.round(v * 100)}
            </text>
          </g>
        );
      })}

      {[0.33, 0.66].map((k) => (
        <polygon
          key={k}
          points={poly(values.map(() => k))}
          stroke="var(--line)"
          strokeDasharray="3 5"
        />
      ))}

      <polygon
        points={poly(echo)}
        stroke="var(--muted)"
        strokeOpacity={0.5}
        strokeDasharray="4 4"
      />
      <polygon
        points={poly(values)}
        stroke="var(--foreground)"
        strokeOpacity={0.85}
        strokeWidth={1.25}
        fill="var(--foreground)"
        fillOpacity={0.03}
        pathLength={1}
        className="animate-draw"
      />

      {values.map((v, i) => {
        const [x, y] = point(i, v * R);
        return (
          <rect
            key={i}
            x={x - 3}
            y={y - 3}
            width={6}
            height={6}
            fill="var(--background)"
            stroke="var(--foreground)"
          />
        );
      })}
      <circle cx={C} cy={C} r={3} fill="var(--accent)" />
    </svg>
  );
}
