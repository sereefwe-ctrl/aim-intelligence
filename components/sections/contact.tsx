import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Contact() {
  const { title, body, cta } = site.contact;
  return (
    <section id="contact" className="scroll-mt-20 py-24 text-center">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted">{body}</p>
        <div className="mt-8">
          <Button href={cta.href} variant="secondary" size="lg">
            {cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
