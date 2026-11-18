import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { site } from "@/lib/site";

export function Approach() {
  const { label, title, steps } = site.approach;
  return (
    <section
      id="approach"
      className="scroll-mt-4 border-t border-line py-20 sm:py-28"
    >
      <Container>
        <Label index={2}>{label}</Label>
        <h2 className="mt-4 font-serif text-5xl tracking-tight sm:text-6xl">
          {title}
        </h2>
        <ol className="mt-14 grid gap-px bg-line sm:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="bg-background pt-6 pr-6 pb-2 sm:pl-6 sm:first:pl-0"
            >
              <span className="font-serif text-7xl leading-none text-faint">
                {i + 1}
              </span>
              <h3 className="mt-6 font-mono text-sm tracking-widest uppercase">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
