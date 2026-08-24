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
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Story", href: "#story" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Personal Fitness Coaching — Online & In-Person",
  headline: "Stop Wondering What Will Hurt When You Wake Up",
  cta: "Start Your Executive Reset",
  sub: "You've crushed it professionally. Somewhere along the way, your body became the casualty of your success. Something has to change.",
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

export const services = [
  {
    index: "01",
    id: "online",
    title: "The Elevated Professional Program",
    description:
      "Strategic fitness system built for busy professionals who want lasting results without overhauling their life.",
    detail:
      "A precision-engineered health system for executives who want to regain the physical edge they've lost while building their careers.",
    stat: "$1,500",
    statLabel: "8-week reset",
    cta: "Explore the program",
    image: "/images/service-online.png",
  },
  {
    index: "02",
    id: "in-person",
    title: "Tailored In-Person Training",
    description:
      "Customized, hands-on coaching sessions tailored to fit your hectic schedule and unique goals.",
    detail:
      "For professionals in Dallas and the Bay Area who need real-time corrections and precise, focused attention.",
    stat: "20 yrs",
    statLabel: "specialized expertise",
    cta: "Explore the program",
    image: "/images/service-in-person.png",
  },
];

export const story = {
  eyebrow: "Story",
  heading: "Life in the Passing Lane",
  paragraphs: [
    "When Cameron hangs up the coaching hat, you'll find him embracing his most important role: girl dad. Whether it's chasing adventures with his daughter, cheering her on at activities, or simply being present for life's everyday moments, he's committed to modeling the healthy, active lifestyle he teaches his clients.",
    "And then there's the garage, the place where classic British cars wait for his hands and his patience. To Cameron, each restoration tells a story. You don't rush the process. You honor the craftsmanship, you source the right parts, and you bring something timeless back to life. It's the same philosophy he applies to fitness, slow enough to be intentional, precise enough to last, and always done with care.",
  ],
};

export const outcomes = {
  eyebrow: "Restore Your Edge",
  heading: "Keep Your Momentum",
  intro:
    "Within 8 weeks, you'll feel like you did before life got in the way. That's not marketing speak. That's what happens when you stop trying to train like you're 25 and start training like the strategic professional you are.",
  items: [
    "Waking up without wondering what's going to hurt today",
    "Having energy left for family time after long work days",
    "Confidence in their physical capabilities again",
    "A sustainable system they can maintain long-term",
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
    },
    {
      index: "02",
      title: "Strategic Onboarding",
      description:
        "You'll complete a health and lifestyle assessment so we can design a tailored program ready to launch within 48 hours.",
    },
    {
      index: "03",
      title: "Execute & Optimize",
      description:
        "Begin training with direct support, weekly check-ins, and ongoing adjustments to keep your progress on track.",
    },
  ],
};

export const testimonials = [
  {
    quote:
      "I've seen major improvements in my core strength and stamina. Cameron always delivers great workouts and solid advice that keeps me progressing.",
    name: "Hansol L.",
  },
  {
    quote:
      "Cameron is an excellent coach who motivates me to do my best and has helped me improve my overall fitness and core strength.",
    name: "Flora",
  },
  {
    quote:
      "I have had a great experience working with Cameron, very helpful and patient about current goals and abilities and tailors his approach in a very understanding way.",
    name: "Jake S.",
  },
  {
    quote: "The work I do with Cameron helps me with other activities I enjoy.",
    name: "Matt M.",
  },
  {
    quote:
      "I am very happy. I wasn't very motivated to go to the gym, but now thanks to Cameron I understand how I can use the equipment and how to create an effective exercise routine.",
    name: "Renzo F.",
  },
  {
    quote:
      "Training with Cameron is awesome (and don't get me wrong, tough, but that's what you want right)! After a quick consultation he put together a custom routine that will push you in ways you just can't and won't push yourself.",
    name: "Will James Johnson",
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
  body: "If you're a medical professional or tech executive who's tired of feeling older than your age, and you're ready to invest in a solution that actually works for your lifestyle, let's talk.",
  cta: "Book a Discovery Call",
};

export const footer = {
  tagline: "Personal fitness coaching for professionals who refuse to slow down.",
  credit: "Website by Sites at Scale",
};
