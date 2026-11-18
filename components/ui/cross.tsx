import { cn } from "@/lib/cn";

/** Small "+" registration mark used as a decorative grid point. */
export function Cross({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute font-mono text-xs leading-none text-faint",
        className,
      )}
    >
      +
    </span>
  );
}
