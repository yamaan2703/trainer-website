/**
 * Real site copy, pulled verbatim from the source content audit
 * (website-content.md). Kept in one place so every section component stays
 * a pure render of real data — no copy is invented in JSX.
 */

export const site = {
  name: "Cameron Clark Fitness",
  shortName: "Cameron Clark",
  email: "cameron@cameronclarkfitness.com",
  phone: "650-776-0600",
  phoneHref: "tel:6507760600",
  emailHref: "mailto:cameron@cameronclarkfitness.com?subject=Contact",
  discoveryCallHref: "#contact",
  social: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/CameronClarkFitness/",
      network: "facebook" as const,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/cameronclarkfitness/",
      network: "instagram" as const,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/cameronclarkfitness/",
      network: "linkedin" as const,
    },
  ],
};

/** Desktop/horizontal nav — labels mirror the reference hero composition. */
export const nav = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "Testimonials", href: "#testimonials" },
];

export const hero = {
  eyebrow: "Personal Fitness Coaching — Online & In-Person",
  headlineLine1: "Stop Wondering ",
  headlineLine2: "What Will Hurt",
  headline: "Stop Wondering What Will Hurt When You Wake Up",
  cta: "Discovery Call",
  sub: "Get stronger, leaner, and more energized with custom fitness and nutrition coaching that fits your lifestyle.",
  stat: "20+",
  statLabel: "Years Coaching",
};

export const press = [
  { name: "The Property Investor", file: "property-investor" },
  { name: "Money", file: "money" },
  { name: "The New Daily", file: "the-new-daily" },
  { name: "Amazon", file: "amazon" },
  { name: "9 News", file: "9news" },
];

export const reality = {
  eyebrow: "The Reality",
  heading: "High Performers Face",
  body: [
    "You've crushed it professionally. The career you've built, the income you've earned, the respect you've gained, it's exactly what you worked for. But somewhere along the way, your body became the casualty of your success.",
    "You didn't sacrifice your health to build your career on purpose. It just happened gradually, one late night and skipped workout at a time. But now you're here, and something has to change.",
  ],
};

export const servicesIntro = {
  heading: "Fitness Programs Designed Around You",
  body: "Your body isn't a stock model, it's a high-performance machine that deserves a custom rebuild. Every service we offer is engineered to fit your lifestyle, maximize your time, and deliver results you can sustain.",
};

/**
 * Service cards. Each one carries everything the stacked-card layout needs:
 * the framed image label, a single-sentence headline, the supporting copy,
 * and the deliverables column on the right. All copy is lifted from the
 * corresponding service page in website-content.md.
 */
export const services = [
  {
    index: "1",
    id: "online",
    label: "Online Coaching",
    title: "The Elevated Professional Program",
    headline: "From exhausted executive to peak performer in 8 weeks.",
    description:
      "A precision-engineered health system built for high-performing executives who want to regain the physical edge they lost while building their careers. Strategic assessment, a custom rebuild, then ongoing tuning, so the program evolves as fast as your life does.",
    detail:
      "A precision-engineered health system for executives who want to regain the physical edge they've lost while building their careers.",
    deliverables: [
      "Strategic Assessment",
      "Custom Program Design",
      "Efficient Workouts",
      "Nutrition Strategy",
      "Recovery Systems",
      "Weekly Coaching",
      "Real-time Adjustments",
      "Direct Access to Cameron",
    ],
    stat: "$1,500",
    statLabel: "8-week reset",
    cta: "Explore the program",
    image: "/images/service-online.png",
  },
  {
    index: "2",
    id: "in-person",
    label: "In-Person Training",
    title: "Tailored In-Person Training",
    headline: "The premium in-person experience.",
    description:
      "When you train in person, you're not working with a random gym trainer, you're working directly with Cameron. Every movement is monitored, every adjustment tailored, and every session designed to fit your demanding lifestyle.",
    detail:
      "For professionals in Dallas and the Bay Area who need real-time corrections and precise, focused attention.",
    deliverables: [
      "Real-time Corrections",
      "Movement Screening",
      "Precision Form Coaching",
      "Face-to-face Accountability",
      "Session Programming",
      "Schedule Flexibility",
      "Dallas & Bay Area",
    ],
    stat: "20 yrs",
    statLabel: "specialized expertise",
    cta: "Explore the program",
    image: "/images/service-in-person.png",
  },
  {
    index: "3",
    id: "partnership",
    label: "Ongoing Partnership",
    title: "Ongoing Performance Partnership",
    headline: "Continuous evolution as your life changes.",
    description:
      "Most clients continue after the first eight weeks for ongoing tuning, quarterly reviews and long-term support, so the gains you made under pressure hold through travel, deadlines and everything else the calendar throws at you.",
    detail:
      "Long-term health and energy maintenance, with quarterly reviews and priority access to Cameron.",
    deliverables: [
      "Ongoing Tuning",
      "Quarterly Reviews",
      "Priority Access",
      "Program Evolution",
      "Long-term Maintenance",
      "Direct Support",
    ],
    stat: "$500",
    statLabel: "per month",
    cta: "Continue your progress",
    image: "/images/deadlift.png",
  },
];

