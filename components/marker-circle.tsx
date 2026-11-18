"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * A hand-drawn marker loop around a word or phrase.
 *
 * The loop is a rubber band around the phrase's actual glyphs (measured with
 * the same font on a canvas): it rises over tall letters and dips over short
 * ones, keeping an even distance from the ink at every size. It is drawn as a
 * tapered pen stroke, thin where the pen lands and lifts, spiralling slightly
 * outward so the end overshoots the start, and it draws itself in once, after
 * `delay` ms. The line holding it gets just enough extra space for the loop to
 * clear the lines above and below.
 */

const COLOR = "#22b07d";

type Pt = [number, number];
type Box = { x0: number; x1: number; y0: number; y1: number };
/** Glyph ink boxes and the baseline, px, relative to the wrapper. */
type Ink = { baseline: number; glyphs: Box[] };

type Geometry = {
  left: number; // svg position relative to the wrapper
  top: number;
  w: number;
  h: number;
  fill: string; // tapered outline of the stroke
  center: string; // centre line, used to reveal it
  length: number;
  pen: number; // widest stroke width, px
  up: number; // reach above the baseline, px
  down: number; // reach below the baseline, px
};

/** Small deterministic random, so each loop has its own fixed wobble. */
function random(seed: number) {
  let s = seed % 2147483647;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Evenly spaced points along a closed polygon. */
function resample(poly: Pt[], n: number): Pt[] {
  const seg = poly.map((a, i) => {
    const b = poly[(i + 1) % poly.length];
    return Math.hypot(b[0] - a[0], b[1] - a[1]);
  });
  const total = seg.reduce((s, v) => s + v, 0);
  const out: Pt[] = [];
  let i = 0;
  let acc = 0;
  for (let k = 0; k < n; k++) {
    const d = (k / n) * total;
    while (acc + seg[i] < d) acc += seg[i++];
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const f = seg[i] ? (d - acc) / seg[i] : 0;
    out.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]);
  }
  return out;
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function buildLoop(ink: Ink, em: number, seed: number): Geometry {
  const rand = random(seed);
  const pen = Math.max(2, em * 0.05);

  // Shape: one smooth, slightly full oval (a superellipse just past an
  // ellipse) centred on the glyphs, with room at the ends the way a pen
  // swings around a word. It sits beneath the text, so if it passes the very
  // tip of a tall letter, the letter simply overlaps the line.
  const x0 = Math.min(...ink.glyphs.map((g) => g.x0));
  const x1 = Math.max(...ink.glyphs.map((g) => g.x1));
  const y0 = Math.min(...ink.glyphs.map((g) => g.y0));
  const y1 = Math.max(...ink.glyphs.map((g) => g.y1));
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2 + em * 0.02;
  const rx = (x1 - x0) / 2 + em * 0.3;
  const ry = (y1 - y0) / 2 + em * 0.11;
  const e = 2 / 2.25;
  const dense: Pt[] = [];
  for (let i = 0; i < 900; i++) {
    const a = (i / 900) * Math.PI * 2;
    const c = Math.cos(a);
    const sn = Math.sin(a);
    dense.push([
      cx + rx * Math.sign(c) * Math.pow(Math.abs(c), e),
      cy + ry * Math.sign(sn) * Math.pow(Math.abs(sn), e),
    ]);
  }
  const N = 320;
  // a hair of tilt, so it reads as drawn rather than placed
  const tilt = (rand() - 0.5) * 2 * Math.min(0.02, (em * 0.025) / rx);
  const curve = resample(dense, N).map(([x, y]) => {
    const dx = x - cx;
    const dy = y - cy;
    return [
      cx + dx * Math.cos(tilt) - dy * Math.sin(tilt),
      cy + dx * Math.sin(tilt) + dy * Math.cos(tilt),
    ] as Pt;
  });

  // Outward normals along the curve.
  const normal = curve.map((p, i) => {
    const a = curve[(i - 1 + N) % N];
    const b = curve[(i + 1) % N];
    let nx = b[1] - a[1];
    let ny = -(b[0] - a[0]);
    const l = Math.hypot(nx, ny) || 1;
    nx /= l;
    ny /= l;
    if (nx * (p[0] - cx) + ny * (p[1] - cy) < 0) {
      nx = -nx;
      ny = -ny;
    }
    return [nx, ny] as Pt;
  });

  // Pen path: lands at the lower left, goes once around, and runs a short way
  // past where it began, finishing just outside its own start.
  const startAngle = Math.PI * (0.66 + rand() * 0.06); // along the lower left
  let start = 0;
  let bestDot = -Infinity;
  curve.forEach((p, i) => {
    const dot =
      ((p[0] - cx) / rx) * Math.cos(startAngle) +
      ((p[1] - cy) / ry) * Math.sin(startAngle);
    if (dot > bestDot) {
      bestDot = dot;
      start = i;
    }
  });
  const perimeter = curve.reduce((s, p, i) => {
    const q = curve[(i + 1) % N];
    return s + Math.hypot(q[0] - p[0], q[1] - p[1]);
  }, 0);
  const over = Math.min(0.2, (em * (0.75 + rand() * 0.3)) / perimeter); // revolutions
  const phase = rand() * Math.PI * 2;
  const steps = Math.round(N * (1 + over));
  const pts: Pt[] = [];
  for (let s = 0; s <= steps; s++) {
    const t = s / N; // revolutions
    const i = (start + s) % N;
    // lands a touch inside, finishes a touch outside, with a gentle wobble
    const off =
      em *
      (-0.035 * (1 - smoothstep(0, 0.18, t)) +
        0.06 * smoothstep(0.82, 1 + over, t) +
        0.014 * Math.sin(Math.PI * 2 * 2.3 * t + phase));
    pts.push([
      curve[i][0] + normal[i][0] * off,
      curve[i][1] + normal[i][1] * off,
    ]);
  }

  // Place the svg around the stroke, in wrapper coordinates.
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const left0 = Math.min(...xs) - pen;
  const top0 = Math.min(...ys) - pen;
  const fmt = (x: number, y: number) =>
    `${(x - left0).toFixed(2)} ${(y - top0).toFixed(2)}`;

  // Tapered outline from the centre line.
  const M = pts.length - 1;
  const left: string[] = [];
  const right: string[] = [];
  let length = 0;
  for (let i = 0; i <= M; i++) {
    const [px, py] = pts[Math.max(0, i - 1)];
    const [nx, ny] = pts[Math.min(M, i + 1)];
    const dx = nx - px;
    const dy = ny - py;
    const d = Math.hypot(dx, dy) || 1;
    const t = i / M;
    const half =
      (pen * (0.3 + 0.7 * Math.pow(Math.sin(Math.PI * t), 0.55))) / 2;
    const [x, y] = pts[i];
    left.push(fmt(x - (dy / d) * half, y + (dx / d) * half));
    right.push(fmt(x + (dy / d) * half, y - (dx / d) * half));
    if (i > 0) length += Math.hypot(x - pts[i - 1][0], y - pts[i - 1][1]);
  }

  const fill = `M${left.join("L")}L${right.reverse().join("L")}Z`;
  const center = `M${pts.map(([x, y]) => fmt(x, y)).join("L")}`;

  return {
    left: left0,
    top: top0,
    w: Math.max(...xs) + pen - left0,
    h: Math.max(...ys) + pen - top0,
    fill,
    center,
    length,
    pen,
    up: ink.baseline - Math.min(...ys) + pen / 2,
    down: Math.max(...ys) - ink.baseline + pen / 2,
  };
}

