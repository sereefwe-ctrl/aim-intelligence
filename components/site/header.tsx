import Link from "next/link";
import { LogoMark } from "@/components/ui/logo-mark";
import { site } from "@/lib/site";

/** Full-width nav: links spread across the page with the mark in the centre. */
export function Header() {
  const [a, b, c, d] = site.nav;
  const link =
    "font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-foreground";
  return (
    <header className="relative z-10 px-4 pt-5 sm:px-6">
      <nav className="hidden grid-cols-5 items-center sm:grid">
        <Link href={a.href} className={link}>
          {a.label}
        </Link>
        <Link href={b.href} className={`${link} justify-self-center`}>
          {b.label}
        </Link>
        <Link
          href="/"
          className="justify-self-center text-foreground"
          aria-label={site.name}
        >
          <LogoMark className="size-7" />
        </Link>
        <Link href={c.href} className={`${link} justify-self-center`}>
          {c.label}
        </Link>
        <Link href={d.href} className={`${link} justify-self-end`}>
          {d.label}
        </Link>
      </nav>
      <nav className="flex items-center justify-between sm:hidden">
        <Link href="/" className="text-foreground" aria-label={site.name}>
          <LogoMark className="size-7" />
        </Link>
        <Link href={d.href} className={link}>
          {d.label} +
        </Link>
      </nav>
    </header>
  );
}
