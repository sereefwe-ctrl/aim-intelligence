"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AimLogo } from "@/components/aim-logo";

/** Pause before the first expand, so the page opens on "✛ AIM". */
const INTRO_DELAY_MS = 700;

/**
 * Sticky header with the motion logo: full at the top of the page, "✛ AIM"
 * once you scroll down, full again back at the top. Phones keep "✛ AIM".
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 639px)");
    let ready = false;
    const sync = () => {
      if (ready) setOpen(window.scrollY <= 4 && !phone.matches);
    };
    const intro = window.setTimeout(() => {
      ready = true;
      sync();
    }, INTRO_DELAY_MS);

    window.addEventListener("scroll", sync, { passive: true });
    phone.addEventListener("change", sync);
    return () => {
      window.clearTimeout(intro);
      window.removeEventListener("scroll", sync);
      phone.removeEventListener("change", sync);
    };
  }, []);

  return (
    <header className="site-header">
      <Link
        href="/"
        aria-label="AIM Intelligence, home"
        className="site-header-logo"
      >
        <AimLogo open={open} />
      </Link>
    </header>
  );
}