/** Each glyph's ink box, from the font itself, placed where it was laid out. */
function measureInk(
  wrap: HTMLElement,
  text: HTMLElement,
  probe: HTMLElement,
  canvas: HTMLCanvasElement,
): Ink {
  // The element that actually sets the glyphs (e.g. an <em> in another face).
  const glyphs = (text.firstElementChild as HTMLElement | null) ?? text;
  const w = wrap.getBoundingClientRect();
  const t = glyphs.getBoundingClientRect();
  // An empty inline-block sits on the baseline: its bottom edge is the baseline.
  const baseline = probe.getBoundingClientRect().bottom - w.top;
  const cs = getComputedStyle(glyphs);
  const x = t.left - w.left;
  const size = parseFloat(cs.fontSize);
  const content = glyphs.textContent ?? "";
  const boxes: Box[] = [];
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const all = ctx.measureText(content);
    // map canvas advances onto the laid-out width (letter-spacing etc.)
    const scale = all.width > 0 ? t.width / all.width : 1;
    for (let i = 0; i < content.length; i++) {
      const ch = content[i];
      if (!ch.trim()) continue;
      const at = ctx.measureText(content.slice(0, i)).width * scale;
      const m = ctx.measureText(ch);
      boxes.push({
        x0: x + at - m.actualBoundingBoxLeft,
        x1: x + at + m.actualBoundingBoxRight,
        y0: baseline - m.actualBoundingBoxAscent,
        y1: baseline + m.actualBoundingBoxDescent,
      });
    }
  }
  if (!boxes.length) {
    boxes.push({
      x0: x,
      x1: x + t.width,
      y0: baseline - size * 0.72,
      y1: baseline,
    });
  }
  return { baseline, glyphs: boxes };
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
  const textRef = useRef<HTMLSpanElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const reveal = useRef<SVGPathElement>(null);
  const played = useRef(false);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [room, setRoom] = useState({ top: 0, bottom: 0 });
  const maskId = useId().replace(/:/g, "");

  useEffect(() => {
    const el = ref.current;
    const text = textRef.current;
    const probe = probeRef.current;
    if (!el || !text || !probe) return;
    const canvas = document.createElement("canvas");
    const measure = () => {
      const block = el.parentElement ?? el;
      const bs = getComputedStyle(block);
      const em = parseFloat(bs.fontSize) || 16;
      const pitch = parseFloat(bs.lineHeight) || em * 1.2;
      // How deep the surrounding text's descenders go and how tall its
      // ascenders stand, measured from the headline's own font.
      let desc = em * 0.24;
      let asc = em * 0.74;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.font = `${bs.fontStyle} ${bs.fontWeight} ${bs.fontSize} ${bs.fontFamily}`;
        desc = ctx.measureText("gjpqy").actualBoundingBoxDescent;
        asc = ctx.measureText("bdfhklAIMST").actualBoundingBoxAscent;
      }
      const next = buildLoop(measureInk(el, text, probe, canvas), em, seed);
      setGeo(next);
      // Extra space for this line only, so the loop clears the descenders of
      // the line above and the ascenders of the line below.
      const gap = Math.max(2, em * 0.045);
      setRoom({
        top: Math.max(0, Math.ceil(next.up + gap - (pitch - desc))),
        bottom: Math.max(0, Math.ceil(next.down + gap - (pitch - asc))),
      });
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
    <span
      ref={ref}
      className="marker-circle"
      style={{ marginTop: room.top, marginBottom: room.bottom }}
    >
      <span ref={textRef} className="marker-circle-text">
        {children}
      </span>
      <span
        ref={probeRef}
        className="marker-circle-baseline"
        aria-hidden="true"
      />
      {geo && (
        <svg
          className="marker-circle-svg"
          width={geo.w}
          height={geo.h}
          viewBox={`0 0 ${geo.w} ${geo.h}`}
          style={{ left: geo.left, top: geo.top }}
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
