import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Hero() {
  const {
    eyebrow,
    titleStart,
    titleHighlight,
    body,
    primaryCta,
    secondaryCta,
  } = site.hero;
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-36">
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] max-w-none -translate-x-1/2 rounded-full bg-accent-2/25 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute top-20 left-[60%] -z-10 h-[320px] w-[420px] rounded-full bg-accent/20 blur-[110px]"
        aria-hidden
      />
      <Container className="text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs tracking-widest text-accent uppercase">
          <span
            className="size-1.5 animate-pulse rounded-full bg-accent"
            aria-hidden
          />
          {eyebrow}
        </p>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {titleStart} <span className="text-gradient">{titleHighlight}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
          {body}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={primaryCta.href} size="lg">
            {primaryCta.label}
          </Button>
          <Button href={secondaryCta.href} size="lg" variant="secondary">
            {secondaryCta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
