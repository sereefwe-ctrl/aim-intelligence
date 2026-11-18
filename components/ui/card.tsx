import { cn } from "@/lib/cn";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface/70 p-6 transition hover:border-accent/40 hover:shadow-[0_0_40px_-12px] hover:shadow-accent/40",
        className,
      )}
      {...props}
    />
  );
}
