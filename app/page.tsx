import { GrainField } from "@/components/grain-field";
import { Hero } from "@/components/hero";
import { Proof } from "@/components/proof";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Trusted } from "@/components/trusted";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <Hero />
        <Proof />
        <Trusted />
        <GrainField />
      </main>
      <SiteFooter />
    </>
  );
}
