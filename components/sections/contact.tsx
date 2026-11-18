import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Contact() {
  const { title, body, cta } = site.contact;
  return (
    <Section id="contact" title={title} intro={body}>
      <Button href={cta.href} size="lg">
        {cta.label}
      </Button>
    </Section>
  );
}
