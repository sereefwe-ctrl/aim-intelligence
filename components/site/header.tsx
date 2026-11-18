import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-tight">
          {site.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted sm:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href={site.contact.cta.href} size="sm">
          {site.contact.cta.label}
        </Button>
      </Container>
    </header>
  );
}
