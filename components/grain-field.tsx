"use client";

import { useEffect, useRef } from "react";

/** Grain: noise tiles redrawn at random offsets so it flickers like film. */
const GRAIN_TILE = 160; // CSS px
const GRAIN_TILES = 6;
const GRAIN_FPS = 14;

/** Trail: squares snapped to a pixel grid that fall off the pointer. */
const GRID = 10;
const MAX_SQUARES = 300;
const TRAIL_COLORS = [
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#e9e5dc",
  "#f2a97e",
  "#a9b8d6",
];
const CURSOR_SIZE = 18;

type Square = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  age: number;
  color: string;
};

const snap = (v: number) => Math.round(v / GRID) * GRID;
const pick = <T,>(list: readonly T[]) =>
  list[(Math.random() * list.length) | 0];

/** Gaussian-ish grayscale noise (mean 128, sd ~52), one value per device pixel. */
function makeNoiseTile(size: number) {
  const tile = document.createElement("canvas");
  tile.width = tile.height = size;
  const tctx = tile.getContext("2d")!;
  const img = tctx.createImageData(size, size);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    // Sum of three uniforms approximates a normal distribution cheaply.
    const n =
      (Math.random() + Math.random() + Math.random() - 1.5) * 2 * 52 + 128;
    const v = n < 0 ? 0 : n > 255 ? 255 : n | 0;
    d[i] = d[i + 1] = d[i + 2] = v;
    d[i + 3] = 255;
  }
  tctx.putImageData(img, 0, 0);
  return tile;
}

export function GrainField() {
  const glowRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current!;
    const grain = grainRef.current!;
    const trail = trailRef.current!;
    const cursor = cursorRef.current!;
    const gctx = grain.getContext("2d");
    const tctx = trail.getContext("2d");
    if (!gctx || !tctx) return;

    const root = document.documentElement;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    root.dataset.grain = "live";
    if (finePointer) root.dataset.cursor = "custom";

    let dpr = 1;
    let patterns: CanvasPattern[] = [];
    let tilePx = GRAIN_TILE;

    const drawGrain = () => {
      if (!patterns.length) return;
      const ox = (Math.random() * tilePx) | 0;
      const oy = (Math.random() * tilePx) | 0;
      gctx.setTransform(1, 0, 0, 1, -ox, -oy);
      gctx.fillStyle = pick(patterns);
      gctx.fillRect(ox, oy, grain.width, grain.height);
    };

    const resize = () => {
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (nextDpr !== dpr || !patterns.length) {
        dpr = nextDpr;
        tilePx = Math.round(GRAIN_TILE * dpr);
        patterns = Array.from({ length: GRAIN_TILES }, () =>
          gctx.createPattern(makeNoiseTile(tilePx), "repeat")!,
        );
      }
      grain.width = Math.round(w * dpr);
      grain.height = Math.round(h * dpr);
      trail.width = Math.round(w * dpr);
      trail.height = Math.round(h * dpr);
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      tctx.imageSmoothingEnabled = false;
      drawGrain();
    };
    resize();
    window.addEventListener("resize", resize);

    // Pointer state, eased toward the real position each frame.
    let px = -999;
    let py = -999;
    let cx = -999;
    let cy = -999;
    let seen = false;
    let lastX: number | null = null;
    let lastY: number | null = null;
    const squares: Square[] = [];

    const add = (s: Omit<Square, "age">) => {
      if (squares.length >= MAX_SQUARES) squares.shift();
      squares.push({ ...s, age: 0 });
    };

    const spawnTrail = () => {
      if (lastX === null || lastY === null) {
        lastX = px;
        lastY = py;
        return;
      }
      const dx = px - lastX;
      const dy = py - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist < GRID) return;
      const steps = Math.min(Math.floor(dist / GRID), 8);
      const speed = Math.min(dist / 40, 1);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        add({
          x: snap(lastX + dx * t + (Math.random() - 0.5) * GRID * 2),
          y: snap(lastY + dy * t + (Math.random() - 0.5) * GRID * 2),
          vx: (-dx / dist) * 0.3 + (Math.random() - 0.5) * 0.4,
          vy: 0.15 + Math.random() * 0.45,
          size: Math.random() < 0.2 + speed * 0.45 ? 8 : 4,
          life: 600 + Math.random() * 550,
          color: pick(TRAIL_COLORS),
        });
      }
      lastX = px;
      lastY = py;
    };

    const burst = (x: number, y: number) => {
      const count = 22;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + Math.random() * 0.15;
        const sp = 3.2 + Math.random() * 2.6;
        add({
          x: snap(x),
          y: snap(y),
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          size: 8,
          life: 700 + Math.random() * 350,
          color: TRAIL_COLORS[i % TRAIL_COLORS.length],
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!seen) {
        seen = true;
        cx = px;
        cy = py;
        glow.classList.add("is-on");
        if (e.pointerType === "mouse") cursor.classList.add("is-on");
      }
      if (!reduced) spawnTrail();
    };
    const onDown = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      cursor.classList.add("is-down");
      if (!reduced) burst(px, py);
    };
    const onUp = () => cursor.classList.remove("is-down");
    const onLeave = () => {
      seen = false;
      lastX = lastY = null;
      glow.classList.remove("is-on");
      cursor.classList.remove("is-on");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let last = performance.now();
    let grainClock = 0;

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;

      if (!reduced) {
        grainClock += dt;
        if (grainClock >= 1000 / GRAIN_FPS) {
          grainClock = 0;
          drawGrain();
        }
      }

      cx += (px - cx) * 0.3;
      cy += (py - cy) * 0.3;
      cursor.style.transform = `translate(${cx - CURSOR_SIZE / 2}px, ${cy - CURSOR_SIZE / 2}px)`;
      glow.style.setProperty("--mx", `${cx}px`);
      glow.style.setProperty("--my", `${cy}px`);

      tctx.clearRect(0, 0, trail.width, trail.height);
      for (let i = squares.length - 1; i >= 0; i--) {
        const s = squares[i];
        s.age += dt;
        if (s.age >= s.life) {
          squares.splice(i, 1);
          continue;
        }
        const step = dt / 16;
        s.x += s.vx * step;
        s.y += s.vy * step;
        s.vx *= 0.955;
        s.vy *= 0.955;
        const k = s.age / s.life;
        // Shrink in whole-pixel steps so the decay reads as pixelated.
        const size = Math.max(1, Math.ceil(s.size * (1 - k)));
        tctx.globalAlpha = k < 0.7 ? 1 : (1 - k) / 0.3;
        tctx.fillStyle = s.color;
        tctx.fillRect(snap(s.x) - size / 2, snap(s.y) - size / 2, size, size);
      }
      tctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      delete root.dataset.grain;
      delete root.dataset.cursor;
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="grain-glow" aria-hidden />
      <canvas ref={grainRef} className="grain-live" aria-hidden />
      <canvas ref={trailRef} className="grain-trail" aria-hidden />
      <div ref={cursorRef} className="grain-cursor" aria-hidden>
        <span />
      </div>
    </>
  );
}
