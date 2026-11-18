import { GrainField } from "@/components/grain-field";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="scroll-length">
        <GrainField />
      </main>
    </>
  );
}
