/**
 * All site copy and navigation lives here, so wording can change
 * without touching layout or components.
 */
export const site = {
  name: "AIM Intelligence",
  description: "Intelligence, aimed at what matters.",
  url: "https://aim-intelligence-sukone-hong-s-projects.vercel.app",

  nav: [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Welcome",
    title: "Intelligence, aimed at what matters.",
    body: "This is placeholder copy. Replace it with a one-sentence promise of what you do and who it's for.",
    primaryCta: { label: "Get in touch", href: "#contact" },
    secondaryCta: { label: "See services", href: "#services" },
  },

  services: {
    title: "What we do",
    body: "Three short, concrete offerings. Swap these for your own.",
    items: [
      {
        title: "Strategy",
        body: "Describe your first offering in a sentence or two.",
      },
      {
        title: "Build",
        body: "Describe your second offering in a sentence or two.",
      },
      {
        title: "Scale",
        body: "Describe your third offering in a sentence or two.",
      },
    ],
  },

  about: {
    title: "About",
    body: "A short paragraph about the team, the story, or the approach. Keep it human and specific.",
  },

  contact: {
    title: "Let's talk",
    body: "Tell visitors how to reach you.",
    cta: { label: "Email us", href: "mailto:hello@example.com" },
  },
} as const;
