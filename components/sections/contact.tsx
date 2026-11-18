import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Contact() {
  const { label, title, body } = site.contact;
  return (
    <section
      id="contact"
      className="scroll-mt-4 border-t border-line py-20 sm:py-28"
    >
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Label index={4}>{label}</Label>
          <h2 className="mt-4 font-serif text-6xl tracking-tight sm:text-8xl">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-muted">{body}</p>
        </div>
        <Button href={`mailto:${site.email}`}>{site.email}</Button>
      </Container>
    </section>
  );
}
