import type { Metadata } from "next";
import { GrainField } from "@/components/grain-field";
import { News } from "@/components/news";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "News · AIM Intelligence",
  description:
    "News from AIM Intelligence: research papers, partnerships and press coverage.",
};

export default function NewsPage() {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <News />
        <GrainField />
      </main>
      <SiteFooter />
    </>
  );
}
