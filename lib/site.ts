/**
 * All site copy and navigation lives here, so wording can change
 * without touching layout or components.
 */
export const site = {
  name: "AIM Intelligence",
  description: "Independent data and research that anyone can understand.",
  url: "https://aim-intelligence-sukone-hong-s-projects.vercel.app",
  email: "hello@example.com",

  nav: [
    { label: "Research", href: "#research" },
    { label: "Approach", href: "#approach" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    title: ["Data,", "made clear"],
    aside:
      "We study the numbers behind everyday life and explain what they mean.",
    intro:
      "AIM Intelligence is an independent research studio turning complex data into clear findings anyone can understand.",
    topics: ["Economy", "Technology & AI", "Society", "Environment"],
  },

  research: {
    label: "Research",
    title: "What we study",
    items: [
      {
        title: "Economy & markets",
        body: "How money, prices and jobs are changing, explained plainly.",
      },
      {
        title: "Technology & AI",
        body: "What new technology means for everyday life and work.",
      },
      {
        title: "Society & people",
        body: "Trends in how people live, learn and connect.",
      },
      {
        title: "Environment",
        body: "Climate, energy and resources, measured and made clear.",
      },
    ],
  },

  approach: {
    label: "Approach",
    title: "How we work",
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
    label: "About",
    statement:
      "We believe good data should be open to everyone. Our work is independent, our methods are transparent, and our findings are written for people, not just experts.",
  },

  contact: {
    label: "Contact",
    title: "Let's talk",
    body: "Questions about our research, or an idea we should study?",
  },
} as const;
