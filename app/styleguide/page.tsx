import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const colors = [
  "background",
  "foreground",
  "muted",
  "surface",
  "line",
  "accent",
  "accent-foreground",
];

/** A living reference of tokens and components. Visit /styleguide while designing. */
export default function StyleGuide() {
  return (
    <>
      <Section
        title="Style guide"
        intro="Tokens live in app/globals.css. Components live in components/ui."
      >
        <h3 className="mb-4 text-sm font-medium text-muted uppercase">
          Colors
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {colors.map((c) => (
            <div key={c}>
              <div
                className="h-16 rounded-lg border border-line"
                style={{ background: `var(--${c})` }}
              />
              <p className="mt-2 font-mono text-xs">{c}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-12 mb-4 text-sm font-medium text-muted uppercase">
          Type
        </h3>
        <div className="space-y-3">
          <p className="text-6xl font-semibold tracking-tight">Display</p>
          <p className="text-4xl font-semibold tracking-tight">Heading 1</p>
          <p className="text-2xl font-semibold">Heading 2</p>
          <p className="text-lg">
            Body large: the quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-muted">
            Body muted: the quick brown fox jumps over the lazy dog.
          </p>
          <p className="font-mono text-sm">Mono: const aim = true;</p>
        </div>

        <h3 className="mt-12 mb-4 text-sm font-medium text-muted uppercase">
          Buttons
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button href="#">Primary</Button>
          <Button href="#" variant="secondary">
            Secondary
          </Button>
          <Button href="#" variant="ghost">
            Ghost
          </Button>
          <Button href="#" size="sm">
            Small
          </Button>
          <Button href="#" size="lg">
            Large
          </Button>
        </div>

        <h3 className="mt-12 mb-4 text-sm font-medium text-muted uppercase">
          Card
        </h3>
        <Card className="max-w-sm">
          <h4 className="font-semibold">Card title</h4>
          <p className="mt-2 text-muted">
            Cards use the surface and line tokens.
          </p>
        </Card>
      </Section>
    </>
  );
}
