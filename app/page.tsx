import { Hero } from "@/components/sections/hero";
import { Research } from "@/components/sections/research";
import { Approach } from "@/components/sections/approach";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Research />
      <Approach />
      <About />
      <Contact />
    </>
  );
}
