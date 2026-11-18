/** AIM reticle mark: a ring with crosshair ticks and a centre dot. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      className={className}
      aria-hidden
    >
      <circle cx="16" cy="16" r="11" />
      <circle cx="16" cy="16" r="5.5" strokeDasharray="1.5 2" />
      <path d="M16 1v7M16 24v7M1 16h7M24 16h7" />
      <circle cx="16" cy="16" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
