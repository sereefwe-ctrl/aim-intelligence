import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

export function About() {
  return (
    <Section
      id="about"
      title={site.about.title}
      intro={site.about.body}
      className="bg-surface"
    />
  );
}
