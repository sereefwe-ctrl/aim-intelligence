import { GrainField } from "@/components/grain-field";
import { Hero } from "@/components/hero";
import { Highlights } from "@/components/highlights";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Trusted } from "@/components/trusted";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <Hero />
        <Trusted />
        <Highlights />
        <GrainField />
      </main>
      <SiteFooter />
    </>
  );
}
