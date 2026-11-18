import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-background/70 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span
            className="size-2.5 rounded-full bg-accent shadow-[0_0_12px] shadow-accent"
            aria-hidden
          />
          {site.name}
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href={site.hero.primaryCta.href} size="sm" variant="secondary">
          Research
        </Button>
      </Container>
    </header>
  );
}
