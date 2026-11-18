import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

export function Approach() {
  const { title, body, steps } = site.approach;
  return (
    <Section id="approach" title={title} intro={body}>
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="bg-background p-8">
            <span className="font-mono text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
