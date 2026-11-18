import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Belleza: a humanist sans with Optima-like flared strokes, the same lineage
// as the logo's lettering. Self-hosted from @fontsource.
const belleza = localFont({
  src: "../node_modules/@fontsource/belleza/files/belleza-latin-400-normal.woff2",
  variable: "--font-belleza",
  weight: "400",
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
    <html lang="en" className={belleza.variable}>
      <body>{children}</body>
    </html>
  );
}
