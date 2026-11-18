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

const instrumentSerif = localFont({
  src: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
  weight: "400",
  style: "italic",
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
      className={`${interTight.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
