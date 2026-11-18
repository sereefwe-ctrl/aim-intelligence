"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * A hand-drawn marker loop around a word. The loop is built at the word's
 * real size (no stretching), as a tapered pen stroke: thin where the pen
 * lands and lifts, fuller in the middle, spiralling slightly outward so the
 * end overshoots the start. It draws itself in once, after `delay` ms.
 */

const COLOR = "#22b07d";

type Geometry = {
  box: number; // padding around the word, px
  w: number;
  h: number;
  fill: string; // tapered outline of the stroke
  center: string; // centre line, used to reveal it
  length: number;
  pen: number; // widest stroke width, px
};

/** Small deterministic random, so each loop has its own fixed wobble. */
function random(seed: number) {
  let s = seed % 2147483647;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function buildLoop(
  width: number,
  height: number,
  em: number,
  seed: number,
): Geometry {
  const rand = random(seed);
  const pen = Math.max(2, em * 0.055);
  const padX = em * 0.32;
  const padY = em * 0.15;
  const box = Math.max(padX, padY) + pen * 2;
  const cx = box + width / 2;
  const cy = box + height / 2;
  const rx = width / 2 + padX;
  const ry = height / 2 + padY;
  const tilt = ((rand() - 0.5) * 5 * Math.PI) / 180;
  const phase = rand() * Math.PI * 2;
  const start = Math.PI * (0.8 + rand() * 0.12); // lower left, where a pen would begin
  const sweep = Math.PI * 2 + 0.5 + rand() * 0.25; // a little past a full turn

  const N = 160;
  const pts: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const a = start + sweep * t;
    // gentle wobble, and a slow outward spiral so the end clears the start
    const r = 1 + 0.03 * Math.sin(2 * a + phase) + (t - 0.55) * 0.08;
    const x = rx * r * Math.cos(a);
    const y = ry * r * Math.sin(a);
    pts.push([
      cx + x * Math.cos(tilt) - y * Math.sin(tilt),
      cy + x * Math.sin(tilt) + y * Math.cos(tilt),
    ]);
  }

  // Tapered outline from the centre line.
  const left: string[] = [];
  const right: string[] = [];
  let length = 0;
  for (let i = 0; i <= N; i++) {
    const [px, py] = pts[Math.max(0, i - 1)];
    const [nx, ny] = pts[Math.min(N, i + 1)];
    const dx = nx - px;
    const dy = ny - py;
    const d = Math.hypot(dx, dy) || 1;
    const t = i / N;
    const half =
      (pen * (0.3 + 0.7 * Math.pow(Math.sin(Math.PI * t), 0.55))) / 2;
    const [x, y] = pts[i];
    left.push(
      `${(x - (dy / d) * half).toFixed(2)} ${(y + (dx / d) * half).toFixed(2)}`,
    );
    right.push(
      `${(x + (dy / d) * half).toFixed(2)} ${(y - (dx / d) * half).toFixed(2)}`,
    );
    if (i > 0) length += Math.hypot(x - pts[i - 1][0], y - pts[i - 1][1]);
  }
  const fill = `M${left.join("L")}L${right.reverse().join("L")}Z`;
  const center = `M${pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join("L")}`;

  return {
    box,
    w: width + box * 2,
    h: height + box * 2,
    fill,
    center,
    length,
    pen,
  };
}

export function MarkerCircle({
  children,
  seed,
  delay,
  duration,
}: {
  children: React.ReactNode;
  seed: number;
  delay: number;
  duration: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reveal = useRef<SVGPathElement>(null);
  const played = useRef(false);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const maskId = useId().replace(/:/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const em = parseFloat(getComputedStyle(el).fontSize) || 16;
      setGeo(buildLoop(el.offsetWidth, el.offsetHeight, em, seed));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [seed]);

  useEffect(() => {
    const path = reveal.current;
    if (!geo || !path || played.current) return;
    played.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      return;
    }
    path.animate([{ strokeDashoffset: geo.length }, { strokeDashoffset: 0 }], {
      duration,
      delay,
      // a pen: quick to get going, long easy finish
      easing: "cubic-bezier(0.42, 0.08, 0.22, 1)",
      fill: "forwards",
    });
  }, [geo, delay, duration]);

  return (
    <span ref={ref} className="marker-circle">
      {children}
      {geo && (
        <svg
          className="marker-circle-svg"
          width={geo.w}
          height={geo.h}
          viewBox={`0 0 ${geo.w} ${geo.h}`}
          style={{ left: -geo.box, top: -geo.box }}
          aria-hidden="true"
        >
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={geo.w}
            height={geo.h}
          >
            <path
              ref={reveal}
              d={geo.center}
              fill="none"
              stroke="#fff"
              strokeWidth={geo.pen * 1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={geo.length + 1}
              strokeDashoffset={geo.length + 1}
            />
          </mask>
          <path d={geo.fill} fill={COLOR} mask={`url(#${maskId})`} />
        </svg>
      )}
    </span>
  );
}
