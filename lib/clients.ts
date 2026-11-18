/**
 * Client logos, traced to vectors from the supplied logo sheet and served as
 * one-colour SVGs from public/clients. Each is drawn with a CSS mask, so it
 * takes the theme ink. w/h are the artwork's size, used to balance optical size.
 */
export const CLIENTS = [
  { name: "SK telecom", file: "/clients/sk-telecom.svg", w: 177, h: 74 },
  {
    name: "Samsung Display",
    file: "/clients/samsung-display.svg",
    w: 233,
    h: 29,
  },
  { name: "Samsung Card", file: "/clients/samsung-card.svg", w: 232, h: 39 },
  {
    name: "Samsung Life Insurance",
    file: "/clients/samsung-life-insurance.svg",
    w: 233,
    h: 40,
  },
  { name: "BMW", file: "/clients/bmw.svg", w: 77, h: 77 },
  {
    name: "Kyobo Securities",
    file: "/clients/kyobo-securities.svg",
    w: 199,
    h: 69,
  },
  { name: "LG U+", file: "/clients/lg-u.svg", w: 193, h: 60 },
  {
    name: "LG AI Research",
    file: "/clients/lg-ai-research.svg",
    w: 231,
    h: 41,
  },
  { name: "Shin & Kim", file: "/clients/shin-and-kim.svg", w: 213, h: 39 },
  { name: "KISA", file: "/clients/kisa.svg", w: 232, h: 42 },
  { name: "Mirae Asset", file: "/clients/mirae-asset.svg", w: 223, h: 59 },
  {
    name: "Shinsegae I&C",
    file: "/clients/shinsegae-iandc.svg",
    w: 233,
    h: 37,
  },
  { name: "Hana Bank", file: "/clients/hana-bank.svg", w: 232, h: 58 },
  { name: "Woori Bank", file: "/clients/woori-bank.svg", w: 231, h: 43 },
  { name: "kt", file: "/clients/kt.svg", w: 76, h: 65 },
] as const;
