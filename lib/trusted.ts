/**
 * Logos for the trusted-by marquee: one-colour SVGs in public/trusted, built
 * from public-domain logo files (Wikimedia Commons, Simple Icons) and the
 * company's own sites, traced to clean single-colour vectors. w/h are the
 * artwork size, used to balance optical size; `scale` trims heavy solid marks. PSG is a typeset placeholder.
 */
export const TRUSTED_ROWS = [
  [
    { name: "NVIDIA", src: "/trusted/nvidia.svg", w: 362, h: 60 },
    { name: "OpenAI", src: "/trusted/openai.svg", w: 262.3, h: 72 },
    { name: "Anthropic", src: "/trusted/anthropic.svg", w: 344.8, h: 40.5 },
    { name: "Meta", src: "/trusted/meta.svg", w: 349.5, h: 72 },
    {
      name: "Google DeepMind",
      src: "/trusted/google-deepmind.svg",
      w: 426,
      h: 70.8,
    },
    { name: "Microsoft", src: "/trusted/microsoft.svg", w: 330.3, h: 72 },
    { name: "NASA", src: "/trusted/nasa.svg", w: 72, h: 21.5 },
    { name: "FAR.AI", src: "/trusted/far-ai.svg", w: 418, h: 72 },
    { name: "BMW", src: "/trusted/bmw.svg", w: 72, h: 72 },
    { name: "Oracle", src: "/trusted/oracle.svg", w: 324.8, h: 44 },
  ],
  [
    {
      name: "Samsung",
      src: "/trusted/samsung.svg",
      w: 276.3,
      h: 44,
      scale: 0.88,
    },
    { name: "SK telecom", src: "/trusted/sk-telecom.svg", w: 161.8, h: 64.5 },
    {
      name: "LG AI Research",
      src: "/trusted/lg-ai-research.svg",
      w: 381,
      h: 58.5,
    },
    { name: "Hana Bank", src: "/trusted/hana-bank.svg", w: 272, h: 62.8 },
    { name: "Woori Bank", src: "/trusted/woori-bank.svg", w: 364.8, h: 58.5 },
    { name: "Shin & Kim", src: "/trusted/shin-and-kim.svg", w: 370.3, h: 58 },
    { name: "PSG", src: "/trusted/psg.svg", w: 138, h: 51.8, scale: 0.9 },
    {
      name: "SHINSEGAE I&C",
      src: "/trusted/shinsegae-ic.svg",
      w: 427.8,
      h: 57,
    },
    { name: "NAVER", src: "/trusted/naver.svg", w: 220.8, h: 44, scale: 0.86 },
  ],
] as const;
