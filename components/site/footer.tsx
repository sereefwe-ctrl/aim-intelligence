import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-8 text-sm text-muted">
      <Container className="flex flex-col justify-between gap-2 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>{site.description}</p>
      </Container>
    </footer>
  );
}
