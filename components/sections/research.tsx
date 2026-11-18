import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { site } from "@/lib/site";

export function Research() {
  const { title, body, items } = site.research;
  return (
    <Section id="research" title={title} intro={body}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Card key={item.title}>
            <div className="inline-flex size-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
              <Icon name={item.icon} className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
