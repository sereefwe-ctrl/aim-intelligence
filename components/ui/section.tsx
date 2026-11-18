import { cn } from "@/lib/cn";
import { Container } from "./container";

type SectionProps = React.ComponentProps<"section"> & {
  title?: string;
  intro?: string;
};

export function Section({
  title,
  intro,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("scroll-mt-20 py-16 sm:py-24", className)}
      {...props}
    >
      <Container>
        {(title || intro) && (
          <div className="mb-10 max-w-2xl">
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
