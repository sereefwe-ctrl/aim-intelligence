import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Footer } from "@/components/site/footer";
import { site } from "@/lib/site";
import "./globals.css";

const instrumentSerif = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
      style: "italic",
    },
  ],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
