import { GrainField } from "@/components/grain-field";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="scroll-length">
        <Hero />
        <GrainField />
      </main>
    </>
  );
}
