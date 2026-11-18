import { cn } from "@/lib/cn";

/** Section label, e.g. "(01) Research". */
export function Label({
  index,
  children,
  className,
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-xs tracking-widest text-muted uppercase",
        className,
      )}
    >
      <span className="text-faint">({String(index).padStart(2, "0")})</span>{" "}
      {children}
    </p>
  );
}
