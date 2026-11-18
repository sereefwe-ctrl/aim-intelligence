import { GrainField } from "@/components/grain-field";
import { Hero } from "@/components/hero";
import { Proof } from "@/components/proof";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <Hero />
        <Proof />
        <GrainField />
      </main>
    </>
  );
}
