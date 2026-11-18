import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo-mark";
import { Radar } from "@/components/visuals/radar";

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const colors = [
  "background",
  "surface",
  "foreground",
  "muted",
  "faint",
  "line",
  "accent",
];

/** A living reference of tokens and components. Visit /styleguide while designing. */
export default function StyleGuide() {
  return (
    <Container className="space-y-16 py-16">
      <div>
        <Label index={0}>Style guide</Label>
        <p className="mt-3 text-muted">
          Tokens live in app/globals.css. Components live in components/ui and
          components/visuals.
        </p>
      </div>

      <div>
        <Label index={1}>Colors</Label>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {colors.map((c) => (
            <div key={c}>
              <div
                className="h-16 border border-line"
                style={{ background: `var(--${c})` }}
              />
              <p className="mt-2 font-mono text-xs">{c}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label index={2}>Type</Label>
        <p className="font-serif text-7xl tracking-tight">Display serif</p>
        <p className="font-serif text-5xl tracking-tight">Heading serif</p>
        <p className="text-lg">
          Body sans: the quick brown fox jumps over the lazy dog.
        </p>
        <p className="text-muted">
          Body muted: the quick brown fox jumps over the lazy dog.
        </p>
        <p className="font-mono text-xs tracking-widest uppercase">
          Mono label
        </p>
      </div>

      <div>
        <Label index={3}>Buttons & marks</Label>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Button href="#">Primary</Button>
          <Button href="#" variant="secondary">
            Secondary
          </Button>
          <LogoMark className="size-8" />
        </div>
      </div>

      <div>
        <Label index={4}>Radar visual</Label>
        <Radar className="mt-4 w-full max-w-sm" />
      </div>
    </Container>
  );
}
