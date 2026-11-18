import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/*
 * Type system, all self-hosted from @fontsource:
 * - Inter Tight: the voice (headline and supporting text).
 * - Instrument Serif Italic: emphasis, echoing the logo's classical capitals.
 * - Geist Mono: small utility labels (the navigation).
 */
const interTight = localFont({
  src: "../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});

// Instrument Serif: italic for the headline accents, upright for the footer.
const instrumentSerif = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

const geistMono = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../node_modules/@fontsource/geist-mono/files/geist-mono-latin-500-normal.woff2",
      weight: "500",
    },
  ],
  variable: "--font-mono",
  display: "swap",
});

// Nothing You Could Do: the handwritten "trusted by" note.
const hand = localFont({
  src: "../node_modules/@fontsource/nothing-you-could-do/files/nothing-you-could-do-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIM Intelligence",
  description:
    "AIM Intelligence is an applied research lab dedicated to building security infrastructure to keep Artificial Superintelligence safe and under control.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${geistMono.variable} ${hand.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
