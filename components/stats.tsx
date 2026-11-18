"use client";

import { useEffect, useRef } from "react";

type Stat = {
  value: number;
  unit?: string; // e.g. "M", shown straight after the number
  label: string;
};

const STATS: Stat[] = [
  { value: 160, label: "models evaluated" },
  { value: 30, label: "enterprise customers" },
  {
    value: 12,
    unit: "M",
    label: "end users covered by guardrails live or in deployment",
  },
  { value: 100000, label: "live agents protected" },
];

const COUNT_MS = 1800;
const STAGGER_MS = 140;

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
// expo-out: fast start, long soft landing (matches the logo's settle)
const ease = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Four headline numbers. When the row scrolls into view each counts up from
 * zero (staggered) while its rule draws in; hovering a stat brightens it and
 * turns its rule marker green. The final numbers are in the markup, so the
 * row reads correctly without JavaScript and never shifts as digits change.
 */
export function Stats() {
  const ref = useRef<HTMLDListElement>(null);
  // The counting digits are written straight to the DOM: no re-render per frame.
  const digits = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.shown = "";
      return;
    }
    const write = (p: number[]) =>
      STATS.forEach((s, i) => {
        const node = digits.current[i];
        if (node) node.textContent = `${fmt(s.value * p[i])}${s.unit ?? ""}`;
      });
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = STATS.map((_, i) =>
        ease(Math.max(0, now - start - i * STAGGER_MS) / COUNT_MS),
      );
      write(p);
      if (p[p.length - 1] < 1) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        el.dataset.shown = "";
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    // Hold at zero until seen (the row starts below the fold).
    write(STATS.map(() => 0));
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      write(STATS.map(() => 1));
    };
  }, []);

  return (
    <dl ref={ref} className="stats">
      {STATS.map((s, i) => {
        const final = `${fmt(s.value)}${s.unit ?? ""}`;
        return (
          <div
            key={s.label}
            className="stat"
            style={{ "--i": i } as React.CSSProperties}
          >
            <dt className="stat-label">{s.label}</dt>
            <dd className="stat-value">
              {/* invisible final value reserves the width; the live one sits on top */}
              <span className="stat-sizer" aria-hidden="true">
                {final}+
              </span>
              <span className="stat-live" aria-hidden="true">
                <span
                  ref={(node) => {
                    digits.current[i] = node;
                  }}
                >
                  {final}
                </span>
                <span className="stat-plus">+</span>
              </span>
              <span className="sr-only">{final}+</span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
