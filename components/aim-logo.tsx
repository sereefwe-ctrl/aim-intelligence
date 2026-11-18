import { AIM_LOGO } from "@/lib/aim-logo";

/**
 * The AIM INTELLIGENCE logo. Collapsed it reads "✛ AIM"; open, each letter of
 * INTELLIGENCE slides out from behind the M (fading in over the second half)
 * while the cross turns 180° clockwise. The motion lives in globals.css
 * (.aim-logo rules); this component only renders the paths.
 */
export function AimLogo({
  open,
  className,
}: {
  open: boolean;
  className?: string;
}) {
  return (
    <span
      className={["aim-logo", open ? "is-open" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      <svg viewBox={AIM_LOGO.viewBox} role="img" aria-label="AIM Intelligence">
        <path
          className="aim-logo-cross"
          d={AIM_LOGO.cross}
          fill="currentColor"
        />
        <g className="aim-logo-word">
          {AIM_LOGO.word.map((l) => (
            <path
              key={l.d}
              d={l.d}
              fill="currentColor"
              style={{ "--dx": `${l.dx}px` } as React.CSSProperties}
            />
          ))}
        </g>
        {/* AIM last, so INTELLIGENCE passes behind it */}
        <path d={AIM_LOGO.aim} fill="currentColor" />
      </svg>
    </span>
  );
}
