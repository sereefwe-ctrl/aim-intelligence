import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Geist Mono, the site's one typeface. Self-hosted from @fontsource.
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
    <html lang="en" className={geistMono.variable}>
      <body>{children}</body>
    </html>
  );
}
