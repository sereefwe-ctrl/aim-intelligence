import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { site } from "@/lib/site";

export function About() {
  const { label, statement } = site.about;
  return (
    <section
      id="about"
      className="scroll-mt-4 border-t border-line bg-surface py-20 sm:py-32"
    >
      <Container>
        <Label index={3}>{label}</Label>
        <p className="mt-8 max-w-5xl font-serif text-3xl leading-[1.15] tracking-tight text-balance sm:text-5xl">
          {statement}
        </p>
      </Container>
    </section>
  );
}