export const story = {
  // Palomino-style split: label + body + CTA on the left, full-bleed
  // portrait image on the right with a center clip-path open on scroll.
  eyebrow: "Our Story",
  body: "When Cameron hangs up the coaching hat, you'll find him embracing his most important role: girl dad. And then there's the garage, the place where classic British cars wait for his hands and his patience. To Cameron, each restoration tells a story — you don't rush the process, you honor the craftsmanship, and you bring something timeless back to life.",
  cta: "About us",
  ctaHref: "#about",
  image: "/images/story-daughter.jpg",
  imageAlt: "Cameron Clark with his daughter",
};

export const outcomes = {
  eyebrow: "Restore Your Edge",
  heading: "Keep Your Momentum",
  intro:
    "Within 8 weeks, you'll feel like you did before life got in the way. That's not marketing speak. That's what happens when you stop trying to train like you're 25 and start training like the strategic professional you are.",
  items: [
    {
      text: "Waking up without wondering what's going to hurt today",
      image: "/images/portrait-confident.jpg",
      alt: "Cameron Clark looking confident and recovered",
    },
    {
      text: "Having energy left for family time after long work days",
      image: "/images/story-daughter.jpg",
      alt: "Cameron Clark with his daughter",
    },
    {
      text: "Confidence in their physical capabilities again",
      image: "/images/hero-physique.png",
      alt: "Cameron Clark training with focused strength",
    },
    {
      text: "A sustainable system they can maintain long-term",
      image: "/images/service-in-person.png",
      alt: "In-person coaching session with Cameron",
    },
  ],
};

export const process = {
  eyebrow: "Your Path to Getting Back",
  heading: "On Track",
  intro:
    "Take the direct route to lasting results with a plan built for your body and your goals.",
  steps: [
    {
      index: "01",
      title: "Discovery Call",
      description:
        "We start with a focused conversation to understand your goals and current situation, and see the right program for you.",
      image: "/images/portrait-confident.jpg",
      imageAlt: "Coaching consultation with Cameron",
      cta: "Book a discovery call",
      ctaHref: "#contact",
    },
    {
      index: "02",
      title: "Strategic Onboarding",
      description:
        "You'll complete a health and lifestyle assessment so we can design a tailored program ready to launch within 48 hours.",
      image: "/images/service-online.png",
      imageAlt: "Program setup and lifestyle assessment",
      cta: "See how onboarding works",
      ctaHref: "#process",
    },
    {
      index: "03",
      title: "Execute & Optimize",
      description:
        "Begin training with direct support, weekly check-ins, and ongoing adjustments to keep your progress on track.",
      image: "/images/deadlift.png",
      imageAlt: "Training session with ongoing support",
      cta: "View client results",
      ctaHref: "#results",
    },
  ],
};

export const testimonials = [
  {
    quote:
      "I've seen major improvements in my core strength and stamina. Cameron always delivers great workouts and solid advice that keeps me progressing.",
    name: "Hansol L.",
    rating: 5,
  },
  {
    quote:
      "Cameron is an excellent coach who motivates me to do my best and has helped me improve my overall fitness and core strength.",
    name: "Flora",
    rating: 5,
  },
  {
    quote:
      "I have had a great experience working with Cameron, very helpful and patient about current goals and abilities and tailors his approach in a very understanding way.",
    name: "Jake S.",
    rating: 5,
  },
  {
    quote: "The work I do with Cameron helps me with other activities I enjoy.",
    name: "Matt M.",
    rating: 5,
  },
  {
    quote:
      "I am very happy. I wasn't very motivated to go to the gym, but now thanks to Cameron I understand how I can use the equipment and how to create an effective exercise routine.",
    name: "Renzo F.",
    rating: 5,
  },
  {
    quote:
      "Training with Cameron is awesome (and don't get me wrong, tough, but that's what you want right)! After a quick consultation he put together a custom routine that will push you in ways you just can't and won't push yourself.",
    name: "Will James Johnson",
    rating: 5,
    image: "/images/testimonial-will.jpg",
  },
];

