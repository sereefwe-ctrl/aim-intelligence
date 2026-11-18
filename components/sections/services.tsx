import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { site } from "@/lib/site";

export function Services() {
  const { title, body, items } = site.services;
  return (
    <Section id="services" title={title} intro={body}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-muted">{item.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
