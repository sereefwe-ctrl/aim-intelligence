import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// DM Sans (variable weight and optical size), self-hosted from @fontsource.
const dmSans = localFont({
  src: "../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-opsz-normal.woff2",
  variable: "--font-dm-sans",
  weight: "100 1000",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIM Intelligence",
  description:
    "AIM Intelligence is an applied research lab dedicated to building security infrastructure to keep artificial superintelligence safe and under control.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