export const faq = [
  {
    question: "How is this different from hiring a personal trainer?",
    answer:
      "Trainers give you sessions. We give you a system with workouts, nutrition, recovery, and direct access to Cameron.",
  },
  {
    question: "Can this work with a busy travel schedule?",
    answer:
      "Yes. We adapt your plan to hotel gyms, irregular hours, and client dinners, with online support wherever you are.",
  },
  {
    question: "I've tried everything. Why would this be different?",
    answer:
      "Most clients failed 3–5 times before this. The difference? This program is built for high-level professionals like you.",
  },
  {
    question: "When will I see results?",
    answer:
      "Energy often improves in 2–3 weeks, strength in 4–6, with a full reset by week 8.",
  },
  {
    question: "What happens after the first 8 weeks?",
    answer:
      "Most continue at $500/month for ongoing tuning, quarterly reviews, and long-term support.",
  },
];

export const about = {
  eyebrow: "About",
  heading: "Meet Cameron Clark",
  story: {
    heading: "From a $500 Paycheck to Life-Changing Rebuilds",
    paragraphs: [
      "Cameron didn't enter the fitness industry chasing six-figure success, he started with a $500 month and a client most had written off. But that first transformation lit the spark. It taught him that coaching isn't about hype or hacks, it's about helping people reclaim their strength when it matters most.",
      "What began as a passion quickly became a purpose: to help high performers rebuild their bodies and their confidence with the same care, strategy, and precision they bring to every other part of life.",
    ],
  },
  servesWho: [
    {
      title: "Medical Professionals and Tech Executives",
      description: "Whose high-performance careers have left their bodies running on fumes.",
    },
    {
      title: "Successful Parents and High Achievers",
      description: "Who refuse to accept that their chassis has to deteriorate with mileage.",
    },
  ],
  values: [
    { title: "Do It Right", description: "No shortcuts, just precision, smart systems, and results that last." },
    { title: "People Over Protocols", description: "Clients are whole people, not just numbers or reps." },
    { title: "Care Loudly", description: "Real care shows up in every check-in and adjustment." },
    { title: "Work With Reality", description: "Programs fit real lives, demanding schedules, and shifting priorities." },
  ],
};

export const finalCta = {
  heading: "Ready to Get Back in the Driver's Seat?",
  /** Line breaks for the asymmetric display composition (same words as heading). */
  headingLines: ["Ready to Get Back", "in the Driver's", "Seat?"],
  body: "If you're a medical professional or tech executive who's tired of feeling older than your age, and you're ready to invest in a solution that actually works for your lifestyle, let's talk.",
  cta: "Book a Discovery Call",
};

export const footer = {
  tagline: "Personal fitness coaching for professionals who refuse to slow down.",
  credit: "Website by Sites at Scale",
};

/**
 * Cinematic results timeline — three full-bleed chapters that wipe into one
 * another on scroll. Copy is the Results Timeline from the Elevated
 * Professional Program page (website-content.md §4).
 */
export const timeline = {
  eyebrow: "The Results You Can Expect",
  heading: "Eight Weeks, Three Chapters",
  chapters: [
    {
      id: "weeks-2-3",
      marker: "Weeks 2 - 3",
      title: "Sleep Improves",
      script: "afternoon crashes disappear",
      body: "The first thing to come back is your energy. Deeper sleep, steadier mornings, and no more 3 PM wall to push through.",
      image: "/images/timeline-01.png",
    },
    {
      id: "weeks-4-6",
      marker: "Weeks 4 - 6",
      title: "Strength Returns",
      script: "and confidence with it",
      body: "Load goes up, movement gets cleaner, and you start trusting your body again under real weight and real fatigue.",
      image: "/images/timeline-02.jpg",
    },
    {
      id: "week-8",
      marker: "Week 8 +",
      title: "You Feel Yourself",
      script: "sharp, energized, unstoppable",
      body: "The full reset. Not a peak you have to defend, but a baseline you can hold through travel, deadlines and everything after.",
      image: "/images/timeline-03.jpg",
    },
  ],
};
