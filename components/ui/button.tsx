import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-foreground text-background hover:bg-accent",
  secondary: "border border-line text-foreground hover:border-foreground",
} as const;

type ButtonProps = {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-11 items-center gap-2 px-5 font-mono text-xs tracking-widest uppercase transition-colors focus-visible:ring-1 focus-visible:ring-foreground focus-visible:outline-none",
        variants[variant],
        className,
      )}
    >
      {children}
      <span aria-hidden>↗</span>
    </Link>
  );
}
