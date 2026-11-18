import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { site } from "@/lib/site";

export function Research() {
  const { label, title, items } = site.research;
  return (
    <section
      id="research"
      className="scroll-mt-4 border-t border-line bg-surface py-20 sm:py-28"
    >
      <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <Label index={1}>{label}</Label>
          <h2 className="mt-4 font-serif text-5xl tracking-tight sm:text-6xl">
            {title}
          </h2>
        </div>
        <ul className="border-t border-line">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="group grid grid-cols-[3rem_1fr] gap-x-4 gap-y-1 border-b border-line py-6 sm:grid-cols-[4rem_1fr_1fr] sm:items-baseline"
            >
              <span className="font-mono text-xs text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-3xl tracking-tight transition-colors group-hover:text-accent sm:text-4xl">
                {item.title}
              </h3>
              <p className="col-start-2 text-muted sm:col-start-3">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
