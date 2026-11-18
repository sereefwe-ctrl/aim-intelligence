"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AimLogo } from "@/components/aim-logo";

/** Pause before the first expand, so the page opens on "✛ AIM". */
const INTRO_DELAY_MS = 400;

/**
 * Top navigation. News is its own page; the rest point at home-page anchors
 * until their pages exist.
 */
const NAV = [
  { label: "About", href: "/#about" },
  { label: "Research", href: "/#research" },
  { label: "Products", href: "/#products" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Careers", href: "/#careers" },
  { label: "News", href: "/news" },
];

/**
 * Sticky header with the motion logo: full at the top of the page, "✛ AIM"
 * once you scroll down, full again back at the top. Phones keep "✛ AIM".
 * Navigation spreads across the right; below 820px it folds into a Menu button.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 639px)");
    // below this width the links fold into the Menu button
    const compact = window.matchMedia("(max-width: 819px)");
    let ready = false;
    const sync = () => {
      // the glass veil only matters once content can pass beneath it
      setScrolled(window.scrollY > 4);
      if (ready) setOpen(window.scrollY <= 4 && !phone.matches);
    };
    const intro = window.setTimeout(() => {
      ready = true;
      sync();
    }, INTRO_DELAY_MS);

    const closeMenu = () => {
      if (!compact.matches) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("scroll", sync, { passive: true });
    phone.addEventListener("change", sync);
    compact.addEventListener("change", closeMenu);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(intro);
      window.removeEventListener("scroll", sync);
      phone.removeEventListener("change", sync);
      compact.removeEventListener("change", closeMenu);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled || undefined}>
      <Link
        href="/"
        aria-label="AIM Intelligence, home"
        className="site-header-logo"
      >
        <AimLogo open={open} />
      </Link>

      <nav
        id="site-nav"
        className="site-nav"
        data-open={menuOpen || undefined}
        aria-label="Main"
      >
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="site-header-tools">
        <button
          type="button"
          className="site-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
