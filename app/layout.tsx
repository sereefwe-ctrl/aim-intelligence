import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIM Intelligence",
  description: "AIM Intelligence — website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
