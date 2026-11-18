/** A staircase matrix of "+" marks, like a data table seen from afar. */
const COLS = 7;
const ROWS = 14;
const STEP = 28;

const cells: { x: number; y: number; ch: string }[] = [];
for (let r = 0; r < ROWS; r++) {
  // Rows near the top are wide; the shape narrows to a two-column tail.
  const filled =
    r < 6
      ? Math.min(COLS, 2 + Math.ceil((6 - r) * 0.9)) + (r === 0 ? 1 : 0)
      : 2;
  for (let c = COLS - Math.min(filled, COLS); c < COLS; c++) {
    cells.push({ x: c, y: r, ch: (r * 7 + c * 3) % 11 === 0 ? "–" : "+" });
  }
}

export function PlusGrid({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${COLS * STEP} ${ROWS * STEP}`}
      className={className}
      aria-hidden
    >
      {cells.map(({ x, y, ch }) => (
        <text
          key={`${x}-${y}`}
          x={x * STEP + STEP / 2}
          y={y * STEP + STEP / 2}
          fontSize="14"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--faint)"
          className="font-mono"
        >
          {ch}
        </text>
      ))}
    </svg>
  );
}
