import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-6 font-mono text-xs tracking-widest text-muted uppercase">
      <Container className="flex flex-col justify-between gap-2 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="text-faint">{site.description}</p>
      </Container>
    </footer>
  );
}
