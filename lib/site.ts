/**
 * All site copy and navigation lives here, so wording can change
 * without touching layout or components.
 */
export const site = {
  name: "AIM Intelligence",
  description: "Independent data and research that anyone can understand.",
  url: "https://aim-intelligence-sukone-hong-s-projects.vercel.app",

  nav: [
    { label: "Research", href: "#research" },
    { label: "Approach", href: "#approach" },
    { label: "About", href: "#about" },
  ],

  hero: {
    eyebrow: "Data & Research",
    titleStart: "Making sense of the data that",
    titleHighlight: "shapes our world.",
    body: "AIM Intelligence turns complex data into clear, independent research that anyone can understand.",
    primaryCta: { label: "Explore our research", href: "#research" },
    secondaryCta: { label: "How we work", href: "#approach" },
  },

  research: {
    title: "What we study",
    body: "Our research areas. These are placeholders; we'll set the real ones together.",
    items: [
      {
        icon: "chart",
        title: "Economy & markets",
        body: "How money, prices and jobs are changing, explained plainly.",
      },
      {
        icon: "cpu",
        title: "Technology & AI",
        body: "What new technology means for everyday life and work.",
      },
      {
        icon: "users",
        title: "Society & people",
        body: "Trends in how people live, learn and connect.",
      },
      {
        icon: "globe",
        title: "Environment",
        body: "Climate, energy and resources, measured and made clear.",
      },
    ],
  },

  approach: {
    title: "How we work",
    body: "Every piece of research follows the same three steps.",
    steps: [
      {
        title: "Collect",
        body: "We gather data from trusted, transparent sources.",
      },
      {
        title: "Analyze",
        body: "We test it rigorously and look for what actually matters.",
      },
      {
        title: "Explain",
        body: "We publish findings in plain language anyone can follow.",
      },
    ],
  },

  about: {
    title: "About AIM Intelligence",
    body: "Placeholder: a short paragraph about who you are, why you started, and what makes your research trustworthy.",
  },

  contact: {
    title: "Stay curious",
    body: "Questions about our research? We'd love to hear from you.",
    cta: { label: "Get in touch", href: "mailto:hello@example.com" },
  },
} as const;
