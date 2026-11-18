import { Header } from "@/components/site/header";
import { Cross } from "@/components/ui/cross";
import { Radar } from "@/components/visuals/radar";
import { PlusGrid } from "@/components/visuals/plus-grid";
import { site } from "@/lib/site";

export function Hero() {
  const { title, aside, intro, topics } = site.hero;
  const [first, ...rest] = title;
  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-vignette lg:h-dvh lg:min-h-[760px]">
      <Header />
      <Cross className="top-12 left-4 sm:left-6" />
      <Cross className="top-12 right-4 sm:right-6" />
      <Cross className="top-12 left-1/2 hidden sm:block" />
      <Cross className="top-1/2 left-4 hidden sm:block" />
      <Cross className="top-1/2 right-4 hidden sm:block" />

      <div className="relative grid grid-cols-1 gap-8 px-4 pt-8 sm:px-6 lg:min-h-0 lg:flex-1 lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-[minmax(0,1fr)] lg:pt-6">
        <div className="flex flex-col justify-between gap-8">
          <h1 className="font-serif text-[clamp(3.25rem,6.4vw,7rem)] leading-[0.92] tracking-[-0.035em]">
            {first}
            <br />
            {rest.join(" ")}
            <span
              className="ml-[0.06em] inline-block size-[0.13em] -translate-y-[0.62em] rounded-full bg-accent"
              aria-hidden
            />
          </h1>
          <div className="max-w-md">
            <p className="text-[15px] leading-relaxed text-muted sm:text-base">
              {intro}
            </p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {topics.map((t) => (
                <li
                  key={t}
                  className="border border-line bg-surface px-2 py-1 font-mono text-[11px] tracking-wider text-muted uppercase"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative -mx-4 flex items-center justify-center sm:mx-0 lg:min-h-0">
          <Radar className="aspect-square w-full max-w-[560px] lg:h-full lg:max-h-[600px] lg:w-auto" />
        </div>

        <div className="hidden flex-col justify-between lg:flex">
          <p className="ml-auto max-w-xs pt-3 text-base leading-relaxed text-muted">
            {aside}
          </p>
          <PlusGrid className="ml-auto w-36 opacity-80" />
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none shrink-0 px-[0.6vw] pt-4 font-serif text-[20.4vw] leading-[0.86] tracking-[-0.04em] whitespace-nowrap text-faint select-none"
      >
        {site.name}
      </p>
    </section>
  );
}
