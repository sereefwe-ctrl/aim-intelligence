"use client";

import { useEffect, useState } from "react";
import { AimLogo } from "@/components/aim-logo";
import { finishIntro } from "@/lib/intro";

/** Beat on "✛ AIM" before the logo unfurls. */
const START_MS = 300;
/** The unfurl: the last letter's delay plus its glide, and the cross's turn. */
const MOTION_MS = 1400;
/** Beat on the full logo before the screen lifts. */
const HOLD_MS = 350;
/** Never hold the screen longer than this while the page finishes loading. */
const MAX_WAIT_MS = 4200;
/** The fade out (keep in step with .intro-loader transition). */
const LEAVE_MS = 650;

type Phase = "idle" | "open" | "leaving" | "done";

/**
 * Loading screen: the motion logo on black film grain. "✛ AIM" sits centred,
 * unfurls into AIM INTELLIGENCE (settling centred), and once the motion has
 * ended and the page has loaded, the screen fades away. Shown on full page
 * loads only (it lives in the root layout); skipped for reduced motion.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const root = document.documentElement;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) =>
      timers.push(window.setTimeout(fn, ms));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishIntro();
      later(() => setPhase("done"), 0);
      return () => timers.forEach(clearTimeout);
    }

    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const cap = new Promise<void>((resolve) => later(resolve, MAX_WAIT_MS));
    const motion = new Promise<void>((resolve) =>
      later(resolve, START_MS + MOTION_MS + HOLD_MS),
    );

    let cancelled = false;
    later(() => setPhase("open"), START_MS);
    Promise.all([motion, Promise.race([loaded, cap])]).then(() => {
      if (cancelled) return;
      root.style.overflow = prevOverflow;
      setPhase("leaving");
      finishIntro();
      later(() => setPhase("done"), LEAVE_MS);
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      root.style.overflow = prevOverflow;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="intro-loader" data-phase={phase} aria-hidden="true">
      <div className="intro-loader-logo">
        <AimLogo open={phase !== "idle"} />
      </div>
    </div>
  );
}
