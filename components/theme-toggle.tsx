"use client";

import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";
export const THEME_KEY = "aim-theme";

/**
 * Runs before the page paints (inlined in <head>), so a saved light theme
 * never flashes dark first. Dark is the default.
 */
export const THEME_SCRIPT = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

/** The theme lives on <html data-theme>; watch it so the icon stays in step. */
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => mo.disconnect();
}

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Dark / light switch: a half-filled disc that turns half a circle on change. */
export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    readTheme,
    () => "dark" as Theme,
  );

  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // storage blocked: the switch still works for this visit
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <svg viewBox="0 0 20 20" aria-hidden="true" data-theme-icon={theme}>
        <circle
          cx="10"
          cy="10"
          r="7.25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
