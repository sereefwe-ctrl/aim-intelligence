import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Hero() {
  const { eyebrow, title, body, primaryCta, secondaryCta } = site.hero;
  return (
    <section className="py-20 sm:py-32">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-medium tracking-wide text-accent uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} size="lg" variant="secondary">
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
